import React from "react";
import { Modal } from "react-bootstrap";
import NewDocVariable from "../../../Pages/Dashboard/Variables/NewDocVariable/index";
import NewVariable from "../../../Pages/Dashboard/Variables/NewVariable/NewVariable";
import { useLocation } from "react-router-dom";
import "./_fullScreenModal.scss";

export const FullScreenModal = (props) => {
  let location = useLocation();

  return (
    <Modal show={props.show} fullscreen={true} onHide={props.onHide}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {location.pathname.includes("dashboard") ? (
          <NewVariable inModal={true} closeFullScreen={props.onHide} />
        ) : (
          <NewDocVariable inModal={true} closeFullScreen={props.onHide} />
        )}
      </Modal.Body>
    </Modal>
  );
};
