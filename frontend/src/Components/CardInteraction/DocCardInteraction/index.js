import React, { useContext, useEffect } from "react";
import { Button, Row, Col, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useRouteMatch } from "react-router-dom";
import DataPushSnippet from "../../Snippet/InteractionPush/dataPushSnippet";
import EcommerceSnippetGA4 from "../../../components/Snippet/EcommerceSnippet/EcommerceSnippetGA4";
import { useDeleteSectionMutation } from "../../../hooks/graphql/mutations/useDeleteSectionMutation/index";
import { ContexAlert } from "../../../App/App";
import "../_cardInteraction.scss";

const DocCardInteraction = ({ data, idx }) => {
  let match = useRouteMatch();

  const [setShowMessage, setMessage] = useContext(ContexAlert);

  const [deleteSection, { error: errorDelete, data: dataDelete }] =
    useDeleteSectionMutation();

  const objSnippetEcoGA4 = {
    node: {
      ...data?.ga4EcoSnippetTemplate,
    },
  };

  const handleDelete = () => {
    if (
      window.confirm(`Sei sicuro di voler eliminare la sezione ${data?.title}?`)
    ) {
      deleteSection({
        variables: {
          deleteId: data?.pk,
        },
      });
    }
  };

  const handleExternalLink = () => {
    window.open(`https://${data?.image?.pageLink}`, "_black");
  };

  useEffect(() => {
    if (dataDelete) {
      setMessage("Sezione eliminata!");
      setShowMessage(true);
    } else if (errorDelete) {
      setMessage(errorDelete?.message);
      setShowMessage(true);
    }
  }, [dataDelete, errorDelete]);

  // MEMO: IMPOSTARE IL MESSAGGIO DI AVVENUTA CANCELLAZIONE O DI ERRORE

  return (
    <section
      key={data?.id}
      className="my-5"
      id={`${data?.title.replaceAll(" ", "-").toLowerCase()}`}
    >
      <Row>
        <Row>
          <Col md={8}>
            <h2 as="h2" className="text-center pt-0">
              <span className="fs-1 fst-italic float-start">{idx}</span>
              {data?.title}
            </h2>
          </Col>
          <Col
            md={4}
            className="d-flex justify-content-center align-items-center"
          >
            <LinkContainer
              to={`${match.url}/section/${data?.id}/${data?.pk}/edit`}
            >
              <Button
                variant="light"
                className="fw-bolder float-end text-black-50"
              >
                Edit
              </Button>
            </LinkContainer>
            <Button
              variant="danger"
              className="ms-1 fw-bolder float-end"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="py-2">
              <span className="fw-bolder" style={{ color: "greenyellow" }}>
                AZIONE:{" "}
              </span>{" "}
              {data?.action}
            </div>
            {data?.note.lenght > 0 && (
              <div className="fw-bolder" style={{ color: "greenyellow" }}>
                NB: {data?.note}
              </div>
            )}
            <Row>
              <Col>
                {data?.gaSnippet &&
                  data?.gaSnippet.edges.map((snippet) => (
                    <DataPushSnippet
                      data={snippet}
                      snippet={false}
                      key={snippet.node.pk}
                    />
                  ))}
                {/*      {data?.ga4EcoSnippetTemplate && (
                  <EcommerceSnippetGA4 data={objSnippetEcoGA4} />
                )} */}
                {/* IMPLEMENTARE ANCHE PER ECOMMERCE UA (non GA4) */}
              </Col>
            </Row>
          </Col>
          <Col className="d-flex flex-column justify-content-center align-items-center">
            {data?.image?.pageLink && (
              <div className="text-center">
                <span
                  style={{ color: "aquamarine", cursor: "pointer" }}
                  onClick={handleExternalLink}
                  className="text-decoration-underline"
                >
                  {data?.image?.pageLink}
                </span>
              </div>
            )}
            <Image
              src={data?.image?.url}
              alt={data?.image?.name}
              fluid
              rounded
              style={{ height: "auto", width: "100%" }}
            />
          </Col>
        </Row>
        <Row>
          <Col className="py-3 mx-auto border-gradient-priority" md={11}>
            <div className="fw-bolder">
              Priority: <span className="text-info">{data?.priority}</span>
            </div>
          </Col>
        </Row>
      </Row>
    </section>
  );
};

export default DocCardInteraction;
