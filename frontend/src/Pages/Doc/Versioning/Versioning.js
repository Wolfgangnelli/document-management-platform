import React, { useRef } from "react";
import VersioningData from "../../../json/VersioningData.json";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useRouteMatch } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const Versioning = () => {
  let match = useRouteMatch();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const deleteHandler = (versionId, versionNum) => {
    if (
      window.confirm(`Are you sure you want to delete version ${versionNum}? `)
    ) {
      console.log("DELETED");
    }
  };

  return (
    <Row>
      <Row>
        <Col>
          <Button variant="success" onClick={handlePrint}>
            Print pdf
          </Button>
        </Col>
      </Row>
      <Col ref={componentRef}>
        <h1>Versioning</h1>
        <Table striped responsive bordered hover className="table-sm">
          <thead>
            <tr>
              <th>Data</th>
              <th>Autore</th>
              <th>Revisore</th>
              <th>Versione</th>
              <th>Note</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {VersioningData.Armani.Doc.Versioning.map((item) => (
              <tr key={item.id}>
                <td>{item.data}</td>
                <td>{item.autore}</td>
                <td>{item.revisore}</td>
                <td>{item.versione}</td>
                <td>{item.note}</td>
                <td className="d-flex justify-content-evenly">
                  <LinkContainer to={`${match.url}/${item.id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(item.id, item.versione)}
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
  );
};

export default Versioning;
