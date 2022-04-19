import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../../components/Message/index";
import { FormContainer } from "../../components/FormContainer/FormContainer";
import { useUserLoginMutation } from "../../hooks/graphql/mutations/useUserLoginMutation/index";
import { USER_DATA, AUTH_TOKEN, TOKEN_EXPIRE } from "../../config/constants";
import { ContextUser } from "../../App/App";
import "./index.scss";

const Login = ({ location, history }) => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [userLogin, { error, data }] = useUserLoginMutation();

  const [, setIsLogged] = useContext(ContextUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userLogin({
        variables: {
          username,
          password,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveUserData = (userData) => {
    localStorage.setItem(USER_DATA, JSON.stringify(userData?.user));
    localStorage.setItem(AUTH_TOKEN, JSON.stringify(userData?.token));
    localStorage.setItem(TOKEN_EXPIRE, JSON.stringify(userData?.payload.exp));
    setIsLogged(true);
    history.push("/");
  };

  useEffect(() => {
    data && !error && saveUserData(data?.tokenAuth);
  }, [data, error]);

  return (
    <FormContainer>
      <h1 className="py-2 text-center">Sing In</h1>
      <Form onSubmit={handleSubmit}>
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
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          New Customer?{" "}
          <Link to={"/singup"} className="link-register">
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
