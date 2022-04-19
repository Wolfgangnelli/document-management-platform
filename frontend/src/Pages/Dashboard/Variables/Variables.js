import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button, Modal, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useRouteMatch } from "react-router-dom";
import { useListVariablesQuery } from "../../../hooks/graphql/queries/useGetVariablesQuery";
import { useDeleteVariableMutation } from "../../../hooks/graphql/mutations/useDeleteVariableMutation/index";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import "./_variables.scss";

const Variables = () => {
  let match = useRouteMatch();

  // const [variables, setVariables] = useState([]);

  const [show, setShow] = useState(false);

  const [filteredData, setFilteredData] = useState({
    variables: {
      edges: [],
      pageInfo: {},
      totalCount: null,
    },
  });

  const { error, loading, data } = useListVariablesQuery();

  const [deleteVariable, { error: errorDelete, data: dataDelete }] =
    useDeleteVariableMutation();

  const handleSearch = (term = "") => {
    let termLowerCase = term.toLowerCase();

    if (data) {
      setFilteredData((prev) => {
        let {
          variables: { edges, ...rest },
        } = prev;

        edges = data?.variables?.edges.filter((item) => {
          if (termLowerCase === "") {
            return item;
          } else {
            return item.node.name.toLowerCase().includes(termLowerCase);
          }
        });
        return { variables: { edges, ...rest } };
      });
    }
  };

  const deleteHandler = (var_name, var_id) => {
    if (
      window.confirm(`Sei sicuro di voler eliminare la variabile ${var_name}?`)
    ) {
      deleteVariable({
        variables: {
          id_delete: var_id,
        },
      });
      setShow(true);
    }
  };

  useEffect(() => {
    if (data) {
      handleSearch();
    }
  }, [data]);

  return (
    <Row>
      {dataDelete?.deleteVariable?.ok || errorDelete ? (
        <Modal show={show} onHide={setShow} size="sm">
          <Modal.Header>Message</Modal.Header>
          <Modal.Body>
            {errorDelete
              ? `${errorDelete?.message}`
              : "Variabile eliminata correttamente!"}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
      <Row>
        <Col>
          <h1>Lista variabili template</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <LinkContainer to={`${match.url}/new-variable`} className="mb-2">
            <Button variant="secondary" className="fw-bold">
              <i className="fa-solid fa-plus"></i> NEW VARIABLE
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={1}>
          <p>Cerca: </p>
        </Col>
        <Col md={4}>
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
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col>
            <Table striped responsive bordered hover className="table-sm">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Reference</th>
                  <th>Scope</th>
                  <th>Priority</th>
                  <th>Value</th>
                  <th>Casistica</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.variables?.edges.map((item, idx) => (
                  <tr key={idx}>
                    <td style={{ fontSize: "x-small" }}>
                      {item.node.modified
                        ? item.node.modified.substring(0, 10)
                        : item.node.created.substring(0, 10)}
                    </td>
                    <td>
                      <span className="span-green">{item.node.name}</span>
                    </td>
                    <td>{item.node.type.reference}</td>
                    <td>{item.node.type.scope}</td>
                    <td>{item.node.type.priority}</td>
                    <td>
                      {item.node.variableValue.edges.map((el, idx) => (
                        <pre className="text-wrap" key={idx}>
                          {el.node.name.length > 0 && (
                            <span>
                              {idx + 1}
                              {") "}
                              {el.node.name}
                            </span>
                          )}
                        </pre>
                      ))}
                    </td>
                    <td>
                      {item.node.variableValue.edges.map((el, idx) => (
                        <pre className="text-wrap" key={idx}>
                          {el.node.condition.length > 0 && (
                            <span>
                              {idx + 1}
                              {") "}
                              {el.node.condition}
                            </span>
                          )}
                        </pre>
                      ))}
                    </td>
                    <td className="d-flex flex-column">
                      <LinkContainer
                        to={`${match.url}/${item.node.id}/edit`}
                        className="mb-1"
                      >
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() =>
                          deleteHandler(item.node.name, item.node.pk)
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
      )}
    </Row>
  );
};

export default Variables;
