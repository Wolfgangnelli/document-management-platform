import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import ClientCard from "../components/ClientCard/ClientCard";
import ClientsData from "../json/NewClientsData.json";
import { Row, Col } from "react-bootstrap";
import Loader from "../components/Loader/index";
import Message from "../components/Message/index";
import { useGetCategoriesQuery } from "../hooks/graphql/queries/useGetCategoriesQuery/index";

const Docs = () => {
  let match = useRouteMatch();
  const { loading, error, data } = useGetCategoriesQuery();

  return (
    <Row>
      <h1 className="text-center" style={{ fontSize: "3rem" }}>
        DOCUMENTI OPERATIVI
      </h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error?.message}</Message>}
      {data?.categories?.edges.map((cat) => (
        <Row key={cat.node.id} className="pt-4 d-flex justify-content-center">
          <Col lg={11}>
            <h2 className="text-center border rounded bg-primary text-white my-1 p-1">
              {cat.node.name.toUpperCase()}
            </h2>
            <div className="pt-2">
              <ul className="list-unstyled d-flex flex-wrap justify-content-center">
                {cat?.node?.customer?.edges.map((item) => {
                  return (
                    <li key={item.node.id}>
                      <ul className="list-unstyled d-flex flex-wrap justify-content-center">
                        {item?.node?.document?.edges.map((doc) => (
                          <li key={doc.node.id} className="pb-2 px-2">
                            <Link
                              to={`${match.url}/${item?.node?.name
                                .toLowerCase()
                                .replaceAll(" ", "-")}/${doc?.node?.title
                                .toLowerCase()
                                .replaceAll(" ", "-")}/${doc?.node?.id}/${
                                doc?.node?.pk
                              }`}
                              className="text-decoration-none"
                            >
                              <ClientCard client={item} doc={doc?.node} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Col>
        </Row>
      ))}
    </Row>
  );
};

export default Docs;
