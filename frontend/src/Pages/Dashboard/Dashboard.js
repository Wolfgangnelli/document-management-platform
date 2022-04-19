import React from "react";
import { Row, Col } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashRoutes from "../../routes/dashRoutes";
import "./_dashboard.scss";
import sideJson from "../../json/SideJson.json";

const Dashboard = () => {
  return (
    <div>
      <Row>
        <Col lg={2} className="border-sidenav">
          <Sidebar dataDash={sideJson} />
        </Col>
        <Col lg={10}>
          <DashRoutes />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
