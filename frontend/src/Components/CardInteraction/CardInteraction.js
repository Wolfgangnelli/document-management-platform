import React, { useEffect } from "react";
import { Card, Button, Row, Col, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useRouteMatch } from "react-router-dom";
import DashboardSnippet from "../Snippet/DashboardSnippet/index";
import EcommerceSnippetGA4 from "../../components/Snippet/EcommerceSnippet/EcommerceSnippetGA4";
import { useDeleteSectionTemplateMutation } from "../../hooks/graphql/mutations/useDeleteSectionTemplateMutation/index";
import "./_cardInteraction.scss";

const CardInteraction = ({ data }) => {
  let match = useRouteMatch();
  const [
    deleteSectionTemplateMutation,
    { error: errorDelete, data: dataDelete },
  ] = useDeleteSectionTemplateMutation();

  const objSnippetEcoGA4 = {
    node: {
      ...data?.ga4EcoSnippetTemplate,
    },
  };

  const handleDelete = () => {
    if (
      window.confirm(`Sei sicuro di voler eliminare la sezione ${data?.title}?`)
    ) {
      deleteSectionTemplateMutation({
        variables: {
          delete_id: data?.pk,
        },
      });
    }
  };

  // MEMO: IMPOSTARE IL MESSAGGIO DI AVVENUTA CANCELLAZIONE O DI ERRORE

  return (
    <div>
      {/* <div className="circle"></div> */}
      {/* {dataInteractions.interaction.map((data) => ( */}
      <section
        key={data?.id}
        className="my-4"
        id={`${data?.title.replaceAll(" ", "-").toLowerCase()}`}
      >
        <Card>
          <Card.Header as="h2" className="d-flex justify-content-between">
            {data?.title}
            <div>
              <Button
                variant="danger"
                className="ms-1 fw-bolder float-end"
                onClick={handleDelete}
              >
                Delete
              </Button>
              <LinkContainer
                to={`${match.url}/${data?.id}/${data?.pk}/edit`}
                className="mb-1"
              >
                <Button
                  variant="light"
                  className="fw-bolder float-end text-black-50"
                >
                  Edit
                </Button>
              </LinkContainer>
            </div>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Card.Text>
                  <span className="fw-bolder" style={{ color: "greenyellow" }}>
                    AZIONE:{" "}
                  </span>{" "}
                  {data.action}
                </Card.Text>
                {data?.note.lenght > 0 && (
                  <Card.Text
                    className="fw-bolder"
                    style={{ color: "greenyellow" }}
                  >
                    NB: {data?.note}
                  </Card.Text>
                )}
                <Row>
                  <Col>
                    {data?.gaSnippetTemplate && (
                      <DashboardSnippet
                        data={data?.gaSnippetTemplate}
                        snippet={false}
                      />
                    )}
                    {data?.ga4EcoSnippetTemplate && (
                      <EcommerceSnippetGA4 data={objSnippetEcoGA4} />
                    )}
                    {/* IMPLEMENTARE ANCHE PER ECOMMERCE UA (non GA4) */}
                  </Col>
                </Row>
              </Col>
              <Col className="text-center">
                <div className="text-center">
                  <a href={data.link_url} style={{ color: "aquamarine" }}>
                    {data.link_url}
                  </a>
                </div>
                <Image
                  src={data.image}
                  fluid
                  rounded
                  style={{ height: "300px", width: "300px" }}
                />
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="fw-bolder">
            Priority: <span className="text-info">{data.priority}</span>
          </Card.Footer>
        </Card>
      </section>
      {/*  ))}  */}
    </div>
  );
};

export default CardInteraction;
