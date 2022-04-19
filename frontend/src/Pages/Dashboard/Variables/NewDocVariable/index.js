import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button, FloatingLabel, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetDocumentVariableQuery } from "../../../../hooks/graphql/queries/useGetDocumentVariableQuery/index";
import { useUpdateDocumentVariableMutation } from "../../../../hooks/graphql/mutations/useUpdateDocumentVariableMutation/index";
import { useCreateDocumentVariableMutation } from "../../../../hooks/graphql/mutations/useCreateDocumentVariableMutation/index";
import { useLocation } from "react-router-dom";
import { ContexAlert } from "../../../../App/App";

const NewDocVariable = ({
  close,
  editVariableID,
  inModal,
  closeFullScreen,
  setEditVariableID,
}) => {
  const [name, setName] = useState("");

  const [reference, setReference] = useState("");

  const [priority, setPriority] = useState("");

  const [scope, setScope] = useState("");

  const [valore, setValore] = useState("");

  const [casistica, setCasistica] = useState("");

  const [arr, setArr] = useState([]);

  //const [createVariable, { error, data }] = useCreateVariableMutation();
  const [createDocumentVariable, { error, data }] =
    useCreateDocumentVariableMutation();

  let { pk } = useParams();

  const [setShowMessage, setMessage] = useContext(ContexAlert);

  const { data: dataDocumentVariable } = useGetDocumentVariableQuery({
    variables: {
      id: editVariableID,
    },
    skip: !editVariableID,
  });

  const [updateDocumentVariable, { error: errorUpdate, data: dataUpdate }] =
    useUpdateDocumentVariableMutation();

  const handleArr = () => {
    setArr((prev) => [
      ...prev,
      {
        name: valore,
        condition: casistica,
      },
    ]);
    setValore("");
    setCasistica("");
  };

  const handleFormVariable = (e) => {
    e.preventDefault();
    const type = {
      reference: reference,
      scope: scope,
      priority: priority,
    };
    const variableValues = [];
    arr.map((el) => variableValues.push(el));
    if (!dataDocumentVariable) {
      createDocumentVariable({
        variables: {
          document_variable_data: {
            name: name,
            type,
            documentVariableValues: variableValues,
            document: pk,
          },
        },
      });
    } else {
      type["id"] = dataDocumentVariable?.documentVariable?.type?.pk;
      updateDocumentVariable({
        variables: {
          data_update: {
            name,
            type,
            documentVariableValues: variableValues,
            id: dataDocumentVariable?.documentVariable?.pk,
            document: pk,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (!dataUpdate) {
      if (dataDocumentVariable) {
        setName(dataDocumentVariable?.documentVariable?.name);
        setReference(dataDocumentVariable?.documentVariable?.type?.reference);
        setPriority(dataDocumentVariable?.documentVariable?.type?.priority);
        setScope(dataDocumentVariable?.documentVariable?.type?.scope);
        dataDocumentVariable.documentVariable.documentVariableValue.edges.map(
          (item) => {
            let obj = {
              name: item.node.name,
              condition: item.node.condition,
            };
            setArr((prev) => [...prev, obj]);
            return;
          }
        );
      }
    }
    if (data) {
      setArr([]);
    }
    if (error || errorUpdate) {
      let mes = error ? error.message : errorUpdate && errorUpdate.message;
      setMessage(mes);
      setShowMessage(true);
    }
    if (data || dataUpdate) {
      let mes = data
        ? "Variable created !"
        : dataUpdate && "Variable updated !";
      setMessage(mes);
      setShowMessage(true);
      inModal ? closeFullScreen() : close("close");

      dataUpdate && setEditVariableID(null);
    }
  }, [data, error, dataDocumentVariable, dataUpdate, errorUpdate]);

  // PROBLEM: QUANDO VIENE EFFETTUATO IL SALVATAGGIO NON VIENE MOSTRATO IL MESSAGGIO SUCCESS or ERRROR (controllare i rendering...)
  // MEMO: NON MI SI AGGIORNA BENE LA CACHE DOPO LA CREAZIONE DELLA DOC VARIABLE (fare un check)

  return (
    <Row>
      <Row>
        <Col md={8}>
          <h1>
            {!dataDocumentVariable
              ? "CREATE NEW DOCUMENT VARIABLE"
              : `UPDATE ${dataDocumentVariable?.documentVariable?.name}`}{" "}
          </h1>
        </Col>
        <Col md={4}></Col>
      </Row>
      <Form onSubmit={handleFormVariable}>
        <Row>
          <Col className="d-flex justify-content-end" lg={11}>
            <Button variant="success" type="submit">
              SAVE
            </Button>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col lg={5}>
            <Form.Group className="mb-3" controlId="nomeVariabile">
              <Form.Label>Nome variabile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value.trim().replaceAll(" ", "_"))
                }
              />
              <Form.Text className="text-muted">Es. page_type</Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col lg={4}>
            <Form.Group controlId="reference">
              <Form.Label>Seleziona Reference</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              >
                <option value=""></option>
                <option value="datalayer">datalayer</option>
                <option value="ecommerce">ecommerce</option>
                <option value="eventi">eventi</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group controlId="priorità">
              <Form.Label>Seleziona Priorità</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value=""></option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Bassa">Bassa</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group controlId="scope">
              <Form.Label>Seleziona Scope</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
              >
                <option value=""></option>
                <option value="Hit">Hit</option>
                <option value="Session">Session</option>
                <option value="User">User</option>
                <option value="Product">Product</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <Form.Group className="mb-3" controlId="valore variabile">
              <Form.Label>Valore variabile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter value"
                value={valore}
                onChange={(e) => {
                  setValore(e.target.value);
                }}
              />
              <Form.Text className="text-muted">Es. homepage</Form.Text>
            </Form.Group>
          </Col>
          <Col lg={5}>
            <Form.Label></Form.Label>
            <FloatingLabel controlId="casistica" label="casistica">
              <Form.Control
                as="textarea"
                style={{ height: "120px" }}
                placeholder="casistica"
                value={casistica}
                onChange={(e) => setCasistica(e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col lg={1} className="d-flex align-items-center">
            <Button
              variant="secondary"
              className="fw-bold btn-outline-secondary"
              onClick={handleArr}
            >
              ADD
            </Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col lg={10}>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Valore</th>
                  <th>Casistica</th>
                </tr>
              </thead>
              <tbody>
                {arr.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.condition}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Form>
    </Row>
  );
};

export default NewDocVariable;
