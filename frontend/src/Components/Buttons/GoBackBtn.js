import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export const GoBackBtn = () => {
  let history = useHistory();
  return (
    <Row>
      <Col>
        <Button
          className="btn-goBack-bg"
          size="sm"
          onClick={() => history.goBack()}
        >
          <i className="fas fa-arrow-left"></i>
          <span className="ms-1">Go Back</span>
        </Button>
      </Col>
    </Row>
  );
};
