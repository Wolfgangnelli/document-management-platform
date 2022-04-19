import React, { useState, useContext, useEffect, useCallback } from "react";
import { Row, Col, Button, Form, FloatingLabel, Image } from "react-bootstrap";
import DataPushSnippet from "../../../../components/Snippet/InteractionPush/dataPushSnippet";
import { useParams, useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import SidePanel from "../../../../components/SidePanelDoc/SidePanel";
import { getGaSnippetsTemplateQuery } from "../../../../hooks/graphql/queries/useGetGASnippetsTemplateQuery/index";
import { getGaSnippetsQuery } from "../../../../hooks/graphql/queries/useGetGaSnippetsQuery/index";
import { useCreateSectionMutation } from "../../../../hooks/graphql/mutations/useCreateSectionMutation/index";
import { useGetSectionQuery } from "../../../../hooks/graphql/queries/useGetSectionQuery/index";
import { useUpdateSectionMutation } from "../../../../hooks/graphql/mutations/useUpdateSectionMutation/index";
import Loader from "../../../../components/Loader/index";
import Message from "../../../../components/Message/index";
import { GoBackBtn } from "../../../../components/Buttons/GoBackBtn";
import { DocumentContext } from "../../Doc";
import { ContexAlert } from "../../../../App/App";
import { useDropzone } from "react-dropzone";
import "./_creaDocInterazione.scss";

const CreateDocInteraction = () => {
  const [clicked, setClicked] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);

  const [loadData, setLoadData] = useState("");

  const [title, setTitle] = useState("");

  const [action, setAction] = useState("");

  const [note, setNote] = useState("");

  const [priority, setPriority] = useState("");

  const [pageLink, setPageLink] = useState("");

  const [category, setCategory] = useState("interazioni sul sito");

  const [snippetTemplateID, setSnippetTemplateID] = useState(null);

  const data = useContext(DocumentContext);

  const [setShowMessage, setMessage] = useContext(ContexAlert);

  const [uploadFile, setUploadFile] = useState({});

  let history = useHistory();

  let { sectionID, sectionPK } = useParams();

  const { data: dataSection } = useGetSectionQuery({
    variables: {
      sectionID,
    },
    skip: !sectionID,
  });

  const [
    getGaSnippetsTemplate,
    {
      loading: loadingTemplate,
      data: dataTemplate,
      fetchMore: fetchMoreTemplateSnippet,
    },
  ] = useLazyQuery(getGaSnippetsTemplateQuery, {
    variables: {
      cursor: null,
    },
  });

  const [
    getGaSnippets,
    {
      loading,
      error,
      data: dataSnippetDocument,
      fetchMore: fetchMoreDocumentSnippet,
    },
  ] = useLazyQuery(getGaSnippetsQuery, {
    variables: {
      datalayerID: data?.datalayer?.id,
    },
  });

  const [createSection, { error: errorCreate, data: dataCreate }] =
    useCreateSectionMutation();

  const [updateSection, { error: errorUpdate, data: dataUpdate }] =
    useUpdateSectionMutation();

  const onDrop = useCallback((acceptedFiles) => {
    // Da fare: gestire il file qui
    console.log(acceptedFiles);

    setUploadFile(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSidePanel = (type, status) => {
    setClicked(type);
    if (
      status === "open" &&
      (type === "interazione" || type === "e-commerce")
    ) {
      document.querySelectorAll(`.sidepanel`)[0].style.width = "75vw";
      document.querySelector(".sheet-overlay").style.opacity = "0.62";
      document.querySelector(".sheet-overlay").style.visibility = "visible";
    } else {
      document.querySelectorAll(`.sidepanel`)[0].style.width = "0";
      document.getElementById("new-interaction-site").style.opacity = "1";
      document.querySelector(".sheet-overlay").style.opacity = "0";
      document.querySelector(".sheet-overlay").style.visibility = "hidden";
    }
  };

  const handleFetchMore = () => {
    loadData === "template"
      ? fetchMoreTemplateSnippet({
          variables: {
            cursor: dataTemplate?.gaSnippetsTemplate?.pageInfo?.endCursor,
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.gaSnippetsTemplate.edges;
            const pageInfo = fetchMoreResult.gaSnippetsTemplate.pageInfo;

            return newEdges.length
              ? {
                  gaSnippetsTemplate: {
                    __typename: prevResult.gaSnippetsTemplate.__typename,
                    edges: [
                      ...prevResult.gaSnippetsTemplate.edges,
                      ...newEdges,
                    ],
                    pageInfo,
                    totalCount: prevResult.gaSnippetsTemplate.totalCount,
                  },
                }
              : prevResult;
          },
        })
      : loadData === "document" &&
        fetchMoreDocumentSnippet({
          variables: {
            cursor: dataSnippetDocument?.gaSnippets?.pageInfo?.endCursor,
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.gaSnippets.edges;
            const pageInfo = fetchMoreResult.gaSnippets.pageInfo;

            return newEdges.length
              ? {
                  gaSnippets: {
                    __typename: prevResult.gaSnippets.__typename,
                    edges: [...prevResult.gaSnippets.edges, ...newEdges],
                    pageInfo,
                    totalCount: prevResult.gaSnippets.totalCount,
                  },
                }
              : prevResult;
          },
        });
  };

  const getSubChapterID = () => {
    const chap = data?.chapter?.edges.find(
      (chapter) => chapter.node.path === "/Implementazioni"
    );
    const subChap = chap.node.subChapter.edges.find(
      (subChapter) => subChapter.node.path === "/interazioni-sul-sito"
    );
    return subChap?.node.pk;
  };

  const handleForm = (e) => {
    e.preventDefault();

    // let file = uploadFile?.validity?.valid ? uploadFile.file : null;
    let file = uploadFile.length ? uploadFile[0] : null;

    if (!sectionID) {
      createSection({
        variables: {
          image: file,
          sectionData: {
            title,
            action,
            priority,
            category,
            note,
            datalayer: data?.datalayer?.pk,
            gaSnippetTemplate: snippetTemplateID,
            subChapter: getSubChapterID(),
            pageLink,
          },
        },
      });
    } else if (sectionID) {
      if (!!file) {
        updateSection({
          variables: {
            image: file,
            dataUpdate: {
              title,
              id: sectionPK,
              action,
              priority,
              category,
              note,
              pageLink,
              imagePk: dataSection?.section?.image?.pk ?? null,
            },
          },
        });
      } else {
        updateSection({
          variables: {
            dataUpdate: {
              title,
              id: sectionPK,
              action,
              priority,
              category,
              note,
              pageLink,
              imagePk: dataSection?.section?.image?.pk ?? null,
            },
          },
        });
      }
    }
  };

  const labelFile = (
    <p>
      NUOVO FILE CARICATO:{" "}
      <span style={{ color: "greenyellow" }}>
        {uploadFile[0]?.name ?? uploadFile[0]?.path}
      </span>
    </p>
  );

  useEffect(() => {
    if (errorCreate || errorUpdate) {
      setMessage(errorCreate?.message ?? errorUpdate?.message);
      setShowMessage(true);
    }
    if (dataCreate || dataUpdate) {
      setMessage(
        `Interazione ${dataCreate ? "creata" : "aggiornata"} correttamente!`
      );
      setShowMessage(true);
      history.goBack();
    }
    if (dataSection) {
      setTitle(dataSection?.section?.title);
      setPageLink(dataSection?.section?.image?.pageLink ?? "");
      setNote(dataSection?.section?.note);
      setAction(dataSection?.section?.action);
      setPriority(dataSection?.section?.priority);
    }
  }, [
    errorCreate,
    setMessage,
    setShowMessage,
    dataCreate,
    dataSection,
    dataUpdate,
    errorUpdate,
  ]);

  useEffect(() => {
    console.log(uploadFile);
  }, [uploadFile]);

  return (
    <>
      <SidePanel
        handleSidePanel={handleSidePanel}
        clicked={clicked}
        isUpdate={isUpdate ?? false}
        data={isUpdate ? dataSection?.section?.gaSnippet?.edges[0] : null}
      />
      <Row id="new-interaction-site">
        <GoBackBtn />
        <Col>
          <h1 className="text-center">
            {!sectionID
              ? "CREA NUOVA DOC INTERACTION"
              : "UPDATE DOC INTERACTION"}
          </h1>
        </Col>
        <Form
          className="d-flex"
          onSubmit={handleForm}
          encType="multipart/form-data"
        >
          <Row>
            <Col>
              <Button
                variant="success"
                type="submit"
                className="float-end fw-bolder"
              >
                CREA
              </Button>
            </Col>
            <Row>
              <Col lg={5}>
                <Form.Group className="mb-3" controlId="titolo">
                  <Form.Label>Titolo interazione</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci titolo"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Es. Ricerca nel sito
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col lg={1}></Col>
              <Col lg={5}>
                <Form.Group className="mb-3" controlId="url">
                  <Form.Label>Url image pagina sito</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci url pagina"
                    value={pageLink}
                    onChange={(e) => setPageLink(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    {"Es. https://www.sitoweb.it/ricerca"}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={5}>
                <FloatingLabel controlId="note" label="Note" className="mb-3">
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col lg={1}></Col>
              <Col lg={5}>
                <FloatingLabel
                  controlId="azione"
                  label="Azione"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    style={{ height: "100px" }}
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col lg={5}>
                <Form.Label>Priorità</Form.Label>
                <Form.Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option></option>
                  <option value="MANDATORY">Mandatory</option>
                  <option value="ALTA">Alta</option>
                  <option value="MEDIA">Media</option>
                  <option value="BASSA">Bassa</option>
                </Form.Select>
              </Col>
              <Col lg={1}></Col>
              <Col lg={5}>
                <Form.Group>
                  <Form.Label>Category:</Form.Label>
                  <Form.Check
                    type="radio"
                    label="interazione sul sito"
                    name="interaction"
                    id="interaction-1"
                    checked={true}
                    onChange={() => null}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-2 py-4">
              <Col lg={5}>
                <p style={{ marginBottom: 0 }}>Immagine attuale:</p>
                {sectionID && dataSection?.section?.image && (
                  <Image src={dataSection?.section?.image?.url} thumbnail />
                )}
              </Col>
              <Col md={7}>
                <div {...getRootProps()} className="area">
                  <div id="dropZone">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Trascina i file qui...</p>
                    ) : (
                      <p>
                        Trascina e rilascia i file qui o fai clic per
                        selezionarli
                      </p>
                    )}
                  </div>
                </div>
                <Row>
                  <div>{!!uploadFile.length && labelFile}</div>
                </Row>
              </Col>
              <Col md={2}></Col>
            </Row>

            <Row className="py-4">
              {sectionID && dataSection?.section?.gaSnippet?.edges[0] && (
                <Row>
                  <Col md={6}>
                    <div>
                      <p>Snippet Attuale:</p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="outline-secondary"
                        className="btn-sm"
                        onClick={() => {
                          setIsUpdate(true);
                          handleSidePanel("interazione", "open");
                        }}
                      >
                        <i className="fas fa-edit"></i>
                        <span className="ms-1">Edit</span>
                      </Button>
                    </div>
                    <div>
                      <DataPushSnippet
                        data={dataSection?.section?.gaSnippet?.edges[0]}
                        snippet={false}
                      />
                    </div>
                  </Col>
                </Row>
              )}
              {!dataSection?.section?.gaSnippet?.edges[0] && (
                <Row>
                  <Row>
                    <Col>Includi uno snippet:</Col>
                    <Col className="d-flex flex-wrap justify-content-end">
                      <Button
                        variant="secondary"
                        className="fw-bold btn-outline-secondary fs-6 mb-1"
                        onClick={() => {
                          setIsUpdate(false);
                          handleSidePanel("interazione", "open");
                        }}
                      >
                        CREA GA SNIPPET
                      </Button>
                      {/*  <Button
                    variant="secondary"
                    className="fw-bold btn-outline-secondary fs-6 ms-1"
                    onClick={() => handleSidePanel("e-commerce", "open")}
                  >
                    CREA GA4 E-COMMERCE SNIPPET
                  </Button> */}
                    </Col>
                  </Row>
                  {!snippetTemplateID && (
                    <Row>
                      <Col
                        lg={10}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <Button
                          onClick={() => {
                            setLoadData("template");
                            getGaSnippetsTemplate();
                          }}
                          size="sm"
                        >
                          <i className="fas fa-spinner"></i> TEMPLATE SNIPPETS
                        </Button>
                        {/*                     <Button
                      size="sm"
                      className="mx-1"
                      onClick={() => {
                        setLoadData("document");
                        getGaSnippets();
                      }}
                    >
                      <i className="fas fa-spinner"></i> DOCUMENT SNIPPETS
                    </Button> */}
                      </Col>
                    </Row>
                  )}
                  <Row className="mt-3">
                    {(loading || loadingTemplate) && <Loader />}
                    {error && (
                      <Message variant="danger">{error?.message}</Message>
                    )}
                    {
                      loadData === "template" &&
                        dataTemplate?.gaSnippetsTemplate?.edges.map(
                          (item, idx) => (
                            <Col lg={4} key={idx}>
                              <DataPushSnippet
                                data={item}
                                snippet={true}
                                setSnippetTemplateID={setSnippetTemplateID}
                                snippetTemplateID={snippetTemplateID}
                              />
                            </Col>
                          )
                        )
                      /*                   : loadData === "document" &&
                    dataSnippetDocument?.gaSnippets?.edges.map((item, idx) => (
                      <Col lg={4} key={idx}>
                        <DataPushSnippet
                          data={item}
                          snippet={true}
                          setSnippetTemplateID={setSnippetTemplateID}
                          snippetTemplateID={snippetTemplateID}
                        />
                      </Col>
                    )) */
                    }
                  </Row>
                  {((loadData === "template" &&
                    dataTemplate?.gaSnippetsTemplate.totalCount > 6 &&
                    !snippetTemplateID) ||
                    (loadData === "document" &&
                      dataSnippetDocument?.gaSnippets.totalCount > 6 &&
                      !snippetTemplateID)) && (
                    <Row>
                      <Col className="d-flex justify-content-center">
                        <Button
                          variant="info"
                          className="fw-bold"
                          onClick={handleFetchMore}
                        >
                          <i className="fas fa-spinner"></i> LOAD MORE
                        </Button>
                      </Col>
                    </Row>
                  )}
                </Row>
              )}
            </Row>
          </Row>
        </Form>
      </Row>
    </>
  );
};

export default CreateDocInteraction;
