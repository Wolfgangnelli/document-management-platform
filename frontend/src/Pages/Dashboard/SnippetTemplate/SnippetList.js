import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import DataPushSnippet from "../../../components/Snippet/InteractionPush/dataPushSnippet";
import { useRouteMatch } from "react-router-dom";
import "./_snippetList.scss";
import { LinkContainer } from "react-router-bootstrap";
import { useGetGaSnippetsTemplate } from "../../../hooks/graphql/queries/useGetGASnippetsTemplateQuery/index";
import { useGetGA4EcoSnippetsTemplateQuery } from "../../../hooks/graphql/queries/useGA4EcoSnippetsTemplateQuery/index";
import Loader from "../../../components/Loader/index";
import Message from "../../../components/Message/index";
import EcommerceSnippetGA4 from "../../../components/Snippet/EcommerceSnippet/EcommerceSnippetGA4";

const SnippetList = () => {
  let match = useRouteMatch();

  const { loading, error, data } = useGetGaSnippetsTemplate();

  const [filterSelected, setFilterSelected] = useState("all");

  const [dataSnippetTemplate, setDataSnippetTemplate] = useState({
    gaSnippetsTemplate: {
      edges: [],
    },
  });

  const [dataSnippetGA4EcoSnippetTemp, setDataSnippetGA4EcoSnippetTemp] =
    useState({
      ga4EcoSnippetsTemplate: {
        edges: [],
      },
    });

  const {
    loading: loadingGA4EcoSnippetTemp,
    error: errorGA4EcoSnippetTemp,
    data: dataGA4EcoSnippetTemp,
  } = useGetGA4EcoSnippetsTemplateQuery();

  const [show, setShow] = useState(false);

  const [resultMessage, setResultMessage] = useState(null);

  const handleSearch = (term = "") => {
    let termLowerCase = term.toLowerCase();

    if (data && (filterSelected === "all" || filterSelected === "GAsnippet")) {
      setDataSnippetTemplate((prev) => {
        let { edges, ...rest } = prev.gaSnippetsTemplate;
        edges = data?.gaSnippetsTemplate?.edges.filter((item) => {
          if (termLowerCase === "") {
            return item;
          } else {
            return item.node.snippetName.toLowerCase().includes(termLowerCase);
          }
        });
        return { gaSnippetsTemplate: { edges, ...rest } };
      });
    }
    if (
      dataGA4EcoSnippetTemp &&
      (filterSelected === "all" || filterSelected === "e-commerce")
    ) {
      setDataSnippetGA4EcoSnippetTemp((prev) => {
        let { edges, ...rest } = prev.ga4EcoSnippetsTemplate;
        edges = dataGA4EcoSnippetTemp.ga4EcoSnippetsTemplate.edges.filter(
          (item) => {
            if (termLowerCase === "") {
              return item;
            } else {
              return item.node.snippetName
                .toLowerCase()
                .includes(termLowerCase);
            }
          }
        );
        return { ga4EcoSnippetsTemplate: { edges, ...rest } };
      });
    }
  };

  useEffect(() => {
    data && dataGA4EcoSnippetTemp && handleSearch();
  }, [data, dataGA4EcoSnippetTemp]);

  return (
    <Row>
      {resultMessage ? (
        <Modal show={show} onHide={setShow} size="sm">
          <Modal.Header>Message</Modal.Header>
          <Modal.Body>
            {resultMessage?.message
              ? `${resultMessage?.message}`
              : `Snippet ${resultMessage?.deleteGaSnippetTemplate?.name} eliminato correttamente!`}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
      <Col>
        <h1 className="text-center">Lista Snippet Template</h1>
      </Col>
      <Row className="py-3 d-flex">
        <Col className="d-flex mt-1 flex-wrap justify-content-end">
          <LinkContainer to={`${match.url}/crea-snippet-ecommerce`}>
            <Button className="ms-1 mt-1" variant="secondary">
              <i className="fa-solid fa-plus"></i> New GA4 e-commerce snippet
            </Button>
          </LinkContainer>
          <LinkContainer to={`${match.url}/crea-snippet-interazione`}>
            <Button className="ms-1 mt-1" variant="secondary">
              <i className="fa-solid fa-plus"></i> New GA snippet
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <Row>
        <Col lg={4}>
          <Form.Label>Visualizza solo snippet di: </Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={filterSelected}
            onChange={(e) => setFilterSelected(e.target.value)}
          >
            <option value="all">All</option>
            <option value="GAsnippet">GAsnippet</option>
            <option value="e-commerce">E-Commerce</option>
          </Form.Select>
        </Col>
        <Col lg={4}></Col>
        <Col lg={4} className="input-search">
          <label htmlFor="has-search" className="mb-1">
            Nome snippet:
          </label>
          <div className="has-search" id="has-search">
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
      {loading && <Loader />}
      {error && <Message variant="danger">{error?.message}</Message>}
      {dataSnippetTemplate &&
        (filterSelected === "all" || filterSelected === "GAsnippet") && (
          <Row className="mt-3">
            {dataSnippetTemplate.gaSnippetsTemplate.edges.map((item, idx) => (
              <Col lg={4} key={idx}>
                <DataPushSnippet
                  data={item}
                  snippet={false}
                  setShow={setShow}
                  setResultMessage={setResultMessage}
                />
              </Col>
            ))}
          </Row>
        )}
      {loadingGA4EcoSnippetTemp && <Loader />}
      {errorGA4EcoSnippetTemp && (
        <Message variant="danger">{errorGA4EcoSnippetTemp?.message}</Message>
      )}
      {dataSnippetGA4EcoSnippetTemp &&
        (filterSelected === "all" || filterSelected === "e-commerce") && (
          <Row className="mt-3">
            {dataSnippetGA4EcoSnippetTemp?.ga4EcoSnippetsTemplate?.edges.map(
              (item, idx) => (
                <Col lg={6} key={idx}>
                  <EcommerceSnippetGA4 data={item} />
                </Col>
              )
            )}
          </Row>
        )}
    </Row>
  );
};

export default SnippetList;
