import React, { useState, useEffect, useContext } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { ContextModal } from "../../Pages/Doc/Implementazioni/NewDocInteraction/GASnippetDoc/index";
import { useListVariablesQuery } from "../../hooks/graphql/queries/useGetVariablesQuery/index";
import { useGetDocumentVariablesQuery } from "../../hooks/graphql/queries/useGetDocumentVariablesQuery/index";
import Loader from "../../components/Loader/index";
import { DocumentContext } from "../../Pages/Doc/Doc";

const ModalRadioCheck = (props) => {
  const [checked, setChecked] = useState("");

  const { show, onHide, eventName } = props;

  const [
    setCategory,
    setAction,
    setLabel,
    setCustomDimension,
    setCustomMetric,
  ] = useContext(ContextModal);

  const { loading, data: dataTemplateVariables } = useListVariablesQuery();

  const formattingVariable = (var_name) => {
    return `$$$${var_name}$$$`;
  };

  const handleChecked = (id, name) => {
    if (checked.length > 0) {
      setChecked("");
    } else {
      setChecked(id);
      switch (eventName) {
        case "category":
          setCategory(formattingVariable(name));
          break;
        case "action":
          setAction(formattingVariable(name));
          break;
        case "label":
          setLabel(formattingVariable(name));
          break;
        case "dimension_name":
          setCustomDimension((prev) => ({ ...prev, key: name }));
          break;
        case "dimension_value":
          setCustomDimension((prev) => ({ ...prev, value: name }));
          break;
        case "metric_name":
          setCustomMetric((prev) => ({ ...prev, key: name }));
          break;
        case "metric_value":
          setCustomMetric((prev) => ({ ...prev, value: name }));
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    return () => setChecked("");
  }, [show]);

  return (
    <Modal show={show} onHide={onHide} fullscreen="lg-down">
      {loading && <Loader />}
      {dataTemplateVariables && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Choose variable</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Template variables</h6>
            {dataTemplateVariables?.variables?.edges.map((item) => (
              <Form.Check
                key={item.node.id}
                disabled={
                  checked.length <= 0
                    ? false
                    : checked === item.node.id
                    ? false
                    : true
                }
                type="checkbox"
                id={item.node.id}
                label={item.node.name}
                onClick={() => handleChecked(item.node.id, item.node.name)}
              />
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button type="primary" onClick={() => onHide(false)}>
              SAVE
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default ModalRadioCheck;
