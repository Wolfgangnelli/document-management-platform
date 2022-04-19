import React, { useState, useRef, useContext, useEffect } from "react";
import "./_codiceStdGtm.scss";
import SnippetStd from "./NewSnippet/SnippetStd";
import OldSnippet from "./OldSnippet/OldSnippet";
import { Button, Row, Col } from "react-bootstrap";
import { ModalInput } from "../../../.././components/Modal/ModalInput";
import { ContexAlert } from "../../../../App/App";
import { DocumentContext } from "../../Doc";
import { useUpdateDatalayerMutation } from "../../../../hooks/graphql/mutations/useUpdateDatalayerMutation/index";
import { useParams } from "react-router-dom";

const CodiceStdGtm = () => {
  const [show, setShow] = useState(false);

  const componentRef = useRef();

  let { pk } = useParams();

  const [setShowMessage, setMessage] = useContext(ContexAlert);

  const data = useContext(DocumentContext);

  const [
    updateDatalayer,
    { loading: loadingUpdate, error: errorUpdate, data: dataUpdate },
  ] = useUpdateDatalayerMutation();

  const handleFormModal = (dlName, cName) => {
    updateDatalayer({
      variables: {
        update_data: {
          name: dlName,
          document: pk,
          id: data?.datalayer?.pk,
          container: {
            name: cName,
            document: pk,
            id: data?.datalayer?.container?.pk,
          },
        },
      },
    });
  };

  useEffect(() => {
    if (errorUpdate) {
      setMessage(errorUpdate?.message ? errorUpdate?.message : "Error!");
      setShowMessage(true);
    } else if (dataUpdate) {
      setMessage(`Datalayer e Container aggiornati !`);
      setShowMessage(true);
    }
  }, [errorUpdate, dataUpdate]);
  // MEMO: NON MI FA VEDERE MESSAGGIO DOPO L'UPDATE (sembra che dataUpdate non abbia dati)

  return (
    <article>
      <Row ref={componentRef}>
        <Col>
          <Row>
            <Col>
              <header>
                <h1 className="pb-1">
                  Codice standard (produzione {"&"} staging)
                </h1>
              </header>
            </Col>
          </Row>
          <ModalInput
            show={show}
            onHide={() => setShow(false)}
            handleformodal={handleFormModal}
          />
          <section>
            <p>Il codice della libreria di Google Tag Manager deve:</p>
            <div>
              <ul className="list-gtm-std">
                <li>
                  essere inserito sempre{" "}
                  <span className="fw-bolder">
                    dopo il codice DataLayer, subito dopo l'apertura del Tag{" "}
                    <code className="code-tag">
                      <span>{"<"}</span>
                      body
                      <span>{">"}</span>
                    </code>
                  </span>
                </li>
                <li>
                  essere presente in ogni pagina, comprese quelle con dominio di
                  terzo livello
                </li>
                <li>
                  deve essere presente nell'ambiente di{" "}
                  <span className="fw-bolder">produzione</span>
                </li>
              </ul>
            </div>
            <div className="d-flex flex-column">
              <div>
                <Button
                  variant="light"
                  className="btn-sm float-end"
                  onClick={() => setShow(true)}
                >
                  <i className="fas fa-edit"></i>
                </Button>
              </div>
              <SnippetStd />
            </div>
            <div>
              <p>
                A seguito dell'inserimento del codice standard in tutte le
                pagine sarà necessario, in concomitanza del deploy, rimuovere
                tutti i codici analytics attualmente iniettati direttamente in
                pagina.
              </p>
              <p>
                Sarà successivamente GTM, una volta configurato, a gestire
                l'invio dei dati.
              </p>
              <p>
                Rimuovere i codici in pagina è necessario per evitare
                duplicazioni.
              </p>
              <p>Ci concorderemo per effettuare lo switch.</p>
            </div>
            <div className="d-flex justify-content-center align-items-center flex-column my-4">
              <div style={{ maxWidth: "42em" }}>
                <p className="fw-bold span-green">NEW</p>
                <SnippetStd />
              </div>
              <div style={{ maxWidth: "42em", marginTop: "30px" }}>
                <p className="fw-bold text-danger">OLD</p>
                <OldSnippet />
              </div>
            </div>
          </section>
        </Col>
      </Row>
    </article>
  );
};

export default CodiceStdGtm;
