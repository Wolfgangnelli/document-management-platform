import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useRouteMatch } from "react-router-dom";
import CardInteraction from "../../../components/CardInteraction/CardInteraction";
import Loader from "../../../components/Loader/index";
import Message from "../../../components/Message/index";
import { useGetSectionsTemplateQuery } from "../../../hooks/graphql/queries/useGetSectionsTemplateQuery/index";

const Interazioni = () => {
  let match = useRouteMatch();

  const [filteredData, setFilteredData] = useState({
    sectionsTemplate: {
      edges: [],
    },
  });

  const { loading, error, data } = useGetSectionsTemplateQuery();

  const handleSearch = (term = "") => {
    let termLowerCase = term.toLowerCase();
    console.log(termLowerCase);

    if (data) {
      setFilteredData((prev) => {
        let {
          sectionsTemplate: { edges, ...rest },
        } = prev;

        edges = data?.sectionsTemplate?.edges.filter((item) => {
          if (termLowerCase === "") {
            return item;
          } else {
            return item.node.title.toLowerCase().includes(termLowerCase);
          }
        });
        return { sectionsTemplate: { edges, ...rest } };
      });
    }
  };

  useEffect(() => {
    data && handleSearch();
  }, [data]);

  return (
    <Row>
      <Col>
        <h1 className="text-center">Lista interazioni template</h1>
      </Col>
      <Row>
        {loading && <Loader />}
        {error && <Message variant="danger">{error?.message}</Message>}
      </Row>
      <Row className="mt-2">
        <Row>
          <Col className="d-flex justify-content-end">
            <LinkContainer to={`${match.url}/crea-interazione`}>
              <Button
                variant="secondary"
                className="fw-bold btn-outline-secondary mx-1"
              >
                CREATE INTERACTION
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        <Col md={4}>
          <div className="has-search">
            <i className="fas fa-search form-control-feedback"></i>
            <Form.Control
              type="text"
              placeholder="Ricerca"
              size="sm"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </Col>
      </Row>
      {filteredData?.sectionsTemplate?.edges.map((section) => (
        <Row key={section?.node?.id}>
          <Col>
            <CardInteraction data={section.node} />
          </Col>
        </Row>
      ))}
    </Row>
  );
};

export default Interazioni;
