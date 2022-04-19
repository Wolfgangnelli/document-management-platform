import React, { useState, useEffect, createContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import SidePanel from "../../../../components/SidePanelDashboard/SidePanel";
import { useRouteMatch, useLocation, useParams } from "react-router-dom";
import { useGetEventsQuery } from "../../../../hooks/graphql/queries/useGetEventsQuery/index";
import { useCreateGaSnippetTemplateMutation } from "../../../../hooks/graphql/mutations/useCreateGAsnippetTemplateMutation/index";
import { useGetGaSnippetTemplateQuery } from "../../../../hooks/graphql/queries/useGetGaSnippetTemplateQuery/index";
import { useUpdateGaSnippetTemplateMutation } from "../../../../hooks/graphql/mutations/useUpdateGaSnippetTemplateMutation/index";
import Loader from "../../../../components/Loader/index";
import Message from "../../../../components/Message/index";
import { GoBackBtn } from "../../../../components/Buttons/GoBackBtn";
import { FullScreenModal } from "../../../../components/Modal/FullScreen/FullScreenModal";
import { formattingVariableWithDollars } from "../../../../helpers/functions";

export const ContextModal = createContext([]);

const NewSnippet = ({ isSidePanel, isUpdate }) => {
  const [show, setShow] = useState(false);

  const [eventName, setEventName] = useState("");

  const [category, setCategory] = useState({
    name: "",
    dataVariable: {},
    type: "",
  });

  const [action, setAction] = useState({
    name: "",
    dataVariable: {},
    type: "",
  });

  const [label, setLabel] = useState({
    name: "",
    dataVariable: {},
    type: "",
  });

  const [customDimension, setCustomDimension] = useState({
    key: "",
    value: "",
  });

  const [event, setEvent] = useState("");

  const [name, setName] = useState("");

  const [customMetric, setCustomMetric] = useState({ key: "", value: "" });

  const [clicked, setClicked] = useState("");

  const [isObjEventsFormatted, setIsObjEventsFormatted] = useState(false);

  let match = useRouteMatch();

  let location = useLocation();

  let { snippetID, pk } = useParams();

  const { loading, data } = useGetEventsQuery();

  const [
    createGaSnippetTemplate,
    { error: errorCreateGaSnippetTemp, data: dataCreateGaSnippetTemp },
  ] = useCreateGaSnippetTemplateMutation();

  const { loading: loadingGaSnippetTemp, data: dataGaSnippetTemp } =
    useGetGaSnippetTemplateQuery({
      variables: {
        id: snippetID,
      },
      skip: !snippetID,
    });

  const [updateGaSnippetTemplate, { error: errorUpdate, data: dataUpdate }] =
    useUpdateGaSnippetTemplateMutation();

  const handleSidePanel = (type, status) => {
    setClicked(type);
    if (status === "open" && type === "form-select-variable") {
      //variable
      if (
        !location.pathname.includes("/dashboard/snippet") &&
        match.path !== "/dashboard/snippet/crea-snippet-interazione"
      ) {
        document.querySelectorAll(`.sidepanel`)[0].style.width = "100%";
        document.querySelector(".sheet-overlay-panel").style.opacity = "0.62";
        document.querySelector(".sheet-overlay-panel").style.visibility =
          "visible";
        document.querySelectorAll(`.sidepanel`)[1].style.width = "75vw";
      } else {
        document.querySelectorAll(`.sidepanel`)[0].style.width = "75vw";
      }

      document.querySelector(".sheet-overlay").style.opacity = "0.62";
      document.querySelector(".sheet-overlay").style.visibility = "visible";
    } else {
      if (
        !location.pathname.includes("/dashboard/snippet") &&
        match.path !== "/dashboard/snippet/crea-snippet-interazione"
      ) {
        document.querySelectorAll(`.sidepanel`)[1].style.width = "0";
        document.querySelectorAll(`.sidepanel`)[0].style.width = "75vw";
        document.querySelector(".sheet-overlay-panel").style.opacity = "0";
        document.querySelector(".sheet-overlay-panel").style.visibility =
          "hidden";
      } else {
        document.querySelectorAll(`.sidepanel`)[0].style.width = "0";
        document.querySelectorAll(`.sidepanel`)[0].style.opacity = "1";
        document.querySelector(".sheet-overlay").style.opacity = "0";
        document.querySelector(".sheet-overlay").style.visibility = "hidden";
      }
    }
  };

  const getEventId = (event_obj) => {
    return event_obj.node.name === event;
  };

  const FormattingEventsObj = (obj, name) => {
    let keyObj = { ...obj };

    if (name === "category" || name === "action" || name === "label") {
      if (Object.keys(keyObj["dataVariable"]).length > 0) {
        for (const key in keyObj["dataVariable"]) {
          let varObj = {};

          varObj["variablePk"] = +key;

          varObj["values"] = keyObj["dataVariable"][key];

          name === "category"
            ? setCategory((prev) => {
                let { dataVariable, ...rest } = prev;
                dataVariable = varObj;
                return { dataVariable, ...rest };
              })
            : name === "action"
            ? setAction((prev) => {
                let { dataVariable, ...rest } = prev;
                dataVariable = varObj;
                return { dataVariable, ...rest };
              })
            : name === "label" &&
              setLabel((prev) => {
                let { dataVariable, ...rest } = prev;
                dataVariable = varObj;
                return { dataVariable, ...rest };
              });
        }
      }
    }
  };

  const handleForm = (e) => {
    e.preventDefault();

    FormattingEventsObj(category, "category");
    FormattingEventsObj(action, "action");
    FormattingEventsObj(label, "label");

    setIsObjEventsFormatted(true);
  };

  useEffect(() => {
    if (dataGaSnippetTemp) {
      let categoria =
        dataGaSnippetTemp?.gaSnippetTemplate?.eventCategory.length > 0
          ? dataGaSnippetTemp?.gaSnippetTemplate?.eventCategory
          : formattingVariableWithDollars(
              dataGaSnippetTemp?.gaSnippetTemplate?.eventCategoryVariable?.name
            );
      let azione =
        dataGaSnippetTemp?.gaSnippetTemplate?.eventAction.length > 0
          ? dataGaSnippetTemp?.gaSnippetTemplate?.eventAction
          : formattingVariableWithDollars(
              dataGaSnippetTemp?.gaSnippetTemplate?.eventActionVariable?.name
            );
      let etichetta =
        dataGaSnippetTemp?.gaSnippetTemplate?.eventLabel.length > 0
          ? dataGaSnippetTemp?.gaSnippetTemplate?.eventLabel
          : formattingVariableWithDollars(
              dataGaSnippetTemp?.gaSnippetTemplate?.eventLabelVariable?.name
            );
      setEvent(dataGaSnippetTemp?.gaSnippetTemplate?.event?.name);
      setAction((prev) => ({
        ...prev,
        name: azione,
      }));
      setCategory((prev) => ({
        ...prev,
        name: categoria,
      }));
      setLabel((prev) => ({
        ...prev,
        name: etichetta,
      }));
      setName(dataGaSnippetTemp?.gaSnippetTemplate?.snippetName);
    }
  }, [dataGaSnippetTemp]);

  useEffect(() => {
    if (isObjEventsFormatted) {
      let event_obj = data.events.edges.find(getEventId);

      if (!snippetID) {
        createGaSnippetTemplate({
          variables: {
            snippet_data: {
              snippetName: name,
              event: event_obj.node.pk,
              eventCategory: category,
              eventAction: action,
              eventLabel: label,
            },
          },
        });
        setName("");
        setEvent("");
        setAction({
          name: "",
          dataVariable: {},
          type: "",
        });
        setLabel({
          name: "",
          dataVariable: {},
          type: "",
        });
        setCategory({
          name: "",
          dataVariable: {},
          type: "",
        });
      } else {
        updateGaSnippetTemplate({
          variables: {
            data_update: {
              id: pk,
              snippetName: name,
              eventCategory: category,
              eventAction: action,
              eventLabel: label,
              event: event_obj.node.pk,
            },
          },
        });
      }

      setIsObjEventsFormatted(false);
      handleSidePanel(null, "close");
    }
  }, [
    isObjEventsFormatted,
    action,
    category,
    createGaSnippetTemplate,
    data,
    getEventId,
    label,
    name,
    pk,
    snippetID,
    updateGaSnippetTemplate,
  ]);

  return (
    <ContextModal.Provider
      value={[
        setCategory,
        setAction,
        setLabel,
        setCustomDimension,
        setCustomMetric,
        eventName,
        setShow,
      ]}
    >
      <SidePanel handleSidePanel={handleSidePanel} clicked={clicked} />
      {(loading || loadingGaSnippetTemp) && <Loader />}
      {data && (
        <Row>
          {!isSidePanel && <GoBackBtn />}
          <Col>
            <h1>
              {(!snippetID && isSidePanel) || !isUpdate
                ? "Crea GA Snippet Template"
                : `Update GA Snippet Template: ${dataGaSnippetTemp?.gaSnippetTemplate?.snippetName}`}
            </h1>
          </Col>
          {(errorCreateGaSnippetTemp || errorUpdate) && (
            <Message variant="danger">
              {errorCreateGaSnippetTemp?.message
                ? errorCreateGaSnippetTemp.message
                : errorUpdate?.message}
            </Message>
          )}
          {(dataCreateGaSnippetTemp || dataUpdate) && (
            <Message variant="success">{`Snippet ${
              dataCreateGaSnippetTemp?.createGaSnippetTemplate?.snippetTemplate
                ?.snippetName
                ? `${dataCreateGaSnippetTemp.createGaSnippetTemplate.snippetTemplate.snippetName} creato`
                : `${dataUpdate?.updateGaSnippetTemplate?.snippetTemplate?.snippetName} aggiornato`
            } correttamente!`}</Message>
          )}
          <FullScreenModal show={show} onHide={setShow} />
          <Form onSubmit={handleForm}>
            <Row>
              <Col className="d-flex justify-content-end" lg={11}>
                <Button variant="success" type="submit" className="fw-bolder">
                  SAVE
                </Button>
              </Col>
            </Row>
            <Row>
              <Col lg={5}>
                <Form.Group className="mb-3" controlId="eventName">
                  <Form.Label>event: </Form.Label>
                  <Form.Select
                    aria-label="Event name"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                    required
                  >
                    <option value=""></option>
                    {data?.events &&
                      data.events.edges.map((item) => (
                        <option key={item.node.pk} value={item.node.name}>
                          {item.node.name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={5}>
                <Form.Group className="mb-3" controlId="snippet name">
                  <Form.Label>snippet name: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci nome"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Tip. Metti stesso nome dell'interazione. Es. Ricerca nel
                    sito
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={5}>
                <Form.Group className="mb-3" controlId="eventCategory">
                  <Form.Label>event category: </Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      placeholder="Enter category"
                      value={category.name}
                      onChange={(e) =>
                        setCategory((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                    <Button
                      title="variables"
                      onClick={() => {
                        handleSidePanel("form-select-variable", "open");
                        setEventName("category");
                      }}
                    >
                      <i className="fas fa-code"></i>
                    </Button>
                  </div>
                  <Form.Text className="text-muted">
                    Scrivi o scegli una variabile
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col lg={5}>
                <Form.Group className="mb-3" controlId="eventAction">
                  <Form.Label>event action: </Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      placeholder="Enter action"
                      value={action.name}
                      onChange={(e) =>
                        setAction((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                    <Button
                      title="variables"
                      onClick={() => {
                        handleSidePanel("form-select-variable", "open");
                        setEventName("action");
                      }}
                    >
                      <i className="fas fa-code"></i>
                    </Button>
                  </div>
                  <Form.Text className="text-muted">
                    Scrivi o scegli una variabile
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={5}>
                <Form.Group className="mb-3" controlId="eventLabel">
                  <Form.Label>event label: </Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      placeholder="Enter label"
                      value={label.name}
                      onChange={(e) =>
                        setLabel((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                    <Button
                      title="variables"
                      onClick={() => {
                        handleSidePanel("form-select-variable", "open");
                        setEventName("label");
                      }}
                    >
                      <i className="fas fa-code"></i>
                    </Button>
                  </div>
                  <Form.Text className="text-muted">
                    Scrivi o scegli una variabile
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Row>
      )}
    </ContextModal.Provider>
  );
};

export default NewSnippet;
