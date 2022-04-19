import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { FormContainer } from "../../components/FormContainer/FormContainer";
import { useGetUserQuery } from "../../hooks/graphql/queries/useGetUserQuery/index";
import Loader from "../../components/Loader/index";
import Message from "../../components/Message/index";
import { USER_DATA } from "../../config/constants";
import { ContextUser } from "../../App/App";
import { useUpdateUserMutation } from "../../hooks/graphql/mutations/useUpdateUserMutation/index";

const Profile = ({ history }) => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  const [isLogged] = useContext(ContextUser);

  const user = JSON.parse(localStorage.getItem(USER_DATA));

  const { loading, error, data } = useGetUserQuery({
    variables: {
      id: user?.id,
    },
    skip: !isLogged,
  });

  const [
    userUpdate,
    { loading: loadingUpdate, error: errorUpdate, data: dataUpdate },
  ] = useUpdateUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userUpdate({
        variables: {
          id: user?.id,
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
    !isLogged && history.push("/login");
    if (data) {
      setUsername(data?.user?.username);
      setEmail(data?.user?.email);
      localStorage.setItem(USER_DATA, JSON.stringify(data?.user));
    }
  }, [data, isLogged, dataUpdate]);

  return (
    <Container>
      <Row>
        <h1 className="text-center">PROFILE</h1>
      </Row>
      {loading && <Loader />}
      {error && <Message variant="danger">{error.message}</Message>}
      {data && (
        <Row>
          <Col>
            <FormContainer>
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
                <Form.Group className="my-2" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span>
                    <small>
                      Se non vuoi cambiare la tua password, lascia il campo
                      vuoto
                    </small>
                  </span>
                </Form.Group>
                {(errorUpdate || dataUpdate) && (
                  <Row className="mt-1">
                    <Col>
                      <Message
                        variant={`${errorUpdate ? "danger" : "success"}`}
                      >
                        {errorUpdate
                          ? errorUpdate.message
                          : "Dati aggiornati correttamente!"}
                      </Message>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col className="d-flex justify-content-center">
                    <Button type="submit" variant="primary" className="mt-4">
                      SAVE
                    </Button>
                  </Col>
                </Row>
              </Form>
            </FormContainer>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Profile;
