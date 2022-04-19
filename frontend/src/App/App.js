import React, { useState, createContext, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Container, Alert } from "react-bootstrap";
import { Routes } from "../routes/routes";
import "./_app.scss";
import { AppProvider } from "../contexts/index";
import { CSSTransition } from "react-transition-group";
import { USER_DATA } from "../config/constants";

export const ContexAlert = createContext();
export const ContextUser = createContext();

function App() {
  const [showMessage, setShowMessage] = useState(false);

  const [message, setMessage] = useState("");

  const userLogged = localStorage.getItem(USER_DATA) ? true : false;

  const [isLogged, setIsLogged] = useState(userLogged);

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 4000);
    }
  }, [showMessage]);

  return (
    <AppProvider>
      <ContextUser.Provider value={[isLogged, setIsLogged]}>
        <ContexAlert.Provider value={[setShowMessage, setMessage]}>
          <div>
            <Header />
            <CSSTransition
              in={showMessage}
              timeout={300}
              classNames="alert-top"
              unmountOnExit
            >
              <Alert
                className="mover"
                variant="info"
                onClose={() => setShowMessage(false)}
              >
                {message}
              </Alert>
            </CSSTransition>
            <main>
              <div className="sheet-overlay"></div>
              <Container fluid="xxl">
                <Routes />
              </Container>
            </main>
            <Footer />
          </div>
        </ContexAlert.Provider>
      </ContextUser.Provider>
    </AppProvider>
  );
}

export default App;
