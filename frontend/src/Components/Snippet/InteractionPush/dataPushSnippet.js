import React, { useState, useEffect } from "react";
import "../_datalayerSnippet.scss";
import { Button, ListGroup } from "react-bootstrap";
import { useRouteMatch, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useDeleteGaSnippetTemplateMutation } from "../../../hooks/graphql/mutations/useDeleteGAsnippetTemplateMutation/index";
import Modal from "../../Modal/Modal";

const DataPushSnippet = ({
  data,
  snippet,
  setShow,
  setResultMessage,
  snippetTemplateID,
  setSnippetTemplateID,
}) => {
  const [snippetSelected, setSnippetSelected] = useState(false);

  const [modalShow, setModalShow] = useState(false);

  const [itemClicked, setItemClicked] = useState({});

  let match = useRouteMatch();

  let location = useLocation();

  const [deleteGaSnippetTemplate, { error, data: dataDelete }] =
    useDeleteGaSnippetTemplateMutation();

  const deleteHandler = (id, snippet_name) => {
    if (
      window.confirm(
        `Sei sicuro di voler eliminare lo snippet ${snippet_name}?`
      )
    ) {
      deleteGaSnippetTemplate({
        variables: {
          delete_id: id,
        },
      });
    }
  };

  const handleSnippetClick = () => {
    setSnippetSelected(!snippetSelected);
    setSnippetTemplateID(data?.node?.pk);
    if (snippetTemplateID === data?.node?.pk) {
      setSnippetTemplateID(null);
    }
  };

  const handleModal = (item) => {
    setItemClicked(item);
    setModalShow(true);
  };

  useEffect(() => {
    if (error) {
      setShow(true);
      setResultMessage(error);
    } else if (dataDelete) {
      setShow(true);
      setResultMessage(dataDelete);
    }
  }, [error, dataDelete, setResultMessage, setShow]);

  return (
    <div className="mb-5">
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        item={itemClicked}
      />
      <ListGroup.Item
        className={
          snippetSelected && snippet && snippetTemplateID === data?.node?.pk
            ? "snippetSelected text-decoration-none"
            : snippet && !snippetSelected && !snippetTemplateID
            ? "snippetHover text-decoration-none"
            : snippet &&
              snippetTemplateID &&
              snippetTemplateID !== data?.node?.pk
            ? "not-selectable text-decoration-none"
            : "text-decoration-none"
        }
        onClick={snippet ? handleSnippetClick : undefined}
        disabled={
          snippet && snippetTemplateID && snippetTemplateID !== data?.node?.pk
        }
      >
        <div className="snippet-highlight">
          <pre className="snippet-code-jsx">
            <code>
              <pre style={{ marginBottom: 0 }} className="text-wrap">
                <span className="punctuation">dataLayer.push</span>
                <span className="punctuation">{"({"}</span>

                <pre className="ms-3 text-wrap" style={{ marginBottom: 0 }}>
                  <span className="keyword">'event'</span>
                  <span className="punctuation">{":"} </span>
                  <span className="value">{`'${
                    data?.node?.event?.name ? data?.node?.event?.name : ""
                  }'`}</span>
                  <span className="punctuation">, </span>
                </pre>

                <pre className="ms-3 text-wrap" style={{ marginBottom: 0 }}>
                  <span className="keyword">'eventID'</span>
                  <span className="punctuation">{":"} </span>
                  <span className="value">
                    {`'${data?.node?.eventIdCustom ?? ""}'`}
                  </span>
                  <span className="punctuation">, </span>
                </pre>

                <pre className="ms-3 text-wrap" style={{ marginBottom: 0 }}>
                  <span className="keyword">'eventCategory'</span>
                  <span className="punctuation">{":"} </span>
                  <span
                    className="value"
                    role={data?.node?.eventActionVariable?.name ? "button" : ""}
                    onClick={() =>
                      data?.node?.eventCategoryVariable?.name
                        ? handleModal(data?.node?.eventCategoryVariable)
                        : null
                    }
                  >{`'${
                    data?.node?.eventCategory.length > 0
                      ? data?.node?.eventCategory
                      : `$$$${data?.node?.eventCategoryVariable?.name}$$$`
                  }'`}</span>
                  <span className="punctuation">, </span>
                </pre>
                <pre className="ms-3 text-wrap" style={{ marginBottom: 0 }}>
                  <span className="keyword">'eventAction'</span>
                  <span className="punctuation">{":"} </span>
                  <span
                    className="value"
                    role={data?.node?.eventActionVariable?.name ? "button" : ""}
                    onClick={() =>
                      data?.node?.eventActionVariable?.name
                        ? handleModal(data?.node?.eventActionVariable)
                        : null
                    }
                  >{`'${
                    data?.node?.eventAction.length > 0
                      ? data?.node?.eventAction
                      : `$$$${data?.node?.eventActionVariable?.name}$$$`
                  }'`}</span>
                  <span className="punctuation">, </span>
                </pre>

                <pre className="ms-3 text-wrap" style={{ marginBottom: 0 }}>
                  <span className="keyword">'eventLabel</span>
                  <span className="punctuation">{":"} </span>
                  <span
                    className="value"
                    role={data?.node?.eventLabelVariable?.name ? "button" : ""}
                    onClick={() =>
                      data.node?.eventLabelVariable?.name
                        ? handleModal(data.node?.eventLabelVariable)
                        : null
                    }
                  >{`'${
                    data?.node?.eventLabel.length > 0
                      ? data?.node?.eventLabel
                      : `$$$${data.node?.eventLabelVariable?.name}$$$`
                  }'`}</span>
                  <span className="punctuation">, </span>
                </pre>

                {!!data?.node?.customField &&
                  data?.node?.customField?.edges.length > 0 &&
                  data.node.customField.edges.map((item) => (
                    <pre
                      className="ms-3 text-wrap"
                      style={{ marginBottom: 0 }}
                      key={item.node.pk}
                    >
                      <span className="keyword">{`'${item?.node?.name}'`}</span>
                      <span className="punctuation">{":"} </span>
                      <span
                        className="value"
                        role={item?.node?.valueVariable?.name ? "button" : ""}
                        onClick={() =>
                          item?.node?.valueVariable?.name
                            ? handleModal(item?.node?.valueVariable)
                            : null
                        }
                      >{`'${
                        item?.node?.value.length > 0
                          ? item?.node?.value
                          : item?.node?.valueVariable?.name
                          ? `$$$${item?.node?.valueVariable?.name}$$$`
                          : ""
                      }'`}</span>
                      <span className="punctuation">, </span>
                    </pre>
                  ))}
              </pre>
              <pre>
                <span className="punctuation">{"});"}</span>
              </pre>
            </code>
          </pre>
        </div>
      </ListGroup.Item>
      <div className="d-flex flex-column">
        <div>
          <p className="fw-bold">{data?.node?.snippetName ?? ""}</p>
        </div>
        {location.pathname === "/dashboard/snippet" && (
          <div className="d-flex justify-content-center">
            <LinkContainer
              to={`${match.path}/ga-snippet/${data?.node?.id}/${data?.node?.pk}/edit`}
            >
              <Button variant="outline-secondary" className="btn-sm">
                <i className="fas fa-edit"></i>
                <span className="ms-1">Edit</span>
              </Button>
            </LinkContainer>
            <Button
              variant="outline-danger"
              className="btn-sm ms-1"
              onClick={() =>
                deleteHandler(data?.node?.pk, data?.node?.snippetName)
              }
            >
              <i className="fas fa-trash"></i>
              <span className="ms-1">Delete</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataPushSnippet;
