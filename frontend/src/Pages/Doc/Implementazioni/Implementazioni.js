import React, { useContext } from "react";
import { DocumentContext } from "../Doc";

const Implementazioni = () => {
  const data = useContext(DocumentContext);

  const handleExternalLink = () => {
    window.open(`https://${data?.url}`, "_black");
  };

  return (
    <article>
      <header>
        <h1>Implementazioni</h1>
      </header>
      <div>
        <p>
          I codici specificati di seguito sono esclusivamente riferiti al
          dominio{" "}
          <span
            onClick={handleExternalLink}
            className="span-green text-decoration-underline"
            style={{ cursor: "pointer" }}
          >
            {" "}
            {data?.url}
          </span>{" "}
          e sono necessari per tracciare in maniera solida e completa il
          comportamento e le interazioni dell'utente sul sito.
        </p>
        <p>
          Per ogni tracciamento viene fornita una descrizione sul come/quando
          attivarsi, accompagnato poi da uno screenshot di riferimento.
        </p>
      </div>
    </article>
  );
};

export default Implementazioni;
