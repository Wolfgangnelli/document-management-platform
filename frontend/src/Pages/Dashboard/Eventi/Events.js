import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Table, Button, Form, Alert, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useRouteMatch } from "react-router-dom";
import { useGetEventsQuery } from "../../../hooks/graphql/queries/useGetEventsQuery/index";
import { useGetEventCategoriesQuery } from "../../../hooks/graphql/queries/useGetEventCategoriesQuery/index";
import { useCreateEventMutation } from "../../../hooks/graphql/mutations/useCreateEventMutation/index";
import { useDeleteEventMutation } from "../../../hooks/graphql/mutations/useDeleteEventMutation/index";
import Loader from "../../../components/Loader/index";
import Message from "../../../components/Message/index";

const Events = () => {
  let match = useRouteMatch();

  const [name, setName] = useState("");

  const [category, setCategory] = useState("");

  const [created, setCreated] = useState(false);

  const [show, setShow] = useState(false);

  const [dataEvents, setDataEvents] = useState([]);

  const { loading, error, data } = useGetEventsQuery();

  const {
    loading: loadingCategories,
    error: errorCategories,
    data: dataCategories,
  } = useGetEventCategoriesQuery();

  const [createEvent, { error: errorEvent }] = useCreateEventMutation();

  const [deleteEvent, { error: errorDelete, data: dataDelete }] =
    useDeleteEventMutation();

  const deleteHandler = (id, event_name) => {
    if (
      window.confirm(
        `Sei sicuro di voler eliminare la variabile ${event_name}?`
      )
    ) {
      deleteEvent({
        variables: {
          delete_id: id,
        },
      });
      setShow(true);
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    createEvent({
      variables: {
        event_data: {
          name,
          category: +category,
        },
      },
    });
    setName("");
    setCategory("");
    setCreated(true);
    setTimeout(() => {
      setCreated(false);
    }, 3000);
  };

  const handleSearch = (term = "") => {
    let termLowerCase = term.toLowerCase();

    if (data) {
      setDataEvents(() => {
        return data?.events?.edges.filter((item) => {
          if (termLowerCase === "") {
            return item;
          } else {
            return item.node.name.toLowerCase().includes(termLowerCase);
          }
        });
      });
    }
  };

  useEffect(() => {
    data && handleSearch();
  }, [data]);

  return (
    <Row>
      {dataDelete?.deleteEvent?.ok || errorDelete ? (
        <Modal show={show} onHide={setShow} size="sm">
          <Modal.Header>Message</Modal.Header>
          <Modal.Body>
            {errorDelete
              ? `${errorDelete?.message}`
              : "Evento eliminato correttamente!"}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
      <Row className="mb-5">
        <h3>CREA EVENTO</h3>
        {loadingCategories ? (
          <Loader />
        ) : errorCategories ? (
          <Message variant="danger">{errorCategories?.message}</Message>
        ) : (
          <Col>
            <Form onSubmit={handleForm}>
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome evento</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Inserisci nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <Form.Text className="text-muted">
                      Es. view_item_list
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Label>Scegli categoria</Form.Label>
                  <Form.Select
                    aria-label="category select"
                    required
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    <option></option>
                    {dataCategories?.eventCategories.edges.map((cat) => (
                      <option key={cat.node.pk} value={cat.node.pk}>
                        {cat.node.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
              {created && (
                <Alert variant="info">
                  {errorEvent
                    ? `Error: ${errorEvent?.message}`
                    : "Evento creato!"}
                </Alert>
              )}
              <Button type="submit" className="float-end">
                CREA
              </Button>
            </Form>
          </Col>
        )}
      </Row>
      <Row>
        <Col md={5}>
          <h1>LISTA EVENTI</h1>
        </Col>
        <Col md={2}></Col>
        <Col md={5}>
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
        <Message variant="danger">{error?.message}</Message>
      ) : (
        <Row>
          <Col>
            <Table striped responsive bordered hover className="table-sm">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dataEvents.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      {item.node.modified
                        ? item.node.modified.substring(0, 10)
                        : item.node.created.substring(0, 10)}
                    </td>
                    <td>{item.node.name}</td>
                    <td>{item.node.category.name}</td>
                    <td className="d-flex justify-content-evenly">
                      <LinkContainer
                        to={`${match.url}/${item.node.id}/${item.node.pk}/edit`}
                      >
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() =>
                          deleteHandler(item.node.pk, item.node.name)
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

export default Events;
