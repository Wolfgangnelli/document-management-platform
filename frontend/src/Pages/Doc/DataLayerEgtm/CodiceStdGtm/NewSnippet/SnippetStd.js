import React, { useState, useEffect, useContext } from "react";
import "./_snippetStd.scss";
import { DocumentContext } from "../../../Doc";

const SnippetStd = () => {
  const [datalayerName, setDatalayerName] = useState("");
  const [containerID, setContainerID] = useState("");
  const data = useContext(DocumentContext);

  useEffect(() => {
    if (data.datalayer) {
      setDatalayerName(data?.datalayer?.name);
      setContainerID(data?.datalayer?.container?.name);
    }
  }, [data]);

  return (
    <div className="snippet-highlight">
      <pre className="snippet-code-jsx">
        <code>
          <pre style={{ marginBottom: 0 }}>
            <span className="tag">
              {"<"}script{">"}
            </span>
          </pre>
          <pre style={{ marginBottom: 0 }} className="text-wrap">
            <span className="punctuation">{"("}</span>
            <span className="keyword">function</span>
            <span className="punctuation">{"("}</span>
            <span className="tag">w</span>
            <span className="punctuation">{","}</span>
            <span className="tag">d</span>
            <span className="punctuation">{","}</span>
            <span className="tag">s</span>
            <span className="punctuation">{","}</span>
            <span className="tag">l</span>
            <span className="punctuation">{","}</span>
            <span className="tag">i</span>
            <span className="punctuation">{"){w[l]"}</span>
            <span className="method-name">{"="}</span>
            <span className="punctuation">{"w[l]"}</span>
            <span className="method-name">{"||"}</span>
            <span className="punctuation">{"[];w[l]."}</span>
            <span className="method-name">push</span>
            <span className="punctuation">{"({"}</span>
            <span className="plain-text">{"'gtm.start'"}</span>
            <span className="punctuation">:</span>
          </pre>
          <pre style={{ marginBottom: 0 }} className="text-wrap">
            <span className="keyword">new </span>
            <span className="punctuation">Data().</span>
            <span className="method-name">getTime</span>
            <span className="punctuation">{"(),"}</span>
            <span className="method-name">event</span>
            <span className="punctuation">:</span>
            <span className="plain-text">{"'gtm.js'"}</span>
            <span className="punctuation">{"});"}</span>
            <span className="keyword">var </span>
            <span className="tag">f</span>
            <span className="method-name">{"="}</span>
            <span className="punctuation">d.</span>
            <span className="method-name">getElementsByTagName</span>
            <span className="punctuation">{"(s)["}</span>
            <span className="value">0</span>
            <span className="punctuation">{"];"}</span>
          </pre>
          <pre style={{ marginBottom: 0 }} className="text-wrap">
            <span className="tag">j</span>
            <span className="method-name">{"="}</span>
            <span className="punctuation">d.</span>
            <span className="method-name">createElement</span>
            <span className="punctuation">{"(s),"}</span>
            <span className="tag">dl</span>
            <span className="method-name">{"="}</span>
            <span className="punctuation">l</span>
            <span className="method-name">{"!="}</span>
            <span className="plain-text">{"'dataLayer'"}</span>
            <span className="method-name">{"?"}</span>
            <span className="plain-text">{"'&l='"}</span>
            <span className="method-name">{"+"}</span>
            <span className="punctuation">l:</span>
            <span className="plain-text">{"''"}</span>
            <span className="punctuation">;j.</span>
            <span className="method-name">async=</span>
            <span className="value">true</span>
            <span className="punctuation">;j.</span>
            <span className="method-name">src=</span>
          </pre>
          <pre style={{ marginBottom: 0 }} className="text-wrap">
            <span className="plain-text">
              {"'https://www.googletagmanager.com/gtm.js?id='"}
            </span>
            <span className="method-name">{"+"}</span>
            <span className="punctuation">i</span>
            <span className="method-name">{"+"}</span>
            <span className="punctuation">dl;f.</span>
            <span className="method-name">parentNode</span>
            <span className="punctuation">.</span>
            <span className="method-name">insertBefore</span>
            <span className="punctuation">(j,f);</span>
          </pre>
          <pre style={{ marginBottom: 0 }} className="text-wrap">
            <span className="punctuation">{"})(window,document,"}</span>
            <span className="plain-text">{"'script'"}</span>
            <span className="punctuation">,</span>
            <span className="plain-text">{`'${datalayerName}'`}</span>
            <span className="punctuation">,</span>
            <span className="plain-text">{`'${containerID}'`}</span>
            <span className="punctuation">{");"}</span>
          </pre>
          <pre style={{ marginBottom: 0 }}>
            <span className="tag">
              {"</"}script{">"}
            </span>
          </pre>
        </code>
      </pre>
    </div>
  );
};

export default SnippetStd;
