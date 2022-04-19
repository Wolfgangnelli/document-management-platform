import React, { useState, useContext } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import DatalayerSnippet from "../../../../components/Snippet/DatalayerSnippet";
import { Button, Row, Col } from "react-bootstrap";
import { FullScreenModal } from "../../../../components/Modal/FullScreen/FullScreenModal";
import "./_datalayer.scss";
import Loader from "../../../../components/Loader/index";
import Message from "../../../../components/Message/index";
import { useGetInitialSnippetQuery } from "../../../../hooks/graphql/queries/useGetInitialSnippetQuery/index";
import { DocumentContext } from "../../Doc";
import { LinkContainer } from "react-router-bootstrap";

const DataLayer = () => {
  let { clienteId } = useParams();

  const [show, setShow] = useState(false);

  const data = useContext(DocumentContext);

  let match = useRouteMatch();

  const {
    loading: loadingInitialSnippet,
    error: errorInitialSnippet,
    data: dataInitialSnippet,
  } = useGetInitialSnippetQuery({
    variables: {
      id: data?.datalayer?.initialSnippet?.id,
    },
    skip: !data?.datalayer?.initialSnippet?.id,
  });

  return (
    <Row>
      {loadingInitialSnippet && <Loader />}
      {errorInitialSnippet && (
        <Message variant="danger">{errorInitialSnippet?.message}</Message>
      )}
      <article>
        <header>
          <h1 className="text-center">Inclusione dataLayer</h1>
        </header>
        {/* <AnchorLinks anchor_links={anchor_links} />
        <Hr /> */}
        <FullScreenModal show={show} onHide={() => setShow(false)} />
        <section>
          <div>
            <p>Il codice di inclusione del DataLayer deve:</p>
            <div>
              <ul className="list-gtm-std">
                <li>
                  essere inserito sempre come primo codice{" "}
                  <span className="fw-bolder">
                    dopo l'apertura del Tag{" "}
                    <code className="code-tag">
                      <span>{"<"}</span>
                      body
                      <span>{">"}</span>
                    </code>
                  </span>
                </li>
                <li>essere presente in ogni pagina del sito</li>
                <li>
                  essere inserito <span className="fw-bolder">prima</span> del{" "}
                  <Link
                    to={`/docs/${clienteId}/datalayer-gtm/codice-standard-gtm`}
                  >
                    <span className="span-green">codice standard GTM</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Row>
            <Col md={10}>
              <DatalayerSnippet dataInitialSnippet={dataInitialSnippet} />
              <div className="tab tip mx-auto">
                <span className="tip-title">
                  <i className="fas fa-lightbulb"></i> Tip
                </span>
                <p className="text-black">
                  Per vedere la spiegazione delle variabili fai click su di esse
                  {"  "}
                  <i className="fas fa-hand-pointer"></i>
                </p>
              </div>
            </Col>
            <Col md={2}>
              <LinkContainer to={`${match.url}/edit`}>
                <Button variant="light" className="fw-bold">
                  Edit
                </Button>
              </LinkContainer>
            </Col>
          </Row>
        </section>
        {/*         <Hr />
        <section>
          <h3 id="dati-di-navigazione">Dati di Navigazione</h3>
          <div>
            <p>
              Qui sono spiegate più nel dettaglio (anche con il supporto di
              immagini), le variabili di più difficile comprensione relative ai
              dati di navigazione.
            </p>
          </div>
          <div className="d-flex justify-content-end py-2">
            <Button variant="primary" className="fw-bolder">
              CREATE SECTION
            </Button>
          </div>
          <Row className="my-3">
            <Col lg={6}>
              <div className="d-flex flex-column justify-content-center h-100">
                <p>
                  <span className="fw-bolder value">first_level_category:</span>{" "}
                  le_nostre_attività
                </p>
                <p>
                  <span className="fw-bolder value">
                    second_level_category:
                  </span>{" "}
                  incentivi
                </p>
              </div>
            </Col>
            <Col lg={6}>
              <Image src="https://picsum.photos/600/400" fluid rounded />
            </Col>
          </Row>
        </section>
        <Hr />
        <section>
          <h3 id="dati-dell'utente">Dati dell'utente</h3>
          <div>
            <p>
              Qui sono spiegate più nel dettaglio (anche con il supporto di
              immagini), le variabili di più difficile comprensione relative
              all'utente.
            </p>
          </div>
          <div className="d-flex justify-content-end py-2">
            <Button variant="primary" className="fw-bolder">
              CREATE SECTION
            </Button>
          </div>
          <Row className="my-3">
            <Col lg={6}>
              <div className="d-flex flex-column justify-content-center h-100">
                <p>
                  <span className="fw-bolder value">first_level_category:</span>{" "}
                  le_nostre_attività
                </p>
                <p>
                  <span className="fw-bolder value">
                    second_level_category:
                  </span>{" "}
                  incentivi
                </p>
              </div>
            </Col>
            <Col lg={6}>
              <Image src="https://picsum.photos/600/400" fluid rounded />
            </Col>
          </Row>
        </section> */}
      </article>
    </Row>
  );
};

export default DataLayer;
