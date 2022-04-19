import React, { useContext } from "react";
import "./_introduction.scss";
import { Row } from "react-bootstrap";
import AnchorLinks from "../../../components/AnchorLinks/AnchorLinks";
import { DocumentContext } from "../../Doc/Doc";
import { Hr } from "../../../components/Hr/index";

const Introduction = () => {
  const anchor_links = ["Scopo del documento", "Best Practices"];

  const data = useContext(DocumentContext);

  const handleExternalLink = () => {
    window.open(`https://${data?.url}`, "_black");
  };

  return (
    <article>
      <header>
        <h1>Introduzione</h1>
      </header>
      <AnchorLinks anchor_links={anchor_links} />
      <Hr />
      <Row>
        <section>
          <div className="d-flex align-items-center justify-content-between">
            <h3 id="scopo-del-documento" className="anchor-title">
              Scopo del documento
            </h3>
          </div>
          <div className="introduction-section">
            <p>
              Lo scopo del presente documento è fornire tutti i codici necessari
              per l'implementazione dei tracciamenti Google Analytics del sito
              <span
                onClick={handleExternalLink}
                style={{ cursor: "pointer" }}
                className="span-green text-decoration-underline"
              >
                {" "}
                {data?.url}
              </span>{" "}
              tramite Google Tag Manager.
            </p>
            <p>
              Per ogni tracciamento viene fornita una descrizione sul
              come/quando attivarsi, accompagnato poi da uno screenshot di
              riferimento.
            </p>
          </div>
          <Hr />
        </section>
        <section>
          <div className="d-flex align-items-center justify-content-between">
            <h3 id="best-practices" className="anchor-title">
              Best Practices
            </h3>
          </div>
          <div className="introduction-section">
            <h4>Formattazione stringhe</h4>
            <p>
              Quando all'interno del documento viene chiesto di riportare nei
              tracciamenti il valore di una label si consiglia di valorizzare
              tutte le variabili in{" "}
              <span className="span-green">lower case</span> sostituendo gli
              spazi con gli <span className="span-green">underscore</span>
            </p>
            <div className="example">
              <p className="fw-bolder">Esempio</p>
              <p>
                Foo Bar{" "}
                <span style={{ color: "white" }}>
                  <i className="fas fa-arrow-right"></i>
                </span>{" "}
                foo_bar
              </p>
            </div>
          </div>
          <div className="introduction-section">
            <h4>Formattazione dei valori numerici</h4>
            <p>
              Tutti i valori numerici vanno espressi
              <span className="span-green">
                {" "}
                senza separatore delle migliaia.
              </span>{" "}
              Il separatore dei decimali deve essere obbligatoriamente il
              <span className="span-green"> punto</span>. All'interno dei
              tracciamenti{" "}
              <span className="span-green">non va inserita la valuta</span>.
            </p>
            <div className="example">
              <p className="fw-bolder">Esempio</p>
              <p>
                &euro; 1.300,50{" "}
                <span style={{ color: "white" }}>
                  <i className="fas fa-arrow-right"></i>
                </span>{" "}
                1300.50
              </p>
            </div>
          </div>
        </section>
      </Row>
    </article>
  );
};

export default Introduction;
