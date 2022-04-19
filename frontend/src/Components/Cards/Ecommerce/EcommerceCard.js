import React from "react";
import { Card, Col, Row, Button, Image } from "react-bootstrap";
import EcommerceSnippetGA4 from "../../Snippet/EcommerceSnippet/EcommerceSnippetGA4";

const EcommerceCard = ({ jsonData }) => {
  const dataObj = jsonData.eCommerce;
  return (
    <div className="pt-1">
      {dataObj.map((data, idx) => (
        <section
          className="my-4"
          id={`${data.title.replaceAll(" ", "-").toLowerCase()}`}
          key={idx}
        >
          <Card>
            <Card.Header as="h2">
              {data.title}
              <Button variant="light" className="fw-bolder float-end">
                Edit
              </Button>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col lg={6}>
                  <Card.Text>
                    <span
                      className="fw-bolder"
                      style={{ color: "greenyellow" }}
                    >
                      AZIONE:{" "}
                    </span>{" "}
                    {data.action}
                  </Card.Text>
                  {data.note.lenght > 0 && (
                    <Card.Text
                      className="fw-bolder"
                      style={{ color: "greenyellow" }}
                    >
                      NB: {data.note}
                    </Card.Text>
                  )}
                  <div>
                    <EcommerceSnippetGA4 data={data.parameter} />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="text-center">
                    <a href={data.link_url} style={{ color: "aquamarine" }}>
                      {data.link_url}
                    </a>
                  </div>
                  <Image src={data.image} fluid rounded />
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="fw-bolder">
              Priority: <span className="text-info">{data.priority}</span>
            </Card.Footer>
          </Card>
        </section>
      ))}
    </div>
  );
};

export default EcommerceCard;
