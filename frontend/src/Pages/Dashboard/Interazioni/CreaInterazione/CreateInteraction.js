import React, { useState, useEffect, useContext } from "react";
import { useLazyQuery } from "@apollo/client";
import { Row, Col, Button, Form, FloatingLabel } from "react-bootstrap";
import DataPushSnippet from "../../../../components/Snippet/InteractionPush/dataPushSnippet";
import { useRouteMatch, useParams, useHistory } from "react-router-dom";
import SidePanel from "../../../../components/SidePanelDashboard/SidePanel";
import { getGaSnippetsTemplateQuery } from "../../../../hooks/graphql/queries/useGetGASnippetsTemplateQuery/index";
import { useCreateSectionTemplateMutation } from "../../../../hooks/graphql/mutations/useCreateSectionTemplateMutation/index";
import { useGetSectionTemplateQuery } from "../../../../hooks/graphql/queries/useGetSectionTemplateQuery/index";
import { useUpdateSectionTemplateMutation } from "../../../../hooks/graphql/mutations/useUpdateSectionTemplateMutation/index";
import Loader from "../../../../components/Loader/index";
import Message from "../../../../components/Message/index";
import { GoBackBtn } from "../../../../components/Buttons/GoBackBtn";
import { ContexAlert } from "../../../../App/App";
import "./_creaInterazione.scss";

const CreateInteraction = () => {
  const [clicked, setClicked] = useState("");

  const [created, setCreated] = useState(false);

  const [title, setTitle] = useState("");

  const [action, setAction] = useState("");

  const [note, setNote] = useState("");

  const [priority, setPriority] = useState("");

  const [category, setCategory] = useState("e-commerce");

  const [snippetTemplateID, setSnippetTemplateID] = useState(null);

  const [GA4EcoSnippetTemplateID, setGA4EcoSnippetTemplateID] = useState(null);

  const [setShowMessage, setMessage] = useContext(ContexAlert);

  let match = useRouteMatch();

  let history = useHistory();

  let { id, pk } = useParams();

  const { data: dataSection } = useGetSectionTemplateQuery({
    variables: {
      section_id: id,
    },
    skip: !id,
  });

  const [
    getGaSnippetsTemplate,
    {
      loading: loadingTemplate,
      error: errorTemplate,
      data: dataTemplate,
      fetchMore: fetchMoreTemplateSnippet,
    },
  ] = useLazyQuery(getGaSnippetsTemplateQuery, {
    variables: {
      cursor: null,
    },
  });

  const [
    createSectionTemplateMutation,
    { error: errorCreate, data: dataCreate },
  ] = useCreateSectionTemplateMutation();

  const [
    updateSectionTemplateMutation,
    { error: errorUpdate, data: dataUpdate },
  ] = useUpdateSectionTemplateMutation();

  const handleSidePanel = (type, status) => {
    setClicked(type);
    if (
      status === "open" &&
      (type === "interazione" || type === "e-commerce")
    ) {
      document.querySelectorAll(`.sidepanel`)[0].style.width = "75vw";
      document.querySelector(".sheet-overlay").style.opacity = "0.62";
      document.querySelector(".sheet-overlay").style.visibility = "visible";
    } else {
      document.querySelectorAll(`.sidepanel`)[0].style.width = "0";
      document.getElementById("new-interaction-site").style.opacity = "1";
      document.querySelector(".sheet-overlay").style.opacity = "0";
      document.querySelector(".sheet-overlay").style.visibility = "hidden";
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (!id) {
      createSectionTemplateMutation({
        variables: {
          data_create: {
            title,
            action,
            note,
            priority,
            category,
            gaSnippetTemplate: snippetTemplateID ? snippetTemplateID : null,
            ga4EcoSnippetTemplate: GA4EcoSnippetTemplateID
              ? GA4EcoSnippetTemplateID
              : null,
          },
        },
      });
      setCreated(true);
      setTitle("");
      setAction("");
      setNote("");
      setPriority("");
      setCategory("e-commerce");
      setSnippetTemplateID(null);
      setGA4EcoSnippetTemplateID(null);
    } else {
      updateSectionTemplateMutation({
        variables: {
          update_data: {
            id: pk,
            title,
            action,
            note,
            priority,
            category,
            gaSnippetTemplate: snippetTemplateID ? snippetTemplateID : null,
            ga4EcoSnippetTemplate: GA4EcoSnippetTemplateID
              ? GA4EcoSnippetTemplateID
              : null,
          },
        },
      });
    }
    setCreated(true);
    setTimeout(() => {
      setCreated(false);
    }, 4000);
  };

  const handleFetchMore = () => {
    fetchMoreTemplateSnippet({
      variables: {
        cursor: dataTemplate?.gaSnippetsTemplate?.pageInfo?.endCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.gaSnippetsTemplate.edges;
        const pageInfo = fetchMoreResult.gaSnippetsTemplate.pageInfo;

        return newEdges.length
          ? {
              gaSnippetsTemplate: {
                __typename: prevResult.gaSnippetsTemplate.__typename,
                edges: [...prevResult.gaSnippetsTemplate.edges, ...newEdges],
                pageInfo,
                totalCount: prevResult.gaSnippetsTemplate.totalCount,
              },
            }
          : prevResult;
      },
    });
  };

  useEffect(() => {
    if (id && (dataSection || dataUpdate)) {
      setAction(dataSection?.sectionTemplate?.action);
      setCategory(dataSection?.sectionTemplate?.category);
      setNote(dataSection?.sectionTemplate?.note);
      setTitle(dataSection?.sectionTemplate?.title);
      setPriority(dataSection?.sectionTemplate?.priority);
      setSnippetTemplateID(dataSection?.sectionTemplate?.gaSnippetTemplate?.pk);
      setGA4EcoSnippetTemplateID(
        dataSection?.sectionTemplate?.ga4EcoSnippetTemplate?.pk
      );
    }

    if (dataCreate || errorCreate || errorUpdate || dataUpdate) {
      let msg = dataCreate
        ? "Sezione creata correttamente!"
        : errorCreate
        ? `${errorCreate.message}`
        : dataUpdate
        ? "Sezione aggiornata correttamente!"
        : errorUpdate && `${errorUpdate.message}`;
      setMessage(msg);
      setShowMessage(true);
      history.goBack();
    }
  }, [
    dataSection,
    dataUpdate,
    history,
    setMessage,
    setShowMessage,
    id,
    dataCreate,
    errorCreate,
    errorUpdate,
  ]);

  useEffect(() => {
    getGaSnippetsTemplate();
  }, [getGaSnippetsTemplate]);

  return (
    <>
      <SidePanel handleSidePanel={handleSidePanel} clicked={clicked} />
      <Row id="new-interaction-site">
        <GoBackBtn />
        <Col>
          <h1 className="text-center">
            {!id
              ? "CREA NUOVA INTERAZIONE TEMPLATE"
              : `UPDATE INTERAZIONE TEMPLATE: ${dataSection?.sectionTemplate?.title}`}
          </h1>
        </Col>
        {/*         <Row>
          <Col>
            {created &&
              (errorCreate || dataCreate || errorUpdate || dataUpdate) && (
                <Message
                  variant={dataCreate || dataUpdate ? "success" : "danger"}
                >
                  {(errorCreate?.message || errorUpdate?.message) ??
                    `Sezione di Interazione ${
                      dataCreate ? "creata" : "aggiornata"
                    } correttamente!`}
                </Message>
              )}
          </Col>
        </Row> */}

        <Form className="d-flex" onSubmit={handleForm}>
          <Row>
            <Col>
              <Button
                variant="success"
                type="submit"
                className="float-end fw-bolder"
              >
                CREA
              </Button>
            </Col>
            <Row>
              <Col lg={5}>
                <Form.Group className="mb-3" controlId="titolo">
                  <Form.Label>Titolo interazione</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci titolo"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Es. Ricerca nel sito
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col lg={1}></Col>
              <Col lg={5}>
                <Form.Group className="mb-3" controlId="url">
                  <Form.Label>Url image pagina sito</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Inserisci url pagina"
                    disabled={match.url.includes("dashboard") ? true : false}
                    title={
                      match.url.includes("dashboard")
                        ? "Disabled"
                        : "Add url image"
                    }
                    style={
                      match.url.includes("dashboard") && {
                        cursor: "not-allowed",
                      }
                    }
                  />
                  <Form.Text className="text-muted">
                    {"Es. https://www.sitoweb.it/ricerca"}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={5}>
                <FloatingLabel controlId="note" label="Note" className="mb-3">
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col lg={1}></Col>
              <Col lg={5}>
                <FloatingLabel
                  controlId="azione"
                  label="Azione"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    style={{ height: "100px" }}
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col lg={5}>
                <Form.Label>Priorità</Form.Label>
                <Form.Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option></option>
                  <option value="MANDATORY">MANDATORY</option>
                  <option value="ALTA">ALTA</option>
                  <option value="MEDIA">MEDIA</option>
                  <option value="BASSA">BASSA</option>
                </Form.Select>
              </Col>
              <Col lg={1}></Col>
              <Col lg={5}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Carica una image</Form.Label>
                  <Form.Control
                    type="file"
                    disabled={match.url.includes("dashboard") ? true : false}
                    title={
                      match.url.includes("dashboard") ? "Disabled" : "Add image"
                    }
                    style={
                      match.url.includes("dashboard") && {
                        cursor: "not-allowed",
                      }
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Category:</Form.Label>
                  <Form.Check
                    type="radio"
                    label="e-commerce"
                    name="e-commerce"
                    id="e-commerce-1"
                    checked={category === "e-commerce"}
                    onChange={() => setCategory("e-commerce")}
                  />
                  <Form.Check
                    type="radio"
                    label="interazione sul sito"
                    name="interaction"
                    id="interaction-1"
                    checked={category === "interazioni sul sito"}
                    onChange={() => setCategory("interazioni sul sito")}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="py-4">
              <Row>
                <Col>Includi uno snippet:</Col>
                <Col className="d-flex flex-wrap justify-content-end">
                  <Button
                    variant="secondary"
                    className="fw-bold btn-outline-secondary fs-6 mb-1"
                    onClick={() => handleSidePanel("interazione", "open")}
                  >
                    CREA GA SNIPPET
                  </Button>
                  <Button
                    variant="secondary"
                    className="fw-bold btn-outline-secondary fs-6 ms-1"
                    onClick={() => handleSidePanel("e-commerce", "open")}
                  >
                    CREA GA4 E-COMMERCE SNIPPET
                  </Button>
                </Col>
              </Row>
              <Row className="mt-3">
                {errorTemplate && (
                  <Message variant="danger">{errorTemplate?.message}</Message>
                )}
                {dataTemplate?.gaSnippetsTemplate?.edges.map((item, idx) => (
                  <Col lg={4} key={idx}>
                    <DataPushSnippet
                      data={item}
                      snippet={true}
                      setSnippetTemplateID={setSnippetTemplateID}
                      snippetTemplateID={snippetTemplateID}
                    />
                  </Col>
                ))}
              </Row>
              {loadingTemplate && <Loader />}
              {dataTemplate?.gaSnippetsTemplate.totalCount > 6 && (
                <Row>
                  <Col className="d-flex justify-content-center">
                    <Button
                      variant="info"
                      className="fw-bold"
                      onClick={handleFetchMore}
                    >
                      <i className="fas fa-spinner"></i> LOAD MORE
                    </Button>
                  </Col>
                </Row>
              )}
            </Row>
          </Row>
        </Form>
      </Row>
    </>
  );
};

export default CreateInteraction;
