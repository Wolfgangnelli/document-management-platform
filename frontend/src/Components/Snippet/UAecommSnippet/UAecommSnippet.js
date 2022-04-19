import React from "react";

const ProductImpressionSnippet = ({ data }) => {
  return (
    <div>
      <div className="snippet-highlight">
        <pre className="snippet-code-jsx">
          <code>
            <pre style={{ marginBottom: 0 }} className="text-wrap">
              <span className="punctuation">dataLayer.push</span>
              <span className="punctuation">{"({"}</span>
              <pre className="ms-1 text-wrap" style={{ marginBottom: 0 }}>
                <span className="keyword">{`'event'`}</span>
                <span className="punctuation">{":"} </span>
                <span className="value">{`'${data.event}'`}</span>
                <span className="punctuation">, </span>
              </pre>
              <pre style={{ marginBottom: 0 }} className="text-wrap ms-1">
                <span className="keyword">{`${"'ecommerce'"}`}</span>
                <span className="punctuation">{": {"}</span>
              </pre>
              <pre className="ms-2 text-wrap" style={{ marginBottom: 0 }}>
                <span className="keyword">{`'currencyCode'`}</span>
                <span className="punctuation">{":"} </span>
                <span className="value">{`'${data.ecommerce.currencyCode}'`}</span>
                <span className="punctuation">, </span>
              </pre>
              <pre style={{ marginBottom: 0 }} className="text-wrap ms-2">
                <span className="keyword">{`${"'impressions'"}`}</span>
                <span className="punctuation">{": [{"}</span>
              </pre>
              {data.ecommerce.items.map((item, idx) => (
                <pre
                  className="ms-3 text-wrap"
                  style={{ marginBottom: 0 }}
                  key={idx}
                >
                  <span className="keyword">{`'${item.key}'`}</span>
                  <span className="punctuation">{":"} </span>
                  <span className="value">{`'${item.value}'`}</span>
                  <span className="punctuation">, </span>
                </pre>
              ))}
            </pre>
            <pre>
              <span className="punctuation ms-2">{"}]"}</span>
            </pre>
            <pre>
              <span className="punctuation ms-1">{"}"}</span>
            </pre>
            <pre>
              <span className="punctuation">{"});"}</span>
            </pre>
          </code>
        </pre>
      </div>
    </div>
  );
};

export default ProductImpressionSnippet;
