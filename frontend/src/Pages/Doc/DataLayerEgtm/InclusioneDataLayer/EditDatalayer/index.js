import React, { useState, useContext, createContext, useEffect } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { GoBackBtn } from "../../../../../components/Buttons/GoBackBtn";
import SidePanel from "../../../../../components/SidePanelDoc/SidePanel";
import { useGetInitialSnippetQuery } from "../../../../../hooks/graphql/queries/useGetInitialSnippetQuery/index";
import { useDeleteInitialSnippetVariable } from "../../../../../hooks/graphql/mutations/useDeleteInitialSnippetVariableMutation/index";
import Loader from "../../../../../components/Loader/index";
import Message from "../../../../../components/Message/index";
import { DocumentContext } from "../../../Doc";
import "./_editDatalayer.scss";
import { ContexAlert } from "../../../../../App/App";

export const ContextInitialSnippetData = createContext();

const EditDatalayer = () => {
  const [clicked, setClicked] = useState("");

  const [editVariable, setEditVariable] = useState({});

  const [listVariableType, setListVariableType] = useState("");

  const data = useContext(DocumentContext);

  const [setShowMessage, setMessage] = useContext(ContexAlert);

  const {
    loading: loadingInitialSnippet,
    error: errorInitialSnippet,
    data: dataInitialSnippet,
  } = useGetInitialSnippetQuery({
    variables: {
      id: data?.datalayer?.initialSnippet?.id,
    },
    skip: !data?.datalayer?.initialSnippet?.id,
  });

  const [deleteInitialSnippetVariable, { data: dataDelete }] =
    useDeleteInitialSnippetVariable();

  const handleSidePanel = (type, status) => {
    setClicked(type);
    if (
      (status === "open" && type === "initial-snippet") ||
      type === "edit-initial-snippet-variable"
    ) {
      document.querySelectorAll(`.sidepanel`)[0].style.width = "75vw";
      document.querySelector(".sheet-overlay").style.opacity = "0.62";
      document.querySelector(".sheet-overlay").style.visibility = "visible";
    } else {
      document.querySelectorAll(`.sidepanel`)[0].style.width = "0";
      document.querySelectorAll(`.sidepanel`)[0].style.opacity = "1";
      document.querySelector(".sheet-overlay").style.opacity = "0";
      document.querySelector(".sheet-overlay").style.visibility = "hidden";
    }
  };

  const deleteHandler = (k, n) => {
    if (window.confirm(`Sei sicuro di voler eliminare la variabile ${n}?`)) {
      deleteInitialSnippetVariable({
        variables: {
          id: k,
        },
      });
    }
  };

  useEffect(() => {
    if (dataDelete) {
      setMessage("Variabile eliminata correttamente!");
      setShowMessage(true);
    }
  }, [setShowMessage, setMessage, dataDelete]);

  return (
    <ContextInitialSnippetData.Provider
      value={[dataInitialSnippet, listVariableType]}
    >
      <Row>
        {loadingInitialSnippet && <Loader />}
        {errorInitialSnippet && (
          <Message variant="danger">{errorInitialSnippet?.message}</Message>
        )}
        <GoBackBtn />
        <Col>
          <SidePanel
            handleSidePanel={handleSidePanel}
            clicked={clicked}
            editVariable={editVariable}
          />
          <h1 className="text-center">Variabili attualmente inserite</h1>
        </Col>
        <Row className="pt-3">
          <Col lg={2}>
            <p>
              Evento:{" "}
              <span className="event-name">
                {dataInitialSnippet?.initialSnippet?.event?.name}
              </span>
            </p>
          </Col>
          <Col className="d-flex justify-content-end" lg={10}>
            <Button
              variant="secondary"
              className="mx-1 fw-bolder"
              onClick={() => {
                setListVariableType("template-variables");
                handleSidePanel("initial-snippet", "open");
              }}
            >
              <i className="fas fa-plus"></i>
              <small className="ms-1">TEMPLATE VARIABLE</small>
            </Button>
            <Button
              variant="secondary"
              className="mx-1 fw-bolder"
              onClick={() => {
                setListVariableType("document-variables");
                handleSidePanel("initial-snippet", "open");
              }}
            >
              <i className="fas fa-plus"></i>
              <small className="ms-1">DOCUMENT VARIABLE</small>
            </Button>
          </Col>
        </Row>
        <Row className="py-4">
          <Col>
            <Table responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dataInitialSnippet?.initialSnippet?.initialSnippetVariable?.edges.map(
                  (_) => (
                    <tr key={_.node.pk}>
                      <td className="var-name-color">{_.node.name}</td>
                      <td>
                        {_.node?.initialSnippetVariableValue?.edges.map(
                          (item, idx) => (
                            <pre className="text-wrap" key={item?.node.pk}>
                              {item?.node.name.length > 0 && (
                                <span>
                                  {idx + 1}
                                  {") "}
                                  {item?.node.name}
                                </span>
                              )}
                            </pre>
                          )
                        )}
                      </td>
                      <td>
                        {_.node?.initialSnippetVariableValue?.edges.map(
                          (item, idx) => (
                            <pre className="text-wrap" key={item?.node.pk}>
                              {item?.node.condition.length > 0 && (
                                <span>
                                  {idx + 1}
                                  {") "}
                                  {item?.node.condition}
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
                              handleSidePanel(
                                "edit-initial-snippet-variable",
                                "open"
                              );
                              setEditVariable(_.node);
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
      </Row>
    </ContextInitialSnippetData.Provider>
  );
};

export default EditDatalayer;
