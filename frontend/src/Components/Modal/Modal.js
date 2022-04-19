import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

export default function modal(props) {
  const { item, show, onHide } = props;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Dati <span className="text-info">{item.name}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ color: "greenyellow" }}>Valori</th>
              <th style={{ color: "greenyellow" }}>Casistica</th>
            </tr>
          </thead>
          <tbody>
            {item?.initialSnippetVariableValue
              ? item.initialSnippetVariableValue.edges.map((_) => (
                  <tr key={_?.node?.pk}>
                    <td>{_?.node?.name}</td>
                    <td>{_?.node?.condition}</td>
                  </tr>
                ))
              : item?.gaSnippetVariableValue
              ? item?.gaSnippetVariableValue.edges.map((_) => (
                  <tr key={_?.node?.pk}>
                    <td>{_?.node?.name}</td>
                    <td>{_?.node?.condition}</td>
                  </tr>
                ))
              : item?.customField &&
                item?.customField?.edges.map((_) => (
                  <tr key={_?.node?.pk}>
                    <td>{_?.node?.valueVariable?.name}</td>
                    <td>{_?.node?.valueVariable?.name}</td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
