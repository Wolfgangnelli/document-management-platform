import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button, FloatingLabel, Table } from "react-bootstrap";
import { useCreateVariableMutation } from "../../../../hooks/graphql/mutations/useCreateVariableMutation/index";
import { useGetVariableQuery } from "../../../../hooks/graphql/queries/useGetVariableQuery/index";
import { useUpdateVariableMutation } from "../../../../hooks/graphql/mutations/useUpdateVariableMutation/index";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { GoBackBtn } from "../../../../components/Buttons/GoBackBtn";
import { ContexAlert } from "../../../../App/App";
import { ModalUpdateVarValue } from "../../../../components/Modal/ModalUpdateVarValue";
import { useUpdateVariableValueMutation } from "../../../../hooks/graphql/mutations/useUpdateVariableValueMutation/index";
import { useDeleteVariableValueMutation } from "../../../../hooks/graphql/mutations/useDeleteVariableValueMutation/index";

const NewVariable = ({ closeFullScreen, isSidePanel, inModal }) => {
  const [name, setName] = useState("");

  const [reference, setReference] = useState("");

  const [priority, setPriority] = useState("");

  const [show, setShow] = useState(false);

  const [scope, setScope] = useState("");

  const [valore, setValore] = useState("");

  const [casistica, setCasistica] = useState("");

  const [arr, setArr] = useState([]);

  const [valueToUpdate, setValueToUpdate] = useState({});

  const [variabilePk, setVariabilePk] = useState(null);

  let location = useLocation();

  let history = useHistory();

  const [createVariable, { error, data }] = useCreateVariableMutation();

  const [variableValueDelete, { data: dataDeleteVarValue }] =
    useDeleteVariableValueMutation();

  const [variableValueUpdate, { data: dataUpdateVarValue }] =
    useUpdateVariableValueMutation();

  let { id } = useParams();

  const [setShowMessage, setMessage] = useContext(ContexAlert);

  const { data: dataVariable } = useGetVariableQuery({
    variables: {
      id: id,
    },
    skip: !id,
  });

  const [updateVariable, { error: errorUpdate, data: dataUpdate }] =
    useUpdateVariableMutation();

  const handleArr = () => {
    setArr((prev) => {
      let alreadyExist = prev.find((el) => {
        if (
          el.name === valueToUpdate.name &&
          el.condition === valueToUpdate.condition
        ) {
          return el;
        }
        return undefined;
      });
      if (alreadyExist) {
        return prev.map((item) => {
          if (alreadyExist === item) {
            item.name = valore;
            item.condition = casistica;
          }
          return item;
        });
      } else {
        return [
          ...prev,
          {
            name: valore,
            condition: casistica,
          },
        ];
      }
    });
    setValore("");
    setCasistica("");
  };

  const deleteHandler = (deleteID, name) => {
    if (window.confirm(`Sei sicuro di voler eliminare il valore ${name}?`)) {
      variableValueDelete({
        variables: {
          deleteID,
        },
      });
    }
  };

  const handleEdit = (item) => {
    if (item?.pk) {
      setValueToUpdate(item);
      setVariabilePk(dataVariable?.variable?.pk);
      setShow(true);
    } else {
      setValueToUpdate(item);
      setValore(item?.name);
      setCasistica(item?.condition);
    }
  };

  const handleFormVariable = (e) => {
    e.preventDefault();
    const type = {
      reference: reference,
      scope: scope,
      priority: priority,
    };
    const variableValues = [];
    arr.map((el) =>
      variableValues.push({
        name: el.name,
        condition: el.condition,
      })
    );
    if (!id) {
      createVariable({
        variables: {
          variableData: {
            name: name,
            type,
            variableValues,
            isTemplate: true,
          },
        },
      });
    } else {
      updateVariable({
        variables: {
          variableData: {
            name,
            type,
            variableValues,
            isTemplate: true,
            id: dataVariable.variable.pk,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (!dataUpdate) {
      if (dataVariable) {
        setName(dataVariable?.variable?.name);
        setReference(dataVariable?.variable?.type?.reference);
        setPriority(dataVariable?.variable?.type?.priority);
        setScope(dataVariable?.variable?.type?.scope);
        dataVariable.variable.variableValue.edges.map((item) => {
          let obj = {
            name: item.node.name,
            condition: item.node.condition,
            pk: item.node.pk,
          };
          setArr((prev) => {
            let alreadyExist = prev.find((el) => el.pk === obj.pk);

            if (alreadyExist) {
              return prev;
            } else {
              return [...prev, obj];
            }
          });
        });
      }
    }
    if (error || errorUpdate) {
      let mes = error ? error.message : errorUpdate && errorUpdate.message;
      setMessage(mes);
      setShowMessage(true);
    }
    if (dataUpdate || data) {
      if (data) {
        setArr([]);
      }
      let mes = data
        ? "Variabile creata!"
        : dataUpdate && "Variabile aggiornata!";
      setMessage(mes);
      setShowMessage(true);
      isSidePanel || inModal ? closeFullScreen() : history.goBack();
    }
    if (dataDeleteVarValue) {
      setArr([]);
      dataVariable.variable.variableValue.edges.map((item) => {
        let obj = {
          name: item.node.name,
          condition: item.node.condition,
          pk: item.node.pk,
        };
        setArr((prev) => [...prev, obj]);
      });
    }
  }, [dataVariable, data, dataUpdate, error, errorUpdate, dataDeleteVarValue]);

  useEffect(() => {
    if (dataUpdateVarValue) {
      setArr((prev) => {
        return prev.map((item) => {
          if (
            item.pk === dataUpdateVarValue.updateVariableValue.variableValue.pk
          ) {
            item.name =
              dataUpdateVarValue.updateVariableValue.variableValue.name;
            item.condition =
              dataUpdateVarValue.updateVariableValue.variableValue.condition;
          }
          return item;
        });
      });
    }
  }, [dataUpdateVarValue]);

  return (
    <Row>
      {location.pathname === "/dashboard/variable/new-variable" ||
      location.pathname.includes("/dashboard/variable/") ? (
        <GoBackBtn path={"/dashboard/variable"} />
      ) : null}
      <Row>
        <ModalUpdateVarValue
          show={show}
          onHide={setShow}
          item={valueToUpdate}
          variabilePk={variabilePk}
          update={variableValueUpdate}
        />
        <Col md={8}>
          <h1 className="text-center">
            {!id
              ? "CREA NUOVA VARIABILE"
              : `UPDATE VARIABILE: ${dataVariable?.variable?.name}`}
          </h1>
        </Col>
        <Col md={4}></Col>
      </Row>
      <Form onSubmit={handleFormVariable}>
        <Row>
          <Col className="d-flex justify-content-end" lg={11}>
            <Button variant="success" type="submit" className="fw-bolder">
              SAVE
            </Button>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col lg={5}>
            <Form.Group className="mb-3" controlId="nomeVariabile">
              <Form.Label>Nome variabile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                <option value="dataLayer">dataLayer</option>
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {arr.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.condition}</td>
                    <td className="d-flex justify-content-evenly">
                      <Button
                        variant="light"
                        className="btn-sm"
                        title="modifica"
                        onClick={() => handleEdit(item)}
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        title="elimina"
                        onClick={() => deleteHandler(item?.pk, item?.name)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
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

export default NewVariable;
