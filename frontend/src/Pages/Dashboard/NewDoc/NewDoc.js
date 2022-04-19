import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../hooks/graphql/queries/useGetCategoriesQuery/index";
import { useCreateDocumentMutation } from "../../../hooks/graphql/mutations/useCreateDocumentMutation/index";
import Loader from "../../../components/Loader/index";
import Message from "../../../components/Message/index";
import { ContexAlert } from "../../../App/App";

const NewDoc = () => {
  const [versioning, setVersioning] = useState(false);

  const [introduzione, setIntroduzione] = useState(false);

  const [datalayerGtm, setDatalayerGtm] = useState(false);

  const [introduzione_dl_gtm, setIntroduzione_dl_gtm] = useState(false);

  const [codiceStandardGtm, setCodiceStandardGtm] = useState(false);

  const [datalayer, setDatalayer] = useState(false);

  const [implementazioni, setImplementazioni] = useState(false);

  const [introduzione_implementazioni, setIntroduzione_implementazioni] =
    useState(false);

  const [interazioni, setInterazioni] = useState(false);

  const [ecommerce, setEcommerce] = useState(false);

  const [e_commerce, setE_commerce] = useState(false);

  const [resi, setResi] = useState(false);

  const [uploadFile, setUploadFile] = useState({});

  const [subChapter1, setSubChapter1] = useState([]);

  const [subChapter2, setSubChapter2] = useState([]);

  const [subChapter3, setSubChapter3] = useState([]);

  const [name, setName] = useState("");

  const [websiteUrl, setWebsiteUrl] = useState("");

  const [title, setTitle] = useState("");

  const [category, setCategory] = useState("");

  const { loading, error, data } = useGetCategoriesQuery();

  let history = useHistory();

  const [createDocumentMutation, { error: errorDocument, data: dataDocument }] =
    useCreateDocumentMutation();

  const [setShowMessage, setMessage] = useContext(ContexAlert);

  let arr = [];

  const handleDatalayerGtm = () => {
    setDatalayerGtm(!datalayerGtm);
    if (datalayerGtm === true) {
      introduzione_dl_gtm && setIntroduzione_dl_gtm(false);
      codiceStandardGtm && setCodiceStandardGtm(false);
      datalayer && setDatalayer(false);
    }
  };

  const handleImplementation = () => {
    setImplementazioni(!implementazioni);
    if (implementazioni) {
      introduzione_implementazioni && setIntroduzione_implementazioni(false);
      interazioni && setInterazioni(false);
    }
  };

  const handleEcommerce = () => {
    setEcommerce(!ecommerce);
    if (ecommerce) {
      e_commerce && setE_commerce(false);
      resi && setResi(false);
    }
  };

  const handleChapter = () => {
    versioning && arr.push({ title: "Versioning" });
    introduzione && arr.push({ title: "Introduzione" });
    datalayerGtm &&
      arr.push({ title: "Datalayer e GTM", subChapter: subChapter1 });
    implementazioni &&
      arr.push({ title: "Implementazioni", subChapter: subChapter2 });
    ecommerce && arr.push({ title: "E-Commerce", subChapter: subChapter3 });
    return arr;
  };

  const handleUploadFile = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    setUploadFile({
      validity,
      file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let cat = data.categories.edges.find((cat) => cat.node.name === category);
    let file = uploadFile.validity.valid && uploadFile.file;
    arr = handleChapter();
    createDocumentMutation({
      variables: {
        image: file,
        document_data: {
          url: websiteUrl,
          title,
          customer: {
            name,
            category: cat.node.pk,
          },
          chapter: arr,
        },
      },
    });
  };

  useEffect(() => {
    if (dataDocument) {
      console.log(dataDocument);
      setVersioning(false);
      setIntroduzione(false);
      setDatalayerGtm(false);
      setIntroduzione_dl_gtm(false);
      setCodiceStandardGtm(false);
      setDatalayer(false);
      setImplementazioni(false);
      setIntroduzione_implementazioni(false);
      setInterazioni(false);
      setEcommerce(false);
      setE_commerce(false);
      setResi(false);
      setUploadFile({});
      setSubChapter1([]);
      setSubChapter2([]);
      setSubChapter3([]);
      setName("");
      setTitle("");
      setWebsiteUrl("");
      setCategory("");

      setMessage("Documento creato!");
      setShowMessage(true);
      history.push(
        `/docs/${dataDocument?.createDocument?.document?.customer?.name.toLowerCase()}/${dataDocument?.createDocument?.document?.title.toLowerCase()}/${
          dataDocument?.createDocument?.document?.id
        }/${dataDocument?.createDocument?.document?.pk}`
      );
    }

    if (errorDocument) {
      setMessage(errorDocument.message);
      setShowMessage(true);
    }
  }, [setShowMessage, setMessage, dataDocument, errorDocument, history]);

  return (
    <div>
      <h1 className="text-center">CREA NUOVO DOCUMENTO</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error?.message}</Message>}
      {data && (
        <Row>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row>
              <h3>Configurazione generale</h3>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="client-name">
                  <Form.Label>Nome cliente:</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Inserisci nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Form.Text className="text-muted">Es. Barilla</Form.Text>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="doc-title">
                  <Form.Label>Titolo documento:</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Inserisci titolo"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <Form.Text className="text-muted">Es. Barilla</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-2">
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="web-url">
                  <Form.Label>Sito web:</Form.Label>
                  <Form.Control
                    type="sito1"
                    placeholder="Inserisci url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    required
                  />
                  <Form.Text className="text-muted">
                    Es. www.sito1.com
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Categoria cliente:</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value=""></option>
                    {data?.categories?.edges?.map((category) => (
                      <option
                        value={category?.node?.name}
                        key={category?.node?.pk}
                      >
                        {category?.node?.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-2">
              <Form.Group controlId="client-image" className="mb-3">
                <Form.Label>Immagine cliente:</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleUploadFile}
                  required
                />
              </Form.Group>
            </Row>
            <h3>Struttura documento</h3>
            <Col className="mb-3 border rounded" style={{ padding: "1rem" }}>
              <Form.Check
                type="checkbox"
                id="versioning"
                label="Versioning"
                value={versioning}
                checked={versioning}
                onChange={() => setVersioning(!versioning)}
              />
              <Form.Check
                type="checkbox"
                id="introduzione"
                label="Introduzione"
                value={introduzione}
                checked={introduzione}
                onChange={() => setIntroduzione(!introduzione)}
              />{" "}
              <Form.Check
                type="checkbox"
                id="datalayerGtm"
                label="DataLayer e GTM"
                value={datalayerGtm}
                onChange={handleDatalayerGtm}
              />
              <div className="ms-2">
                <Form.Check
                  disabled={datalayerGtm ? false : true}
                  type="checkbox"
                  label="introduzione"
                  id="Introduzione-dl-gtm"
                  value={introduzione_dl_gtm}
                  checked={introduzione_dl_gtm}
                  onChange={() => {
                    setIntroduzione_dl_gtm(!introduzione_dl_gtm);
                    let val = subChapter1.find(
                      (item) => item.title === "introduzione"
                    );
                    if (!val) {
                      setSubChapter1((prev) => [
                        ...prev,
                        { title: "introduzione" },
                      ]);
                    } else {
                      setSubChapter1((prev) =>
                        prev.filter((item) => item.title !== "introduzione")
                      );
                    }
                  }}
                />
                <Form.Check
                  disabled={datalayerGtm ? false : true}
                  type="checkbox"
                  label="codice Standard Gtm"
                  id="Codice standard GTM"
                  value={codiceStandardGtm}
                  checked={codiceStandardGtm}
                  onChange={() => {
                    setCodiceStandardGtm(!codiceStandardGtm);
                    let val = subChapter1.find(
                      (item) => item.title === "codice Standard Gtm"
                    );
                    if (!val) {
                      setSubChapter1((prev) => [
                        ...prev,
                        { title: "codice Standard Gtm" },
                      ]);
                    } else {
                      setSubChapter1((prev) =>
                        prev.filter(
                          (item) => item.title !== "codice Standard Gtm"
                        )
                      );
                    }
                  }}
                />
                <Form.Check
                  disabled={datalayerGtm ? false : true}
                  type="checkbox"
                  label="datalayer"
                  id="datalayer"
                  value={datalayer}
                  checked={datalayer}
                  onChange={() => {
                    setDatalayer(!datalayer);
                    let val = subChapter1.find(
                      (item) => item.title === "datalayer"
                    );
                    if (!val) {
                      setSubChapter1((prev) => [
                        ...prev,
                        { title: "datalayer" },
                      ]);
                    } else {
                      setSubChapter1((prev) =>
                        prev.filter((item) => item.title !== "datalayer")
                      );
                    }
                  }}
                />
              </div>
              <Form.Check
                type="checkbox"
                id="implementazioni"
                label="Implementazioni"
                value={implementazioni}
                checked={implementazioni}
                onChange={handleImplementation}
              />
              <div className="ms-2">
                <Form.Check
                  disabled={implementazioni ? false : true}
                  type="checkbox"
                  label="introduzione"
                  id="Introduzione"
                  value={introduzione_implementazioni}
                  checked={introduzione_implementazioni}
                  onChange={() => {
                    setIntroduzione_implementazioni(
                      !introduzione_implementazioni
                    );
                    let val = subChapter2.find(
                      (item) => item.title === "introduzione"
                    );
                    if (!val) {
                      setSubChapter2((prev) => [
                        ...prev,
                        { title: "introduzione" },
                      ]);
                    } else {
                      setSubChapter2((prev) =>
                        prev.filter((item) => item.title !== "introduzione")
                      );
                    }
                  }}
                />
                <Form.Check
                  disabled={implementazioni ? false : true}
                  type="checkbox"
                  label="interazioni sul sito"
                  id="Interazioni sito"
                  value={interazioni}
                  checked={interazioni}
                  onChange={() => {
                    setInterazioni(!interazioni);
                    let val = subChapter2.find(
                      (item) => item.title === "interazioni sul sito"
                    );
                    if (!val) {
                      setSubChapter2((prev) => [
                        ...prev,
                        { title: "interazioni sul sito" },
                      ]);
                    } else {
                      setSubChapter2((prev) =>
                        prev.filter(
                          (item) => item.title !== "interazioni sul sito"
                        )
                      );
                    }
                  }}
                />
              </div>
              <Form.Check
                type="checkbox"
                id="E-Commerce"
                label="E-Commerce"
                value={ecommerce}
                checked={ecommerce}
                onChange={handleEcommerce}
              />
              <div className="ms-2">
                <Form.Check
                  disabled={ecommerce ? false : true}
                  type="checkbox"
                  label="e-commerce"
                  id="e-commerce"
                  value={e_commerce}
                  checked={e_commerce}
                  onChange={() => {
                    setE_commerce(!e_commerce);
                    let val = subChapter3.find(
                      (item) => item.title === "e-commerce"
                    );
                    if (!val) {
                      setSubChapter3((prev) => [
                        ...prev,
                        { title: "e-commerce" },
                      ]);
                    } else {
                      setSubChapter3((prev) =>
                        prev.filter((item) => item.title !== "e-commerce")
                      );
                    }
                  }}
                />
                <Form.Check
                  disabled={ecommerce ? false : true}
                  type="checkbox"
                  label="resi"
                  id="resi"
                  value={resi}
                  checked={resi}
                  onChange={() => {
                    setResi(!resi);
                    let val = subChapter3.find((item) => item.title === "resi");
                    if (!val) {
                      setSubChapter3((prev) => [...prev, { title: "resi" }]);
                    } else {
                      setSubChapter3((prev) =>
                        prev.filter((item) => item.title !== "resi")
                      );
                    }
                  }}
                />
              </div>
            </Col>
            <Row>
              <Col className="d-flex justify-content-center">
                <Button variant="primary" type="submit">
                  CREA
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      )}
    </div>
  );
};

export default NewDoc;
