import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Form, FloatingLabel, Button, Table } from "react-bootstrap";
import { ModalUpdateVarValue } from "../../../../../../components/Modal/ModalUpdateVarValue";
import { useUpdateInitialSnippetVariableValueMutation } from "../../../../../../hooks/graphql/mutations/useUpdateInitialSnippetVariableValueMutation/index";
import { ContexAlert } from "../../../../../../App/App";
import { useUpdateInitialSnippetVariableMutation } from "../../../../../../hooks/graphql/mutations/useUpdateInitialSnippetVariableMutation/index";
import { useDeleteInitialSnippetVariableValueMutation } from "../../../../../../hooks/graphql/mutations/useDeleteInitialSnippetVariableValueMutation/index";

export const EditInitialSnippetVariable = ({ close, variable }) => {
  const [name, setName] = useState("");

  const [valore, setValore] = useState("");

  const [casistica, setCasistica] = useState("");

  const [valueToUpdate, setValueToUpdate] = useState({});

  const [variabilePk, setVariabilePk] = useState(null);

  const [show, setShow] = useState(false);

  const [arr, setArr] = useState([]);

  const [setShowMessage, setMessage] = useContext(ContexAlert);

  const [
    updateInitialSnippetVariableValue,
    { error: errorUpdateVariableValue, data: dataUpdateVariableValue },
  ] = useUpdateInitialSnippetVariableValueMutation();

  const [
    updateInitialSnippetVariable,
    { error: errorUpdate, data: dataUpdate },
  ] = useUpdateInitialSnippetVariableMutation();

  const [
    deleteInitialSnippetVariableValue,
    { error: errorDelete, data: dataDelete },
  ] = useDeleteInitialSnippetVariableValueMutation();

  const handleFormVariable = (e) => {
    e.preventDefault();

    updateInitialSnippetVariable({
      variables: {
        dataUpdate: {
          id: variable?.pk,
          name,
          type: variable?.type?.pk,
          isTemplate: variable?.isTemplate,
          oldIdx: variable?.oldIdx,
          initialSnippetVariableValue: [...arr],
        },
      },
    });
  };

  const handleArr = () => {
    setArr((prev) => {
      let elemento = prev.find(
        (item) =>
          item.name === valueToUpdate.name &&
          item.condition === valueToUpdate.condition
      );
      if (elemento) {
        return prev.map((el) => {
          if (el === valueToUpdate) {
            el.name = valore;
            el.condition = casistica;
          }
          return el;
        });
      }
      return [...prev, { name: valore, condition: casistica }];
    });
    setValore("");
    setCasistica("");
  };

  const deleteHandler = (deleteID, name) => {
    if (window.confirm(`Sei sicuro di voler eliminare il valore: ${name}?`)) {
      deleteInitialSnippetVariableValue({
        variables: {
          deleteID,
        },
      });
    }
  };

  useEffect(() => {
    if (variable) {
      setName(variable?.name);
      setArr(
        variable?.initialSnippetVariableValue?.edges.map((item) => {
          return {
            name: item?.node?.name,
            condition: item?.node?.condition,
            id: item?.node?.pk,
          };
        })
      );
    }
    if (dataUpdateVariableValue) {
      setArr((prev) => {
        return prev.map((item) => {
          let { name, condition, id } = item;
          if (item.hasOwnProperty("id")) {
            if (
              id ===
              dataUpdateVariableValue.updateInitialSnippetVariableValue
                .initialSnippetVariableValue.pk
            ) {
              name =
                dataUpdateVariableValue.updateInitialSnippetVariableValue
                  .initialSnippetVariableValue.name;
              condition =
                dataUpdateVariableValue.updateInitialSnippetVariableValue
                  .initialSnippetVariableValue.condition;
            }
          }
          return { name, condition, id };
        });
      });
    }

    if (dataUpdateVariableValue || errorUpdateVariableValue) {
      let mes = dataUpdateVariableValue
        ? "Valore aggiornato!"
        : errorUpdateVariableValue && errorUpdateVariableValue?.message;
      setMessage(mes);
      setShowMessage(true);
    }
  }, [variable, dataUpdateVariableValue, errorUpdateVariableValue]);

  useEffect(() => {
    let mes;
    if (dataUpdate || errorUpdate) {
      mes = dataUpdate
        ? "Variabile aggiornata!"
        : errorUpdate && errorUpdate?.message;
      setMessage(mes);
      setShowMessage(true);
      close("close");
    }
    if (dataDelete || errorDelete) {
      mes = dataDelete
        ? "Valore elimitato!"
        : errorDelete && errorDelete?.message;
      setMessage(mes);
      setShowMessage(true);
      setArr((prev) =>
        prev.filter(
          (item) =>
            +item.id !== +dataDelete.deleteInitialSnippetVariableValue.id
        )
      );
    }
  }, [dataUpdate, errorUpdate, dataDelete, errorDelete]);

  return (
    <Row>
      <ModalUpdateVarValue
        show={show}
        onHide={setShow}
        item={valueToUpdate}
        variabilePk={variabilePk}
        update={updateInitialSnippetVariableValue}
        variableType="initialSnippet"
      />
      <Row>
        <Col md={8}>
          <h1 className="text-center py-1">UPDATE {variable?.name}</h1>
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
              <Form.Label>Nome </Form.Label>
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
        <Row>
          <Col lg={5}>
            <Form.Group className="mb-3" controlId="valore variabile">
              <Form.Label>Valore</Form.Label>
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
                    <td>{item?.name}</td>
                    <td>{item?.condition}</td>
                    <td className="d-flex justify-content-evenly">
                      <Button
                        variant="light"
                        className="btn-sm"
                        title="modifica"
                        onClick={() => {
                          if (item?.id) {
                            setValueToUpdate(item);
                            setVariabilePk(variable?.pk);
                            setShow(true);
                          } else {
                            setValueToUpdate(item);
                            setValore(item?.name);
                            setCasistica(item?.condition);
                          }
                        }}
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        title="elimina"
                        onClick={() => {
                          item?.id
                            ? deleteHandler(item?.id, item?.name)
                            : setArr((prev) =>
                                prev.filter(
                                  (el) =>
                                    el.name !== item.name &&
                                    el.condition !== item.condition
                                )
                              );
                        }}
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
