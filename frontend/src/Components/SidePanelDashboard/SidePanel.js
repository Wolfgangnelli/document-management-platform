import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import NewSnippetTemplate from "../../Pages/Dashboard/SnippetTemplate/NewSnippetTemplate/NewSnippetTemplate";
import "./_sidepanel.scss";
import NewVariable from "../../Pages/Dashboard/Variables/NewVariable/NewVariable";
import NewGA4EcoSnippetTemplate from "../../Pages/Dashboard/SnippetTemplate/NewGA4EcoSnippetTemplate/index";
import { SelectVariableDash } from "../SelectVariables/SelectVariableDashboard/index";

const SidePanel = ({ handleSidePanel, clicked }) => {
  const handlePanel = () => {
    switch (clicked) {
      case "interazione":
        return <NewSnippetTemplate isSidePanel={true} />;
      case "variable":
        return <NewVariable isSidePanel={true} />;
      case "e-commerce":
        return <NewGA4EcoSnippetTemplate isSidePanel={true} />;
      case "form-select-variable":
        return <SelectVariableDash handleSidePanel={handleSidePanel} />;
      default:
        break;
    }
  };

  return (
    <div className="sidepanel" id={`sheet-panel-${clicked}`}>
      <div className="sheet-overlay-panel"></div>
      <Row
        style={{
          paddingLeft: "20px",
          paddingTop: "40px",
          paddingRight: "10px",
        }}
      >
        <Col sm={11}>{handlePanel()}</Col>
        <Col sm={1}>
          <Button
            className="closebutton float-end"
            onClick={() => handleSidePanel("close")}
          >
            &times;
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SidePanel;
