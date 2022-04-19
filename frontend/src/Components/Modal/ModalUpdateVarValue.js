import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export function ModalUpdateVarValue(props) {
  const { item, show, onHide, variabilePk, update, variableType = "" } = props;

  const [valore, setValore] = useState("");

  const [casistica, setCasistica] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    if (variableType === "initialSnippet") {
      update({
        variables: {
          dataUpdate: {
            id: item?.id,
            name: valore,
            condition: casistica,
            initialSnippetVariable: variabilePk,
            oldIdx: item?.oldIdx,
          },
        },
      });
    } else {
      update({
        variables: {
          dataVariableValue: {
            name: valore,
            condition: casistica,
            id: item?.pk,
            variable: variabilePk,
          },
        },
      });
    }
    onHide(false);
  };

  useEffect(() => {
    if (item) {
      setValore(item?.name);
      setCasistica(item?.condition);
    }
  }, [item]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="update-variable-value"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="update-variable-value">Modifica valore</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleForm}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="valore">
            <Form.Label>Valore</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci valore"
              value={valore ?? ""}
              onChange={(e) => setValore(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="casistica">
            <Form.Label>Casistica</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci casistica"
              value={casistica ?? ""}
              onChange={(e) => setCasistica(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">SALVA</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
