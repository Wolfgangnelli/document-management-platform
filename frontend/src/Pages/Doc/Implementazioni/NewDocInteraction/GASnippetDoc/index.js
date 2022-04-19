import React, { useState, useEffect, createContext, useContext } from "react";
import { Row, Col, Form, Button, Accordion, Table } from "react-bootstrap";
import { FullScreenModal } from "../../../../../components/Modal/FullScreen/FullScreenModal";
import SidePanel from "../../../../../components/SidePanelDoc/SidePanel";
import { useRouteMatch, useLocation } from "react-router-dom";
import { useGetEventsQuery } from "../../../../../hooks/graphql/queries/useGetEventsQuery/index";
import { useCreateGaSnippetMutation } from "../../../../../hooks/graphql/mutations/useCreateGaSnippetMutation/index";
import { useUpdateGaSnippetMutation } from "../../../../../hooks/graphql/mutations/useUpdateGaSnippetMutation/index";
import { useDeleteCustomFieldMutation } from "../../../../../hooks/graphql/mutations/useDeleteCustomFieldMutation/index";
import { GoBackBtn } from "../../../../../components/Buttons/GoBackBtn";
import { DocumentContext } from "../../../Doc";
import { ContexAlert } from "../../../../../App/App";
import { formattingVariableWithDollars } from "../../../../../helpers/functions";

export const ContextModal = createContext([]);

const GASnippetDoc = ({
  isUpdate = false,
  isSidePanel,
  dataSnippetUpdate,
  close,
}) => {
  const [show, setShow] = useState(false);

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

  const [eventName, setEventName] = useState("");

  const [customDimension, setCustomDimension] = useState({
    name: "",
    value: "",
    valueVariable: {
      name: "",
      type: "",
      dataVariable: {},
    },
    isDimension: true,
    isMetric: false,
  });

  const [event, setEvent] = useState("");

  const [name, setName] = useState("");

  const [customMetric, setCustomMetric] = useState({
    name: "",
    value: "",
    valueVariable: {
      name: "",
      type: "",
      dataVariable: {},
    },
    isDimension: false,
    isMetric: true,
  });

  const [eventIdCustom, setEventIdCustom] = useState("");

  const [allDimensions, setAllDimensions] = useState([]);

  const [allMetrics, setAllMetrics] = useState([]);

  const [clicked, setClicked] = useState("");

  const data = useContext(DocumentContext);

  const [setShowMessage, setMessage] = useContext(ContexAlert);

  const [isObjEventsFormatted, setIsObjEventsFormatted] = useState(false);

  let match = useRouteMatch();

  let location = useLocation();

  const { data: dataEvents } = useGetEventsQuery();

  const [createGaSnippet, { error: errorCreate, data: dataCreate }] =
    useCreateGaSnippetMutation();

  const [
    updateGaSnippet,
    { error: errorUpdate, loading: loadingUpdate, data: dataUpdate },
  ] = useUpdateGaSnippetMutation();

  const [
    customFieldDelete,
    { loading: loadingDelete, error: errorDelete, data: dataDelete },
  ] = useDeleteCustomFieldMutation();

  const handleSidePanel = (type, status) => {
    setClicked(type);
    if (status === "open" && type === "form-select-variable") {
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

  const handleCustomField = (fieldType) => {
    let fn, obj;
    if (fieldType === "dimension") {
      fn = setAllDimensions;
      obj = customDimension;
    } else {
      fn = setAllMetrics;
      obj = customMetric;
    }
    if (!!obj?.name) {
      fn((prev) => {
        let elementToUpdate = prev.find((item) => item?.id === obj?.id);
        if (elementToUpdate && elementToUpdate.id !== undefined) {
          return prev.map((item) => {
            if (item?.id === elementToUpdate?.id) {
              return {
                ...item,
                id: obj?.id,
                name: obj.name,
                value: obj.value,
                valueVariable: {
                  name: obj.valueVariable.name,
                  type: obj.valueVariable.type,
                  dataVariable: obj.valueVariable.dataVariable,
                },
              };
            }
            return item;
          });
        } else {
          return [
            ...prev,
            {
              name: obj.name,
              value: obj.value,
              valueVariable: {
                name: obj.valueVariable.name,
                type: obj.valueVariable.type,
                dataVariable: obj.valueVariable.dataVariable,
              },
              isDimension: fieldType === "dimension" ? true : false,
              isMetric: fieldType === "metric" ? true : false,
            },
          ];
        }
      });
    }
  };

  const deleteHandler = (deleteID, name) => {
    if (window.confirm(`Sei sicuro di voler eliminare il valore ${name}?`)) {
      customFieldDelete({
        variables: {
          deleteID,
        },
      });
    }
  };

  const FormattingEventsObj = (obj, nomeEvento) => {
    let keyObj = { ...obj };

    if (
      nomeEvento === "category" ||
      nomeEvento === "action" ||
      nomeEvento === "label"
    ) {
      if (Object.keys(keyObj["dataVariable"]).length > 0) {
        let varObj = {};
        if (
          keyObj["dataVariable"].hasOwnProperty("variablePk") &&
          keyObj["dataVariable"].hasOwnProperty("values")
        ) {
          const { variablePk, values } = keyObj["dataVariable"];
          varObj["variablePk"] = variablePk;
          varObj["values"] = values;
        } else {
          varObj["variablePk"] = +Object.keys(keyObj["dataVariable"])[0];
          varObj["values"] = Object.values(keyObj["dataVariable"])[0];
        }

        nomeEvento === "category"
          ? setCategory((prev) => {
              let { dataVariable, name, ...rest } = prev;
              dataVariable = varObj;
              name = name.replaceAll("$", "");
              return { dataVariable, name, ...rest };
            })
          : nomeEvento === "action"
          ? setAction((prev) => {
              let { dataVariable, name, ...rest } = prev;
              dataVariable = varObj;
              name = name.replaceAll("$", "");
              return { dataVariable, name, ...rest };
            })
          : nomeEvento === "label" &&
            setLabel((prev) => {
              let { dataVariable, name, ...rest } = prev;
              dataVariable = varObj;
              name = name.replaceAll("$", "");
              return { dataVariable, name, ...rest };
            });
      }
    } else if (nomeEvento === "dimensions" || nomeEvento === "metrics") {
      if (Object.keys(keyObj).length > 0) {
        for (const key in Object.keys(keyObj)) {
          if (nomeEvento === "dimensions") {
            let arrNoSnippet = allDimensions.filter(
              (item) => item?.valueVariable?.type !== "snippet"
            );
            let arrSnippet = allDimensions.filter(
              (item) => item?.valueVariable?.type === "snippet"
            );

            let newArrNoSnippet = [];
            arrNoSnippet.map((item) => {
              let varObj = {};
              varObj["variablePk"] = +Object.keys(
                item.valueVariable.dataVariable
              );
              varObj["values"] = Object.values(
                item.valueVariable.dataVariable
              )[0];

              newArrNoSnippet.push({
                name: item.name,
                value: !!item.valueVariable.type.length ? "" : item.value,
                valueVariable: {
                  name: item.valueVariable.name,
                  type: item.valueVariable.type,
                  dataVariable: varObj,
                },
                isDimension: item.isDimension,
                isMetric: item.isMetric,
                id: item.id ?? null,
              });
            });

            arrSnippet = arrSnippet.map((item) => {
              if (!!item.value.length && !!item.valueVariable.type.length) {
                item.value = "";
              }
              return item;
            });

            setAllDimensions([...arrSnippet, ...newArrNoSnippet]);
          }
          if (nomeEvento === "metrics") {
            let arrNoSnippet = allMetrics.filter(
              (item) => item?.valueVariable?.type !== "snippet"
            );
            let arrSnippet = allMetrics.filter(
              (item) => item?.valueVariable?.type === "snippet"
            );

            let newArrNoSnippet = [];
            arrNoSnippet.map((item) => {
              let varObj = {};
              varObj["variablePk"] = +Object.keys(
                item.valueVariable.dataVariable
              );
              varObj["values"] = Object.values(
                item.valueVariable.dataVariable
              )[0];

              newArrNoSnippet.push({
                name: item.name,
                value: !!item.valueVariable.type.length ? "" : item.value,
                valueVariable: {
                  name: item.valueVariable.name,
                  type: item.valueVariable.type,
                  dataVariable: varObj,
                },
                isDimension: item.isDimension,
                isMetric: item.isMetric,
                id: item.id ?? null,
              });
            });

            arrSnippet = arrSnippet.map((item) => {
              if (!!item.value.length && !!item.valueVariable.type.length) {
                item.value = "";
              }
              return item;
            });

            setAllMetrics([...arrSnippet, ...newArrNoSnippet]);
          }
        }
      }
    }
  };

  const getEventId = (event_obj) => {
    return event_obj.node.name === event;
  };

  const handleForm = (e) => {
    e.preventDefault();

    FormattingEventsObj(category, "category");
    FormattingEventsObj(action, "action");
    FormattingEventsObj(label, "label");
    allDimensions.length > 0 &&
      FormattingEventsObj(allDimensions, "dimensions");
    allMetrics.length > 0 && FormattingEventsObj(allMetrics, "metrics");

    setIsObjEventsFormatted(true);
  };

  const customFieldPreCompilation = (arrayDataFields) => {
    if (arrayDataFields) {
      arrayDataFields.edges.map((item) => {
        if (item?.node?.isDimension) {
          setAllDimensions((prev) => [
            ...prev,
            {
              name: item?.node?.name,
              value: item?.node?.value,
              valueVariable: {
                name: item?.node?.valueVariable?.name,
                type: "snippet",
                dataVariable: {
                  variablePk: item?.node?.pk,
                  values: item?.node?.valueVariable?.pk,
                },
              },
              isDimension: true,
              isMetric: false,
              id: item?.node?.pk,
            },
          ]);
        } else if (item.node.isMetric) {
          setAllMetrics((prev) => [
            ...prev,
            {
              name: item?.node?.name,
              value: item?.node?.value,
              valueVariable: {
                name: item?.node?.valueVariable?.name,
                type: "snippet",
                dataVariable: {
                  variablePk: item?.node?.pk,
                  values: item?.node?.valueVariable?.pk,
                },
              },
              isDimension: false,
              isMetric: true,
              id: item?.node?.pk,
            },
          ]);
        }
      });
    }
  };

  useEffect(() => {
    setCustomDimension({
      name: "",
      value: "",
      valueVariable: {
        name: "",
        type: "",
        dataVariable: {},
      },
      isDimension: true,
      isMetric: false,
    });
  }, [allDimensions]);

  useEffect(() => {
    setCustomMetric({
      name: "",
      value: "",
      valueVariable: {
        name: "",
        type: "",
        dataVariable: {},
      },
      isDimension: false,
      isMetric: true,
    });
  }, [allMetrics]);

  useEffect(() => {
    if (dataCreate || errorCreate) {
      setEvent("");
      setAllDimensions([]);
      setAllMetrics([]);
      setAction("");
      setLabel("");
      setCategory("");
      setName("");
      setCustomDimension({
        name: "",
        value: "",
      });
      setCustomMetric({
        name: "",
        value: "",
      });
      setEventName("");

      dataCreate
        ? setMessage("GA Snippet creato !")
        : errorCreate && setMessage(`${errorCreate?.message}`);
      setShowMessage(true);

      close("close");
    }

    if (dataUpdate || errorUpdate) {
      setEvent("");
      setAllDimensions([]);
      setAllMetrics([]);
      setAction("");
      setLabel("");
      setCategory("");
      setName("");
      setCustomDimension({
        name: "",
        value: "",
      });
      setCustomMetric({
        name: "",
        value: "",
      });
      setEventName("");
      setEventIdCustom("");

      dataUpdate
        ? setMessage("GA Snippet aggiornato!")
        : errorUpdate && setMessage(errorUpdate?.message);
      setShowMessage(true);

      close("close");
    }

    if (dataSnippetUpdate) {
      const {
        eventAction,
        eventActionVariable,
        eventCategory,
        eventCategoryVariable,
        eventLabel,
        eventLabelVariable,
      } = dataSnippetUpdate?.node;

      setEventIdCustom(dataSnippetUpdate?.node?.eventIdCustom);
      setEvent(dataSnippetUpdate?.node?.event.name);
      setName(dataSnippetUpdate?.node?.snippetName);
      dataSnippetUpdate?.node?.customField &&
        customFieldPreCompilation(dataSnippetUpdate?.node?.customField);
      setAction({
        name: eventActionVariable?.name
          ? formattingVariableWithDollars(eventActionVariable?.name)
          : eventAction,
        type: eventActionVariable?.name ? "snippet" : "text",
        dataVariable: !eventActionVariable?.name
          ? {}
          : {
              variablePk: eventActionVariable?.pk,
              values: eventActionVariable?.gaSnippetVariableValue?.edges.map(
                (item) => item.node.pk
              ),
            },
      });
      setCategory({
        name: eventCategoryVariable?.name
          ? formattingVariableWithDollars(eventCategoryVariable?.name)
          : eventCategory,
        type: eventCategoryVariable?.name ? "snippet" : "text",
        dataVariable: !eventCategoryVariable?.name
          ? {}
          : {
              variablePk: eventCategoryVariable?.pk,
              values: eventCategoryVariable?.gaSnippetVariableValue?.edges.map(
                (item) => item.node.pk
              ),
            },
      });
      setLabel({
        name: eventLabelVariable?.name
          ? formattingVariableWithDollars(eventLabelVariable?.name)
          : eventLabel,
        type: eventLabelVariable?.name ? "snippet" : "text",
        dataVariable: !eventLabelVariable?.name
          ? {}
          : {
              variablePk: eventLabelVariable?.pk,
              values: eventLabelVariable?.gaSnippetVariableValue?.edges.map(
                (item) => item.node.pk
              ),
            },
      });
    }

    if (dataDelete || errorDelete) {
      let mes = dataDelete
        ? "Campo custom eliminato!"
        : errorDelete && errorDelete?.message;
      setMessage(mes);
      setShowMessage(true);
    }
  }, [dataCreate, errorCreate, dataSnippetUpdate, dataDelete, errorDelete]);

  useEffect(() => {
    if (isObjEventsFormatted) {
      let event_obj = dataEvents.events.edges.find(getEventId);

      if (!dataSnippetUpdate) {
        createGaSnippet({
          variables: {
            gaSnippetData: {
              eventCategory: category,
              eventAction: action,
              eventLabel: label,
              snippetName: name,
              event: event_obj.node.pk,
              datalayer: data?.datalayer?.pk,
              customFields: [...allDimensions, ...allMetrics],
            },
          },
        });
      }

      if (dataSnippetUpdate) {
        updateGaSnippet({
          variables: {
            updateData: {
              id: dataSnippetUpdate?.node.pk,
              eventIdCustom,
              eventCategory: category,
              eventAction: action,
              eventLabel: label,
              snippetName: name,
              event: event_obj.node.pk,
              datalayer: data?.datalayer?.pk,
              customFields: [...allDimensions, ...allMetrics],
            },
          },
        });
      }
      setIsObjEventsFormatted(false);
      handleSidePanel(null, "close");
    }
  }, [
    isObjEventsFormatted,
    category,
    action,
    label,
    setIsObjEventsFormatted,
    allDimensions,
    allMetrics,
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
      {dataEvents && (
        <Row>
          {!isSidePanel && <GoBackBtn />}{" "}
          <Col>
            <h1>{isUpdate ? "Update " : "Crea "}GA Snippet Doc</h1>
          </Col>
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
                    {dataEvents?.events &&
                      dataEvents.events.edges.map((item) => (
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
                        setCategory({
                          type: "text",
                          name: e.target.value,
                          dataVariable: {},
                        })
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
                        setAction({
                          type: "text",
                          name: e.target.value,
                          dataVariable: {},
                        })
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
                        setLabel({
                          type: "text",
                          name: e.target.value,
                          dataVariable: {},
                        })
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
              {isUpdate && (
                <Col lg={5}>
                  <Form.Group className="mb-3" controlId="eventId">
                    <Form.Label>Event ID: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Inserisci id"
                      required
                      value={eventIdCustom}
                      onChange={(e) => setEventIdCustom(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              )}
            </Row>
            {!location.pathname.includes("/dashboard") && (
              <Row>
                <Col>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header style={{ paddingTop: 0 }}>
                        Custom Dimensions
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col lg={5}>
                            <Form.Group className="mb-3" controlId="name">
                              <Form.Label>name: </Form.Label>
                              <div className="d-flex">
                                <Form.Control
                                  type="text"
                                  placeholder="Enter name"
                                  value={customDimension.name}
                                  onChange={(e) =>
                                    setCustomDimension((prev) => ({
                                      ...prev,
                                      name: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </Form.Group>
                          </Col>
                          <Col lg={5}>
                            <Form.Group className="mb-3" controlId="value">
                              <Form.Label>value: </Form.Label>
                              <div className="d-flex">
                                <Form.Control
                                  type="text"
                                  placeholder="Enter value"
                                  value={customDimension.value}
                                  onChange={(e) =>
                                    setCustomDimension((prev) => ({
                                      ...prev,
                                      value: e.target.value,
                                      valueVariable: {
                                        name: "",
                                        type: "",
                                        dataVariable: {},
                                      },
                                    }))
                                  }
                                />
                                <Button
                                  title="variables"
                                  onClick={() => {
                                    handleSidePanel(
                                      "form-select-variable",
                                      "open"
                                    );
                                    setEventName("dimension_value");
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
                          <Col
                            lg={2}
                            className="d-flex align-items-center justify-content-evenly mb-2"
                          >
                            <Button
                              variant="success"
                              onClick={() => handleCustomField("dimension")}
                            >
                              <i className="fa-solid fa-plus"></i>
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={8}>
                            <Table striped bordered hover responsive size="sm">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Name</th>
                                  <th>Value</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {allDimensions.map((dim, idx) => (
                                  <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{dim.name}</td>
                                    <td>{dim.value}</td>
                                    <td className="d-flex justify-content-evenly">
                                      <Button
                                        variant="light"
                                        className="btn-sm"
                                        title="modifica"
                                        onClick={() =>
                                          setCustomDimension(() => ({
                                            ...dim,
                                          }))
                                        }
                                      >
                                        <i className="fas fa-edit"></i>
                                      </Button>
                                      <Button
                                        variant="danger"
                                        className="btn-sm"
                                        title="elimina"
                                        onClick={() =>
                                          deleteHandler(dim?.id, dim?.name)
                                        }
                                      >
                                        <i className="fas fa-trash"></i>
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header style={{ paddingTop: 0 }}>
                        Custom Metrics
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col lg={5}>
                            <Form.Group className="mb-3" controlId="name">
                              <Form.Label>name: </Form.Label>
                              <div className="d-flex">
                                <Form.Control
                                  type="text"
                                  placeholder="Enter name"
                                  value={customMetric.name}
                                  onChange={(e) =>
                                    setCustomMetric((prev) => ({
                                      ...prev,
                                      name: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </Form.Group>
                          </Col>
                          <Col lg={5}>
                            <Form.Group className="mb-3" controlId="value">
                              <Form.Label>value: </Form.Label>
                              <div className="d-flex">
                                <Form.Control
                                  type="text"
                                  placeholder="Enter value"
                                  value={customMetric.value}
                                  onChange={(e) =>
                                    setCustomMetric((prev) => ({
                                      ...prev,
                                      value: e.target.value,
                                      valueVariable: {
                                        name: "",
                                        type: "",
                                        dataVariable: {},
                                      },
                                    }))
                                  }
                                />
                                <Button
                                  title="variables"
                                  onClick={() => {
                                    handleSidePanel(
                                      "form-select-variable",
                                      "open"
                                    );
                                    setEventName("metric_value");
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
                          <Col
                            lg={2}
                            className="d-flex align-items-center justify-content-end mb-2"
                          >
                            <Button
                              variant="success"
                              onClick={() => handleCustomField("metric")}
                            >
                              <i className="fas fa-plus"></i>
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={8}>
                            <Table striped bordered hover responsive size="sm">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Name</th>
                                  <th>Value</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {allMetrics.map((met, idx) => (
                                  <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{met.name}</td>
                                    <td>{met.value}</td>
                                    <td className="d-flex justify-content-evenly">
                                      <Button
                                        variant="light"
                                        className="btn-sm"
                                        title="modifica"
                                        onClick={() =>
                                          setCustomMetric(() => ({
                                            ...met,
                                          }))
                                        }
                                      >
                                        <i className="fas fa-edit"></i>
                                      </Button>
                                      <Button
                                        variant="danger"
                                        className="btn-sm"
                                        title="elimina"
                                        onClick={() =>
                                          deleteHandler(met?.id, met?.name)
                                        }
                                      >
                                        <i className="fas fa-trash"></i>
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
              </Row>
            )}
          </Form>
        </Row>
      )}
    </ContextModal.Provider>
  );
};

export default GASnippetDoc;
