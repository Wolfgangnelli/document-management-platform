import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Table, Button, Pagination } from "react-bootstrap";
import { listVariablesQuery } from "../../hooks/graphql/queries/useGetVariablesQuery/index";
import { getDocumentVariablesQuery } from "../../hooks/graphql/queries/useGetDocumentVariablesQuery/index";
import { useLazyQuery } from "@apollo/client";
import Loader from "../Loader/index";
import Message from "../Message/index";
import { handleVariable } from "../../helpers/functions";
import { DocumentContext } from "../../Pages/Doc/Doc";
import { ContextModal } from "../../Pages/Doc/Implementazioni/NewDocInteraction/GASnippetDoc/index";
import "./_selectVariables.scss";

export const SelectVariable = ({ close }) => {
  const [variables, setVariables] = useState({});

  const [documentVariables, setDocumentVariables] = useState({});

  const [editVariableID, setEditVariableID] = useState(null);

  const [loadData, setLoadData] = useState("");

  const [variableValues, setVariableValues] = useState(undefined);

  const [checked, setChecked] = useState({});

  const [filteredData, setFilteredData] = useState({
    variables: {
      edges: [],
      pageInfo: {},
      totalCount: 0,
    },
  });

  const [filteredDocumentData, setFilteredDocumentData] = useState({
    documentVariables: {
      edges: [],
      pageInfo: {},
      totalCount: 0,
    },
  });

  const data = useContext(DocumentContext);

  const [
    setCategory,
    setAction,
    setLabel,
    setCustomDimension,
    setCustomMetric,
    eventName,
    setShow,
  ] = useContext(ContextModal);

  const [
    allVariables,
    {
      loading: loadingVariables,
      error: errorVariables,
      data: dataVariables,
      fetchMore: fetchMoreVariables,
    },
  ] = useLazyQuery(listVariablesQuery, {
    variables: {
      before: null,
      after: null,
      first: 5,
      last: null,
    },
  });

  const [
    getDocumentVariables,
    {
      loading: loadingDocumentVariables,
      error: errorDocumentVariables,
      data: dataDocumentVariables,
      fetchMore: fetchMoreDocumentVariables,
    },
  ] = useLazyQuery(getDocumentVariablesQuery, {
    variables: {
      before: null,
      after: null,
      first: 5,
      last: null,
    },
  });

  const deleteHandler = (k, n) => {
    if (window.confirm(`Sei sicuro di voler eliminare la variabile ${n}?`)) {
      alert("not implement yet");
      /* deleteDocumentVariable({
        variables: {
          delete_id: k,
        },
      }); */
    }
  };

  const formattingVariable = (var_name) => {
    return `$$$${var_name}$$$`;
  };

  const handleSave = () => {
    if (Object.keys(checked).length > 0) {
      const { name } = checked;

      const dataVariable =
        Object.keys(variables).length > 0
          ? variables
          : Object.keys(documentVariables).length > 0 && documentVariables;

      const typeVariable =
        Object.keys(variables).length > 0
          ? "template"
          : Object.keys(documentVariables).length > 0 && "document";

      switch (eventName) {
        case "category":
          setCategory({
            name: formattingVariable(name),
            dataVariable: dataVariable,
            type: typeVariable,
          });
          break;
        case "action":
          setAction({
            name: formattingVariable(name),
            dataVariable: dataVariable,
            type: typeVariable,
          });
          break;
        case "label":
          setLabel({
            name: formattingVariable(name),
            dataVariable: dataVariable,
            type: typeVariable,
          });
          break;
        case "dimension_name":
          setCustomDimension((prev) => ({ ...prev, name: name }));
          break;
        case "dimension_value":
          setCustomDimension((prev) => ({
            ...prev,
            value: name,
            valueVariable: {
              name: "",
              dataVariable: dataVariable,
              type: typeVariable,
            },
          }));
          break;
        case "metric_name":
          setCustomMetric((prev) => ({ ...prev, name: name }));
          break;
        case "metric_value":
          setCustomMetric((prev) => ({
            ...prev,
            value: name,
            valueVariable: {
              name: "",
              dataVariable: dataVariable,
              type: typeVariable,
            },
          }));
          break;
        default:
          break;
      }
    }
  };

  const handleChecked = (id, name) => {
    if (Object.keys(checked).length > 0) {
      setChecked({});
    } else {
      setChecked({
        id: id,
        name: name,
      });
    }
  };

  // MEMO: gestire meglio il setChecked(id) perchè se non scelgo alcun valore e clicco la X per uscire dal panel il nome della var viene inviato lo stesso
  const handleSubmit = () => {
    if (Object.keys(variables).length > 0) {
      for (const key in variables) {
        if (!variables[key].length > 0) {
          setVariableValues(false);
          setTimeout(() => {
            setVariableValues(undefined);
          }, 4000);
        } else {
          handleSave();
          close("close");
        }
      }
    } else if (Object.keys(documentVariables).length > 0) {
      for (const key in documentVariables) {
        if (!documentVariables[key].length > 0) {
          setVariableValues(false);
          setTimeout(() => {
            setVariableValues(undefined);
          }, 4000);
        } else {
          handleSave();
          close("close");
        }
      }
    }
  };

  const handleSearch = (term = "") => {
    let termLowerCase = term.toLowerCase();

    if (dataVariables && loadData === "template") {
      setFilteredData((prev) => {
        let {
          variables: { edges, totalCount, ...rest },
        } = prev;

        edges = dataVariables?.variables?.edges.filter((item) => {
          if (termLowerCase === "") {
            return item;
          } else {
            return item.node.name.toLowerCase().includes(termLowerCase);
          }
        });

        totalCount =
          termLowerCase === ""
            ? dataVariables?.variables?.totalCount
            : edges.length;

        return { variables: { edges, totalCount, ...rest } };
      });
    } else if (dataDocumentVariables && loadData === "document") {
      setFilteredDocumentData((prev) => {
        let {
          documentVariables: { edges, totalCount, ...rest },
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

        totalCount =
          termLowerCase === ""
            ? dataDocumentVariables?.variables?.totalCount
            : edges.length;

        return { documentVariables: { edges, totalCount, ...rest } };
      });
    }
  };

  const handleFetchVariables = (prev, after, isDocument, isTemplate) => {
    if (dataDocumentVariables && isDocument) {
      if (after) {
        fetchMoreDocumentVariables({
          variables: {
            after:
              dataDocumentVariables?.documentVariables?.pageInfo?.endCursor,
            before: null,
            first: 5,
            last: null,
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.documentVariables.edges;
            const pageInfo = fetchMoreResult.documentVariables.pageInfo;

            return newEdges.length
              ? {
                  documentVariables: {
                    __typename: prevResult.documentVariables.__typename,
                    edges: [...newEdges],
                    pageInfo,
                    totalCount: prevResult.documentVariables.totalCount,
                  },
                }
              : prevResult;
          },
        });
      } else if (prev) {
        fetchMoreDocumentVariables({
          variables: {
            after: null,
            before:
              dataDocumentVariables?.documentVariables?.pageInfo?.startCursor,
            last: 5,
            first: null,
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.documentVariables.edges;
            const pageInfo = fetchMoreResult.documentVariables.pageInfo;

            return newEdges.length
              ? {
                  documentVariables: {
                    __typename: prevResult.documentVariables.__typename,
                    edges: [...newEdges],
                    pageInfo,
                    totalCount: prevResult.documentVariables.totalCount,
                  },
                }
              : prevResult;
          },
        });
      }
    } else if (dataVariables && isTemplate) {
      if (after) {
        fetchMoreVariables({
          variables: {
            after: dataVariables?.variables?.pageInfo?.endCursor,
            before: null,
            last: null,
            first: 5,
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.variables.edges;
            const pageInfo = fetchMoreResult.variables.pageInfo;

            return newEdges.length
              ? {
                  variables: {
                    __typename: prevResult.variables.__typename,
                    edges: [...newEdges],
                    pageInfo,
                    totalCount: prevResult.variables.totalCount,
                  },
                }
              : prevResult;
          },
        });
      } else if (prev) {
        fetchMoreVariables({
          variables: {
            before: dataVariables?.variables?.pageInfo?.startCursor,
            after: null,
            last: 5,
            first: null,
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.variables.edges;
            const pageInfo = fetchMoreResult.variables.pageInfo;

            return newEdges.length
              ? {
                  variables: {
                    __typename: prevResult.variables.__typename,
                    edges: [...newEdges],
                    pageInfo,
                    totalCount: prevResult.variables.totalCount,
                  },
                }
              : prevResult;
          },
        });
      }
    }
  };

  useEffect(() => {
    if (dataVariables || dataDocumentVariables) {
      handleSearch();
    }
  }, [dataVariables, dataDocumentVariables]);

  return (
    <>
      <Row>
        <Col>
          <h1 className="pb-1">Scegli una variabile</h1>
        </Col>
        <Row>
          {Object.keys(checked).length === 0 ? (
            <Col
              lg={10}
              className="d-flex justify-content-center align-items-center"
            >
              <Button
                onClick={() => {
                  setLoadData("template");
                  allVariables();
                }}
                size="sm"
              >
                <i className="fas fa-spinner"></i> TEMPLATE VARIABLES
              </Button>
              <Button
                size="sm"
                className="mx-1"
                onClick={() => {
                  setLoadData("document");
                  getDocumentVariables({
                    variables: {
                      document_id: data?.id,
                    },
                  });
                }}
              >
                <i className="fas fa-spinner"></i> DOCUMENT VARIABLES
              </Button>
            </Col>
          ) : (
            <Col lg={10}></Col>
          )}
          <Col
            lg={2}
            className="d-flex justify-content-center align-items-center"
          >
            <Button variant="success" onClick={handleSubmit}>
              Save
            </Button>
          </Col>
        </Row>
        <Row className="text-center">{loadingVariables && <Loader />}</Row>
        <Row>
          <Col lg={10}>
            {errorVariables && (
              <Message variant="danger">{errorVariables?.message}</Message>
            )}
            {variableValues === false && (
              <Message variant="warning">
                <span className="text-warning">ATTENZIONE:</span> Nella
                variabile devi selezionare almeno un valore !
              </Message>
            )}
          </Col>
        </Row>
        {/* BUILT-IN VARIBLES */}
        {loadData === "template" && dataVariables && filteredData && (
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
                          disabled={
                            Object.keys(checked).length <= 0
                              ? false
                              : checked?.id === _.node.id
                              ? false
                              : true
                          }
                          onChange={() => {
                            handleChecked(_.node.id, _.node.name);
                            handleVariable(_.node.pk, variables, setVariables);
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
                                    checked={
                                      !!variables[_.node.pk].find(
                                        (el) => el === item.node.pk
                                      )
                                    }
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
              {filteredData?.variables?.totalCount >= 6 &&
                !checked.id && ( //dataVariables?.variables?.totalCount >= 6
                  <Pagination className="d-flex justify-content-center">
                    <Pagination.Prev
                      onClick={() =>
                        handleFetchVariables(true, false, false, true)
                      }
                    />
                    <Pagination.Next
                      onClick={() => {
                        handleFetchVariables(false, true, false, true);
                      }}
                    />
                  </Pagination>
                )}
            </Col>
          </Row>
        )}
        {/* DOCUMENT VARIABLES */}
        <Row className="text-center">
          {loadingDocumentVariables && <Loader />}
        </Row>
        {errorDocumentVariables && (
          <Message variant="danger">{errorDocumentVariables?.message}</Message>
        )}
        {dataDocumentVariables &&
          filteredDocumentData &&
          loadData === "document" && (
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
                          onClick={() => setShow(true)}
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
                              //checked={_.node.pk in documentVariables}
                              disabled={
                                Object.keys(checked).length <= 0
                                  ? false
                                  : checked?.id === _.node.id
                                  ? false
                                  : true
                              }
                              onChange={() => {
                                handleChecked(_.node.id, _.node.name);
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
                                          checked={
                                            !!documentVariables[_.node.pk].find(
                                              (el) => el === item.node.pk
                                            )
                                          }
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
                                  /* handleSidePanel("doc-variable", "open"); */
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
                {filteredDocumentData?.documentVariables?.totalCount >= 6 &&
                  !checked.id && (
                    <Pagination className="d-flex justify-content-center">
                      <Pagination.Prev
                        onClick={() =>
                          handleFetchVariables(true, false, true, false)
                        }
                      />
                      <Pagination.Next
                        onClick={() =>
                          handleFetchVariables(false, true, true, false)
                        }
                      />
                    </Pagination>
                  )}
              </Col>
            </Row>
          )}
      </Row>
    </>
  );
};
