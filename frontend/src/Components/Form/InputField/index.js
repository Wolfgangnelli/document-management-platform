import React from "react";
import { Col, Form, Button } from "react-bootstrap";

export const InputField = ({
  fieldName,
  fieldValue,
  setField,
  labelName,
  handleModal,
}) => {
  return (
    <Col lg={5}>
      <Form.Group className="mb-3" controlId={fieldName}>
        <Form.Label>{labelName}</Form.Label>
        <div className="d-flex">
          <Form.Control
            type="text"
            value={fieldValue}
            onChange={(e) => setField(e.target.value)}
          />
          <Button title="variables" onClick={() => handleModal({ fieldName })}>
            <i className="fas fa-code"></i>
          </Button>
        </div>
        <Form.Text className="text-muted">
          Scrivi o scegli una variabile
        </Form.Text>
      </Form.Group>
    </Col>
  );
};
