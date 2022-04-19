import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import Loader from "../../../../components/Loader/index";
import Message from "../../../../components/Message/index";
import { useUpdateEventMutation } from "../../../../hooks/graphql/mutations/useUpdateEventMutation/indjex";
import { useApolloClient } from "@apollo/client";
import { useGetEventQuery } from "../../../../hooks/graphql/queries/useGetEventQuery/index";
import { getEventCategoriesQuery } from "../../../../hooks/graphql/queries/useGetEventCategoriesQuery/index";
import { useParams } from "react-router-dom";
import { GoBackBtn } from "../../../../components/Buttons/GoBackBtn";

const EditEvent = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [created, setCreated] = useState(false);
  const [categories, setCategories] = useState({});
  let { id: eventId, pk: eventPk } = useParams();

  const {
    loading: loadingEvent,
    error: errorEvent,
    data: dataEvent,
  } = useGetEventQuery({
    variables: {
      id_event: eventId,
    },
  });
  const [updateEvent, { error }] = useUpdateEventMutation();
  const client = useApolloClient();

  function getCatId(cat_obj) {
    return cat_obj.node.name === category;
  }

  const handleForm = (e) => {
    e.preventDefault();
    let category_obj = categories.edges.find(getCatId);
    updateEvent({
      variables: {
        data_event_update: {
          name,
          id: eventPk,
          category: category_obj.node.pk,
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

  useEffect(() => {
    if (dataEvent) {
      setName(dataEvent?.event?.name);
      setCategory(dataEvent?.event?.category?.name);
    }
    const { eventCategories } = client.readQuery({
      query: getEventCategoriesQuery,
    });
    if (eventCategories) {
      setCategories(eventCategories);
    }
  }, [dataEvent, client]);

  return (
    <Row>
      <GoBackBtn path={"/dashboard/event"} />
      <Row>
        <Col>
          <h1>
            Modifica evento:{" "}
            <span style={{ color: "red" }}>
              {dataEvent?.event?.name ?? `${dataEvent?.event?.name}`}
            </span>
          </h1>
        </Col>
      </Row>
      <Row>
        {loadingEvent ? (
          <Loader />
        ) : errorEvent ? (
          <Message variant="danger">{errorEvent?.message}</Message>
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
                    {/*  USARE UseRef ???? */}
                    {categories?.edges.map((cat) => (
                      <option key={cat.node.pk} value={cat.node.name}>
                        {cat.node.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
              {created && (
                <Alert variant="info">
                  {error ? `Error: ${error?.message}` : "Evento aggiornato!"}
                </Alert>
              )}
              <Row>
                <Col>
                  <Button type="submit" className="float-end">
                    CREA
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        )}
      </Row>
    </Row>
  );
};

export default EditEvent;
