import React, { useState } from "react";
import "./_datalayerSnippet.scss";
import Modal from "../Modal/Modal";

const DatalayerSnippet = ({ dataInitialSnippet }) => {
  const [modalShow, setModalShow] = useState(false);
  const [itemClicked, setItemClicked] = useState({});

  const handleModal = (item) => {
    setItemClicked(item);
    setModalShow(true);
  };

  // MEMO: FORMATTARE LE VARIABILI, SOSTITUENDO EVENTUALI SPAZI VUOTI CON _

  return (
    <div style={{ maxWidth: "42em" }} className="mx-auto">
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        item={itemClicked}
      />
      <div className="snippet-highlight">
        <pre className="snippet-code-jsx">
          <code>
            <pre style={{ marginBottom: 0 }}>
              <span className="tag">
                {"<"}script{">"}
              </span>
            </pre>
            <pre style={{ marginBottom: 0 }} className="text-wrap">
              <span className="punctuation">dataLayer = </span>
              <span className="punctuation">{"({"}</span>
              <pre className="ms-3 text-wrap" style={{ marginBottom: 0 }}>
                <span className="keyword">{"'event'"}</span>
                <span className="punctuation">{":"} </span>
                <span className="value">{`'${
                  dataInitialSnippet?.initialSnippet?.event?.name ?? ""
                }'`}</span>
                <span className="punctuation">, </span>
              </pre>
              {dataInitialSnippet?.initialSnippet?.initialSnippetVariable.edges.map(
                (_, idx) => (
                  <pre
                    className="ms-3 text-wrap"
                    style={{ marginBottom: 0 }}
                    key={idx}
                  >
                    <span className="keyword">
                      {`'${_.node.name.replaceAll(" ", "_")}'`}
                    </span>
                    <span className="punctuation">{":"} </span>
                    <span
                      className="value text-decoration-none"
                      role="button"
                      title="detail"
                      onClick={() => handleModal(_.node)}
                    >
                      {`$$$${_.node.name.replaceAll(" ", "_")}$$$`}
                    </span>
                    <span className="punctuation">, </span>
                  </pre>
                )
              )}
            </pre>
            <pre>
              <span className="punctuation">{"});"}</span>
            </pre>
            <pre style={{ marginBottom: 0 }}>
              <span className="tag">
                {"</"}script{">"}
              </span>
            </pre>
          </code>
        </pre>
      </div>
    </div>
  );
};

export default DatalayerSnippet;
