import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const IntroduzioneGtm = () => {
  let match = useRouteMatch();

  return (
    <article>
      <header>
        <h1>Codice di tracciamento GTM</h1>
      </header>
      <div>
        <section>
          <div>
            <p>
              Il codice del Google Tag Manager (GTM) da includere in tuttle le
              pagine del sito è composto da 2 parti: una parte che descrive
              tutte le informazioni in pagina, chiamato{" "}
              <Link to={`${match.url.replace("introduzione", "datalayer")}`}>
                <span className="span-green">dataLayer</span>
              </Link>
              , e una parte che carica la libreria di Google Tag Manager
              chiamato{" "}
              <Link
                to={`${match.url.replace(
                  "introduzione",
                  "codice-standard-gtm"
                )}`}
              >
                <span className="span-green">codice standard</span>
              </Link>
              .
            </p>
          </div>
          <div>
            <p>I next step per l'inclusione dei due codici sono:</p>
            <div className="ms-2">
              <p>
                <span style={{ color: "greenyellow" }}>1 </span>Implementare in
                pagina l'oggeto DataLayer e i nuovi codici relativi ai
                tracciamenti;
              </p>
              <p>
                <span style={{ color: "greenyellow" }}>2 </span>Aggiungere il
                codice di tracciamento GTM su tutte le pagine del sito web;
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};

export default IntroduzioneGtm;
