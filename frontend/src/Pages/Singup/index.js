import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../../components/Message/index";
import { FormContainer } from "../../components/FormContainer/FormContainer";
import { useUserSingUpMutation } from "../../hooks/graphql/mutations/useUserSingUpMutation/index";
import { ContexAlert } from "../../App/App";
import "./index.scss";

const Singup = ({ location, history }) => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  const [codice, setCodice] = useState("");

  const [userSingUp, { error, data }] = useUserSingUpMutation();

  const [setShowMessage, setMessage] = useContext(ContexAlert);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userSingUp({
        variables: {
          input: {
            username,
            email,
            password,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data || error) {
      let mes = !!data
        ? `Utente ${data?.userCreate?.user?.username} creato correttamente!`
        : !!error && error.message;
      setMessage(mes);
      setShowMessage(true);
    }
    data && !error && history.push("/login");
  }, [data, error]);

  return (
    <FormContainer>
      <h1 className="py-2 text-center">Registration</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="codice">
          <Form.Label>Codice alfa / numerico</Form.Label>
          <Form.Control
            type="text"
            placeholder="Codice"
            value={codice}
            onChange={(e) => setCodice(e.target.value)}
            required
          />
        </Form.Group>
        {error && (
          <Row className="mt-1">
            <Col>
              <Message variant="danger">{error.message}</Message>
            </Col>
          </Row>
        )}
        <Row>
          <Col className="d-flex justify-content-center">
            <Button type="submit" variant="primary" className="mt-4">
              SUBMIT
            </Button>
          </Col>
        </Row>
      </Form>
      <Row className="p-3">
        <Col>
          Already Registered?{" "}
          <Link to={"/login"} className="link-register">
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Singup;
