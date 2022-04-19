import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { useRouteMatch, useLocation } from "react-router-dom";
import "./_submenu.scss";

const SubMenu = ({ item, itemDash }) => {
  let match = useRouteMatch();
  const [subnav, setSubnav] = useState(false);
  let location = useLocation();

  const showSubnav = () => {
    setSubnav(!subnav);
  };

  return (
    <>
      {location.pathname.includes("/dashboard") ? (
        <Nav.Item
          className="my-1 border-gradient border-gradient-purple"
          style={{ marginRight: 0, fontSize: "14px", borderRadius: "15px" }}
        >
          <Nav.Link
            href={`${match.url}${itemDash.path.toLowerCase()}`}
            style={{ padding: "8px 4px" }}
          >
            <span style={{ marginRight: "4px" }}>
              <i className={itemDash?.icon}></i>
            </span>
            {itemDash?.title.toUpperCase().replaceAll(" ", "-")}
          </Nav.Link>
        </Nav.Item>
      ) : (
        <Nav.Item
          className="my-1 border-gradient border-gradient-purple"
          style={{ marginRight: 0, fontSize: "14px", borderRadius: "15px" }}
        >
          <Nav.Link
            href={
              item?.subChapter && item.subChapter.edges.length > 0
                ? ""
                : `${match.url}${item.path.toLowerCase()}`
            }
            onClick={item.subChapter.edges.length > 0 && showSubnav}
            style={{ padding: "8px 4px" }}
          >
            <span style={{ marginRight: "4px" }}>
              <i className={item?.icon}></i>
            </span>
            {item?.title.toUpperCase().replaceAll(" ", "-")}
            {item.subChapter.edges.length > 0 && (
              <span
                className={!subnav ? "arrow-rotate" : `arrow-rotate-true`}
                id="awesome-arrow"
              >
                <i className="fas fa-chevron-right"></i>
              </span>
            )}
          </Nav.Link>
          <Nav>
            <ul className="list-unstyled ms-1">
              {subnav &&
                item?.subChapter?.edges.map((i) => (
                  <li key={i?.node.id} onClick={() => showSubnav(subnav)}>
                    <Nav.Link
                      href={`${match.url}${item?.path
                        .toLowerCase()
                        .replaceAll(" ", "-")}${i?.node?.path
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {i?.node?.title.toLowerCase()}
                    </Nav.Link>
                  </li>
                ))}
            </ul>
          </Nav>
        </Nav.Item>
      )}
    </>
  );
};

export default SubMenu;
