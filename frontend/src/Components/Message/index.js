import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

function Message({ variant, children }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHide(true);
    }, 4000);
  }, []);

  return (
    <Alert
      variant={variant}
      onClick={() => setHide(true)}
      style={hide === false ? { display: "block" } : { display: "none" }}
      dismissible
    >
      {children}
    </Alert>
  );
}

export default Message;
