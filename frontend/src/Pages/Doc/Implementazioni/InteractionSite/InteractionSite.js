import React, { useState, useEffect, useRef, useContext } from "react";
import DocCardInteraction from "../../../../components/CardInteraction/DocCardInteraction/index";
import AnchorLinks from "../../../../components/AnchorLinks/AnchorLinks";
import { Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useRouteMatch } from "react-router-dom";
import { useGetSectionsQuery } from "../../../../hooks/graphql/queries/useGetSectionsQuery/index";
import { Hr } from "../../../../components/Hr/index";
import Loader from "../../../../components/Loader/index";
import { getSubChapterID } from "../../../../helpers/functions";
import { DocumentContext } from "../../../Doc/Doc";
import { ContexAlert } from "../../../../App/App";
import { BaseModal } from "../../../../components/Modal/BaseModal";
import { getSectionsTemplateQuery } from "../../../../hooks/graphql/queries/useGetSectionsTemplateQuery/index";
import { useUploadSectionMutation } from "../../../../hooks/graphql/mutations/useUploadSectionMutation/index";
import { useLazyQuery } from "@apollo/client";

// MENO: se upload delle section è andato a buon fine, allora faccio refetch delle sezioni cosi da avere anche quelle appena create

const InteractionSite = () => {
  const [arrayAnchor, setArrayAnchor] = useState([]);

  const [show, setShow] = useState(false);

  let match = useRouteMatch();

  const componentRef = useRef();

  const data = useContext(DocumentContext);

  const [setShowMessage, setMessage] = useContext(ContexAlert);

  const [
    getSectionsTemplate,
    {
      loading: loadingSectionTemplate,
      error: errorSectionTemplate,
      data: dataSectionTemplate,
    },
  ] = useLazyQuery(getSectionsTemplateQuery);

  const [
    uploadSectionMutation,
    { loading: loadingUpload, error: errorUpload, data: dataUpload },
  ] = useUploadSectionMutation();

  const {
    error,
    data: dataSections,
    loading,
    refetch,
  } = useGetSectionsQuery({
    variables: {
      subChapterID: getSubChapterID(data),
    },
  });

  const getTitles = () => {
    dataSections?.sections?.edges.map((section) =>
      setArrayAnchor((prev) => {
        return [...prev, section.node.title];
      })
    );
  };

  useEffect(() => {
    if (dataSections) {
      setArrayAnchor([]);
      getTitles();
    }
    if (dataUpload || errorUpload) {
      let mes = dataUpload
        ? "Interazioni caricate!"
        : errorUpload && errorUpload?.message;
      setMessage(mes);
      setShowMessage(true);
      dataUpload &&
        refetch({
          variables: {
            subChapterID: getSubChapterID(data),
          },
        });
    }
  }, [dataSections, dataSectionTemplate, dataUpload, errorUpload]);

  return (
    <article>
      <BaseModal
        show={show}
        onHide={setShow}
        data={dataSectionTemplate}
        uploadSectionMutation={uploadSectionMutation}
        dataDoc={data}
      />
      <Row ref={componentRef}>
        <Col>
          <header>
            <h1 className="text-center">Interazioni sul sito</h1>
          </header>
          <AnchorLinks anchor_links={arrayAnchor} />
          <Hr />
          <div className="d-flex justify-content-end">
            <LinkContainer to={`${match.url}/crea-interazione`}>
              <Button
                variant="secondary"
                className="mx-1 fw-bold btn-outline-secondary"
              >
                <i className="fa-solid fa-plus"></i> DOC INTERACTION
              </Button>
            </LinkContainer>
            <Button
              variant="secondary"
              className="mx-1 btn btn-outline-secondary fw-bold"
              onClick={() => {
                !dataSectionTemplate && getSectionsTemplate();
                setShow(true);
              }}
            >
              <i className="fa-solid fa-upload"></i> UPLOAD INTERACTION
            </Button>
          </div>
          <Row className="my-1">
            <Col>
              {loading && <Loader />}
              {!!dataSections &&
                dataSections?.sections?.edges.map((section, idx) => (
                  <div key={section.node.id}>
                    <DocCardInteraction data={section.node} idx={idx + 1} />
                    <Hr />
                  </div>
                ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </article>
  );
};

export default InteractionSite;
