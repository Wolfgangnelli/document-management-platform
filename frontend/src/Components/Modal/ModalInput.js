import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { DocumentContext } from "../../Pages/Doc/Doc";

export function ModalInput(props) {
  const [name, setName] = useState("");

  const [id, setId] = useState("");

  const data = useContext(DocumentContext);

  const handleForm = (e) => {
    e.preventDefault();

    props.handleformodal(name, id);
    setName("");
    setId("");
    props.onHide();
  };

  useEffect(() => {
    if (data?.datalayer) {
      setName(data?.datalayer?.name);
      setId(data?.datalayer?.container?.name);
    }
  }, [data?.datalayer]);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-codiceStd"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-codiceStd">
          Codice standard
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleForm}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome datalayer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Form.Text className="text-muted">Es. dataLayer</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Container ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter container ID"
              onChange={(e) => setId(e.target.value)}
              value={id}
            />
            <Form.Text className="text-muted">Es. GTM-XXXXXXX</Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">CREA</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
