import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Form, Table, Button } from "react-bootstrap";
import { useRouteMatch, useLocation } from "react-router-dom";
import SidePanel from "../../SidePanelDoc/SidePanel";
import { useListVariablesQuery } from "../../../hooks/graphql/queries/useGetVariablesQuery/index";
import { useGetDocumentVariablesQuery } from "../../../hooks/graphql/queries/useGetDocumentVariablesQuery/index";
import { useDeleteDocumentVariableMutation } from "../../../hooks/graphql/mutations/useDeleteDocumentVariableMutation/index";
import Loader from "../../Loader/index";
import Message from "../../Message/index";
import "./_initialSnippet.scss";
import { handleVariable } from "../../../helpers/functions";
import { ContexAlert } from "../../../App/App";
import { ContextInitialSnippetData } from "../../../Pages/Doc/DataLayerEgtm/InclusioneDataLayer/EditDatalayer/index";
import { DocumentContext } from "../../../Pages/Doc/Doc";
import { useCreateInitialSnippetVariableMutation } from "../../../hooks/graphql/mutations/useCreateInitialSnippetVariableMutation/index";

export const AddVariable = ({ close }) => {
  const [checked, setChecked] = useState("");

  const [variables, setVariables] = useState({});

  const [variableAlreadyExist, setVariableAlreadyExist] = useState(null);

  const [filteredData, setFilteredData] = useState({
    variables: {
      edges: [],
      pageInfo: {},
      totalCount: null,
    },
  });

  const [filteredDocumentData, setFilteredDocumentData] = useState({
    documentVariables: {
      edges: [],
      pageInfo: {},
      totalCount: null,
    },
  });

  const [documentVariables, setDocumentVariables] = useState({});

  const [clicked, setClicked] = useState("");

  const [editVariableID, setEditVariableID] = useState(null);

  const [setShowMessage, setMessage] = useContext(ContexAlert);

  const [dataInitialSnippet, listVariableType] = useContext(
    ContextInitialSnippetData
  );

  const [arrVariables, setArrVariables] = useState([]);

  const [arrDocVariables, setArrDocVariables] = useState([]);

  const [noValuesSelected, setNoValuesSelected] = useState([]);

  const [send, setSend] = useState(false);

  const data = useContext(DocumentContext);

  let match = useRouteMatch();

  let location = useLocation();

  // TEMPLATE VARIABLES
  const {
    loading: loadingVariables,
    error: errorVariables,
    data: dataVariables,
  } = useListVariablesQuery({
    skip: listVariableType !== "template-variables",
  });

  // DOCUMENT VARIABLES
  const {
    loading: loadingDocumentVariables,
    error: errorDocumentVariables,
    data: dataDocumentVariables,
  } = useGetDocumentVariablesQuery({
    variables: {
      document_id: data?.id,
    },
    skip: listVariableType !== "document-variables",
  });

  const [deleteDocumentVariable, { error: errorDelete, data: dataDelete }] =
    useDeleteDocumentVariableMutation();

  // INITIAL SNIPPET VARIABLE
  const [
    createInitialSnippetVariable,
    {
      loading: loadingCreateInitial,
      error: errorCreateInitial,
      data: dataCreateInitial,
    },
  ] = useCreateInitialSnippetVariableMutation();

  const FormattingVariablesObj = (keyObj, keyName) => {
    for (const key in keyObj) {
      let varObj = {};
      varObj[`${keyName}`] = key;
      varObj["values"] = keyObj[key];
      keyName === "builtInVariable"
        ? setArrVariables((prev) => [...prev, varObj])
        : setArrDocVariables((prev) => [...prev, varObj]);
    }
  };

  let ok = true;
  const checkContentValue = (obj, objType) => {
    for (const key in obj) {
      if (!obj[key].length > 0) {
        ok = false;
        let el;
        if (
          objType === "builtInVariable" &&
          (el = dataVariables?.variables?.edges.find((_) => _.node.pk === +key))
        ) {
          setNoValuesSelected((prev) => [...prev, el.node.name]);
        } else if (
          objType === "documentVariable" &&
          (el = dataDocumentVariables?.documentVariables?.edges.find(
            (_) => _.node.pk === +key
          ))
        ) {
          setNoValuesSelected((prev) => [...prev, el.node.name]);
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkContentValue(variables, "builtInVariable");
    checkContentValue(documentVariables, "documentVariable");

    if (ok) {
      setNoValuesSelected([]);

      FormattingVariablesObj(variables, "builtInVariable");
      FormattingVariablesObj(documentVariables, "documentVariable");

      setSend(true);
    }
  };

  const deleteHandler = (k, n) => {
    if (window.confirm(`Sei sicuro di voler eliminare la variabile ${n}?`)) {
      deleteDocumentVariable({
        variables: {
          delete_id: k,
        },
      });
    }
  };

  const handleSidePanel = (type, status) => {
    setClicked(type);
    if (status === "open" && type === "doc-variable") {
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

  const handleSearch = (term = "") => {
    let termLowerCase = term.toLowerCase();

    if (dataVariables && listVariableType === "template-variables") {
      setFilteredData((prev) => {
        let {
          variables: { edges, ...rest },
        } = prev;

        edges = dataVariables?.variables?.edges.filter((item) => {
          if (termLowerCase === "") {
            return item;
          } else {
            return item.node.name.toLowerCase().includes(termLowerCase);
          }
        });
        return { variables: { edges, ...rest } };
      });
    } else if (
      dataDocumentVariables &&
      listVariableType === "document-variables"
    ) {
      setFilteredDocumentData((prev) => {
        let {
          documentVariables: { edges, ...rest },
        } = prev;

        edges = dataDocumentVariables?.documentVariables?.edges.filter(
          (item) => {
            if (termLowerCase === "") {
              return item;
            } else {
              return item.node.name.toLowerCase().includes(termLowerCase);
            }
          }
        );
        return { documentVariables: { edges, ...rest } };
      });
    }
  };

  const checkIfAlreadyExist = (id, varType) => {
    let varObj;
    if (varType === "doc") {
      varObj = dataDocumentVariables?.documentVariables?.edges?.find(
        (_) => _.node.pk === +id
      );
    } else if (varType === "template") {
      varObj = dataVariables?.variables?.edges.find((_) => _.node.pk === +id);
    }
    return dataInitialSnippet?.initialSnippet?.initialSnippetVariable.edges.find(
      (item) => item.node.name === varObj.node.name
    );
  };

  const handleChecked = (id) => {
    checked.length > 0 ? setChecked("") : setChecked(id);
  };

  useEffect(() => {
    if (dataDelete?.deleteDocumentVariable?.ok) {
      setMessage("Document variable deleted correctly !");
      setShowMessage(true);
    }
    if (dataCreateInitial) {
      let mes = dataCreateInitial
        ? "Initial snippet variable creata !"
        : errorCreateInitial && `${errorCreateInitial?.message}`;

      setMessage(mes);

      setShowMessage(true);

      setArrDocVariables([]);
      setArrVariables([]);
      setChecked("");
      setVariables({});
      setDocumentVariables({});

      close("close");
    }
  }, [dataDelete, dataCreateInitial]);

  useEffect(() => {
    if (send) {
      let idToChecked;
      let varType;
      if (arrDocVariables.length > 0) {
        idToChecked = arrDocVariables[0]["documentVariable"];
        varType = "doc";
      } else {
        idToChecked = arrVariables[0]["builtInVariable"];
        varType = "template";
      }

      let alreadyExist = checkIfAlreadyExist(idToChecked, varType);

      if (alreadyExist !== undefined) {
        setVariableAlreadyExist(alreadyExist?.node.name);
      } else {
        createInitialSnippetVariable({
          variables: {
            data_variable: {
              initialSnippet: data?.datalayer?.initialSnippet?.pk,
              builtInVariables: arrVariables,
              documentVariables: arrDocVariables,
            },
          },
        });
      }
    }
  }, [send, createInitialSnippetVariable]);

  useEffect(() => {
    if (dataVariables || dataDocumentVariables) {
      handleSearch();
    }
  }, [dataVariables, dataDocumentVariables]);

  return (
    <>
      <SidePanel
        handleSidePanel={handleSidePanel}
        clicked={clicked}
        editVariableID={editVariableID}
        setEditVariableID={setEditVariableID}
      />
      <Row>
        <Col>
          <h1 className="py-1">
            {listVariableType === "template-variables"
              ? "Aggiungi template variable"
              : "Aggiungi document variable"}
          </h1>
        </Col>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={10}></Col>
            <Col
              lg={2}
              className="d-flex justify-content-center align-items-center"
            >
              <Button variant="success" type="submit">
                Save
              </Button>
            </Col>
          </Row>
          <Row>
            <Col lg={10}>
              {loadingVariables && <Loader />}
              {errorVariables && (
                <Message variant="danger">{errorVariables?.message}</Message>
              )}
              {variableAlreadyExist && (
                <Message variant="warning">
                  ATTENZIONE: La variabile{" "}
                  <span className="text-warning">{variableAlreadyExist}, </span>
                  è già presente nello snippet, controlla !
                </Message>
              )}
              {noValuesSelected.length > 0 && (
                <Message variant="warning">
                  ATTENZIONE: Nella variabile{" "}
                  {noValuesSelected.map((item, idx) => (
                    <span className="text-warning" key={idx + 1}>
                      {item},{" "}
                    </span>
                  ))}{" "}
                  non hai selezionato alcun valore, controlla!
                </Message>
              )}
            </Col>
          </Row>
          {/* TEMPLATE VARIABLES */}
          {filteredData && listVariableType === "template-variables" && (
            <Row className="pt-4">
              <Col className="mb-3 border rounded">
                <Row>
                  <Col md={8}>
                    <h3>Template Variables</h3>
                  </Col>
                  <Col
                    md={4}
                    style={{ paddingTop: "30px", paddingBottom: "30px" }}
                  >
                    <Row>
                      <Col>
                        <div className="has-search">
                          <i className="fas fa-search form-control-feedback"></i>
                          <Form.Control
                            type="text"
                            placeholder="Ricerca"
                            size="sm"
                            onChange={(e) => handleSearch(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Value</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData?.variables?.edges.map((_, index) => (
                      <tr key={index}>
                        <td>
                          <Form.Check
                            type="checkbox"
                            id={_.node.pk}
                            checked={_.node.id === checked}
                            disabled={
                              checked.length <= 0
                                ? false
                                : checked === _.node.id
                                ? false
                                : true
                            }
                            onChange={() => {
                              handleChecked(_.node.id);
                              handleVariable(
                                _.node.pk,
                                variables,
                                setVariables
                              );
                            }}
                          />
                        </td>
                        <td>{_.node.name}</td>
                        <td>
                          {_?.node?.variableValue?.edges.map((item, idx) => (
                            <pre className="text-wrap" key={idx}>
                              {item.node.name.length > 0 && (
                                <span>
                                  {idx + 1}
                                  {") "}
                                  {item.node.name}
                                  {variables[_.node.pk] && (
                                    <Form.Check
                                      type="checkbox"
                                      className="ps-1 d-inline"
                                      id={item.node.pk}
                                      onChange={() =>
                                        handleVariable(
                                          _.node.pk,
                                          variables,
                                          setVariables,
                                          item.node.pk
                                        )
                                      }
                                    />
                                  )}
                                </span>
                              )}
                            </pre>
                          ))}
                        </td>
                        <td>
                          {_?.node?.variableValue?.edges.map((_, idx) => (
                            <pre className="text-wrap" key={idx}>
                              {_.node.condition.length > 0 && (
                                <span>
                                  {idx + 1}
                                  {") "}
                                  {_.node.condition}
                                </span>
                              )}
                            </pre>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          )}
          {/* DOCUMENT VARIABLES */}
          {loadingDocumentVariables && <Loader />}
          {errorDocumentVariables && (
            <Message variant="danger">
              {errorDocumentVariables?.message}
            </Message>
          )}
          {filteredDocumentData && listVariableType === "document-variables" && (
            <Row className="pt-4">
              <Col className="mb-3 mx-auto border rounded">
                <Row>
                  <Col md={7}>
                    <h3>Document Variables</h3>
                  </Col>
                  <Col
                    md={5}
                    style={{ paddingTop: "30px", paddingBottom: "30px" }}
                  >
                    <Row>
                      <Col md={8} className="search-new">
                        <div className="has-search">
                          <i className="fas fa-search form-control-feedback"></i>
                          <Form.Control
                            type="text"
                            placeholder="Ricerca"
                            size="sm"
                            onChange={(e) => handleSearch(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <Button
                          variant="info"
                          className="btn-new"
                          onClick={() =>
                            handleSidePanel("doc-variable", "open")
                          }
                        >
                          New
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Value</th>
                      <th>Condition</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocumentData?.documentVariables?.edges?.map(
                      (_) => (
                        <tr key={_.node.pk}>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={_.node.id === checked}
                              disabled={
                                checked.length <= 0
                                  ? false
                                  : checked === _.node.id
                                  ? false
                                  : true
                              }
                              onChange={(e) => {
                                handleChecked(_.node.id);
                                handleVariable(
                                  _.node.pk,
                                  documentVariables,
                                  setDocumentVariables
                                );
                              }}
                            />
                          </td>
                          <td>{_.node.name}</td>
                          <td>
                            {_?.node?.documentVariableValue?.edges.map(
                              (item, idx) => (
                                <pre className="text-wrap" key={idx}>
                                  {item.node.name.length > 0 && (
                                    <span>
                                      {idx + 1}
                                      {") "}
                                      {item.node.name}
                                      {documentVariables[_.node.pk] && (
                                        <Form.Check
                                          type="checkbox"
                                          className="ps-1 d-inline"
                                          id={item.node.pk}
                                          /* checked={
                                            !!documentVariables[_.node.pk].find(
                                              (el) => el === item.node.pk
                                            )
                                          } */
                                          onChange={() =>
                                            handleVariable(
                                              _.node.pk,
                                              documentVariables,
                                              setDocumentVariables,
                                              item.node.pk
                                            )
                                          }
                                        />
                                      )}
                                    </span>
                                  )}
                                </pre>
                              )
                            )}
                          </td>

                          <td>
                            {_?.node?.documentVariableValue?.edges.map(
                              (item, idx) => (
                                <pre className="text-wrap" key={item.node.pk}>
                                  {item.node.condition.length > 0 && (
                                    <span>
                                      {idx + 1}
                                      {") "}
                                      {item.node.condition}
                                    </span>
                                  )}
                                </pre>
                              )
                            )}
                          </td>

                          <td>
                            <div className="d-flex flex-column justify-content-around align-items-center h-100">
                              <Button
                                variant="light"
                                className="btn-sm"
                                onClick={() => {
                                  handleSidePanel("doc-variable", "open");
                                  setEditVariableID(_.node.id);
                                }}
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                              <Button
                                variant="danger"
                                className="btn-sm mt-1"
                                onClick={() =>
                                  deleteHandler(_.node.pk, _.node.name)
                                }
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          )}
        </Form>
      </Row>
    </>
  );
};
