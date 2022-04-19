import React, { useContext, useEffect } from "react";
import { Navbar, Container, Nav, Image, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./_header.scss";
import logo from "../../assets/logo_domp.png";
import { USER_DATA, AUTH_TOKEN, TOKEN_EXPIRE } from "../../config/constants";
import { ContextUser } from "../../App/App";

const Header = () => {
  const [isLogged, setIsLogged] = useContext(ContextUser);

  const userData = JSON.parse(localStorage.getItem(USER_DATA));

  const logout = () => {
    localStorage.removeItem(USER_DATA);
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(TOKEN_EXPIRE);
    setIsLogged(false);
  };

  return (
    <header>
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        fixed="top"
        collapseOnSelect
        className="nav-doc"
      >
        <Container>
          <Navbar.Brand href="/" className="fw-bold p-0">
            <Image
              src={logo}
              style={{
                maxHeight: "42px",
              }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="nav-items">
            <Nav className="mr-auto">
              {isLogged && (
                <>
                  <Nav.Link href="/docs">
                    <i className="fas fa-book me-1"></i>
                    DOCS
                  </Nav.Link>
                  <Nav.Link href="/dashboard">
                    <i className="fas fa-hammer me-1"></i>DASHBOARD
                  </Nav.Link>
                </>
              )}
              {!isLogged ? (
                <div className="d-flex ms-lg-2">
                  <Nav.Link href="/login" className="float-end">
                    <i className="fas fa-user me-1"></i>LOGIN
                  </Nav.Link>
                  <Nav.Link href="/singup" className="float-end">
                    <i className="fa-solid fa-id-card me-1"></i>SINGUP
                  </Nav.Link>
                </div>
              ) : (
                <div className="d-flex justify-content-center align-items-center ms-lg-2">
                  <span style={{ color: "green" }}>
                    <i className="fa-solid fa-user-check"></i>
                  </span>
                  <NavDropdown
                    title={userData?.username.toUpperCase()}
                    id="username"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
