import React from "react";
import "./_home.scss";
import { Image, Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <div>
      <h1 className="text-center">DOCUMENT MANAGEMENT PLATFORM !!!</h1>
      <Row>
        <Col lg={12} className="d-flex justify-content-center">
          <Image src="https://picsum.photos/1120/400" fluid rounded />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
