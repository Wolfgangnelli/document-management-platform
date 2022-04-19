import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import logo from "../../assets/logo_domp.png";
import "./_footer.scss";

const Footer = () => {
  return (
    <footer>
      <Container fluid>
        <Row className="py-3">
          <Row>
            <Col className="d-flex justify-content-center">
              <Image src={logo} style={{ maxHeight: "64px" }} />
            </Col>
          </Row>
          <Row className="d-flex">
            <Col className="text-center">
              Copyright &copy; Document Management Platform (DOMP)
              <Row>
                <Col>
                  powered by{" "}
                  <b>
                    <i className="webranking-color">Webranking</i>
                  </b>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
