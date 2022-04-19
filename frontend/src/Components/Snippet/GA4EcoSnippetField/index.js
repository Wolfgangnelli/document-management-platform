import React from "react";

export function GA4EcoSnippetField({ key_field, value_field, is_item }) {
  return (
    <pre
      className={!is_item ? "ms-2 text-wrap" : "ms-3 text-wrap"}
      style={{ marginBottom: 0 }}
    >
      <span className="keyword">{key_field}</span>
      <span className="punctuation">{":"} </span>
      <span className="value">{value_field}</span>
      <span className="punctuation">, </span>
    </pre>
  );
}
