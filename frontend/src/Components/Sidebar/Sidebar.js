import React, { useContext } from "react";
import { Nav, DropdownButton } from "react-bootstrap";
import "./_sidebar.scss";
import SubMenu from "../SubMenu/SubMenu";
import { useWindowSize } from "../../hooks/useWindowSize";
import { DocumentContext } from "../../Pages/Doc/Doc";

const Sidebar = ({ dataDash }) => {
  const size = useWindowSize();
  const data = useContext(DocumentContext);

  return (
    <div style={{ position: "sticky", top: "4rem" }}>
      {size.width >= "576" ? (
        <Nav
          className="d-flex flex-column flex-shrink-0 position-sticky" //min-vh-100
          defaultActiveKey="/"
          style={{ top: "0" }}
        >
          <ul className="list-unstyled pt-4">
            {data
              ? data?.chapter?.edges.map((item, index) => (
                  <SubMenu item={item.node} key={index} />
                ))
              : dataDash &&
                dataDash.map((itemDash, idx) => (
                  <SubMenu itemDash={itemDash} key={idx} />
                ))}
          </ul>
        </Nav>
      ) : (
        <DropdownButton
          id="dropdown-basic-button"
          title="Menu"
          className="d-flex justify-content-center"
        >
          {data
            ? data?.length > 0 &&
              data?.chapter?.edges.map((item, index) => (
                <SubMenu item={item.node} key={index} />
              ))
            : dataDash &&
              dataDash.map((itemDash, idx) => (
                <SubMenu itemDash={itemDash} key={idx} />
              ))}
        </DropdownButton>
      )}
    </div>
  );
};
export default Sidebar;
