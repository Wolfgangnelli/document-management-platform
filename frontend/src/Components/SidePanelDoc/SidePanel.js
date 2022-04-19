import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import "./_sidepanel.scss";
import { AddVariable } from "../Snippet/AddVariable/index";
import NewDocVariable from "../../Pages/Dashboard/Variables/NewDocVariable/index";
import GASnippetDoc from "../../Pages/Doc/Implementazioni/NewDocInteraction/GASnippetDoc/index";
import { SelectVariable } from "../SelectVariables/index";
import { EditInitialSnippetVariable } from "../../Pages/Doc/DataLayerEgtm/InclusioneDataLayer/EditDatalayer/EditInitialSnippetVariable/index";

const SidePanel = ({
  handleSidePanel,
  clicked,
  editVariableID,
  setEditVariableID,
  isUpdate,
  data,
  editVariable,
}) => {
  const handlePanel = () => {
    switch (clicked) {
      case "interazione":
        return (
          <GASnippetDoc
            isUpdate={isUpdate}
            isSidePanel={true}
            dataSnippetUpdate={data}
            close={handleSidePanel}
          />
        );
      case "form-select-variable":
        return <SelectVariable close={handleSidePanel} />;
      /*       
      case "e-commerce":
        return <NewGA4EcoSnippet />; */
      case "initial-snippet":
        return <AddVariable close={handleSidePanel} />;
      case "doc-variable":
        return (
          <NewDocVariable
            close={handleSidePanel}
            editVariableID={editVariableID}
            setEditVariableID={setEditVariableID}
          />
        );
      case "edit-initial-snippet-variable":
        return (
          <EditInitialSnippetVariable
            close={handleSidePanel}
            variable={editVariable}
          />
        );
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
            onClick={() => {
              handleSidePanel("close");
              setEditVariableID && setEditVariableID(null);
            }}
          >
            &times;
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SidePanel;
