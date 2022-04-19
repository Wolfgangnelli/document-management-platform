import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Loader from "../Loader/index";
import { getSubChapterID } from "../../helpers/functions";

export const BaseModal = (props) => {
  const [checked, setChecked] = useState([]);

  const { show, onHide, data, uploadSectionMutation, dataDoc } = props;

  const { chapter, datalayer, pk, ...rest } = dataDoc;

  useEffect(() => {
    return () => setChecked([]);
  }, [show]);

  return (
    <Modal show={show} onHide={onHide} fullscreen="lg-down">
      {!data && <Loader />}
      {data && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Choose sections</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Template Sections</h6>
            {data?.sectionsTemplate?.edges.map((item) => (
              <Form.Check
                key={item.node.id}
                type="checkbox"
                id={item.node.id}
                label={item.node.title}
                onClick={() =>
                  setChecked((prev) => {
                    let el = prev.find((_) => _ === item.node.pk);
                    if (el) {
                      return prev.filter((item) => item !== el);
                    } else {
                      return [...prev, item.node.pk];
                    }
                  })
                }
              />
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="primary"
              onClick={() => {
                uploadSectionMutation({
                  variables: {
                    ids: checked,
                    datalayerID: datalayer.pk,
                    documentID: pk,
                    subChapterID: getSubChapterID(dataDoc, true),
                  },
                });
                onHide(false);
              }}
            >
              SAVE
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};
