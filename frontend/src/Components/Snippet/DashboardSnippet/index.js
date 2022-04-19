import React, { useState, useEffect } from "react";
import ".././_datalayerSnippet.scss";
import { Button, ListGroup } from "react-bootstrap";
import { useRouteMatch, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useDeleteGaSnippetTemplateMutation } from "../../../hooks/graphql/mutations/useDeleteGAsnippetTemplateMutation/index";
import { formattingVariableWithDollars } from "../../../helpers/functions";

const DashboardSnippet = ({
  data,
  snippet,
  setShow,
  setResultMessage,
  snippetTemplateID,
  setSnippetTemplateID,
}) => {
  const [snippetSelected, setSnippetSelected] = useState(false);

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
      <ListGroup.Item
        className={
          snippetSelected && snippet && snippetTemplateID === data?.pk
            ? "snippetSelected text-decoration-none"
            : snippet && !snippetSelected && !snippetTemplateID
            ? "snippetHover text-decoration-none"
            : snippet && snippetTemplateID && snippetTemplateID !== data?.pk
            ? "not-selectable text-decoration-none"
            : "text-decoration-none"
        }
        onClick={snippet ? handleSnippetClick : undefined}
        disabled={
          snippet && snippetTemplateID && snippetTemplateID !== data?.pk
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
                    data?.event?.name ? data?.event?.name : ""
                  }'`}</span>
                  <span className="punctuation">, </span>
                </pre>

                <pre className="ms-3 text-wrap" style={{ marginBottom: 0 }}>
                  <span className="keyword">'eventID'</span>
                  <span className="punctuation">{":"} </span>
                  <span className="value">''</span>
                  <span className="punctuation">, </span>
                </pre>

                <pre className="ms-3 text-wrap" style={{ marginBottom: 0 }}>
                  <span className="keyword">'eventCategory'</span>
                  <span className="punctuation">{":"} </span>
                  <span className="value">{`'${
                    data?.eventCategory.length > 0
                      ? data?.eventCategory
                      : formattingVariableWithDollars(
                          data.eventCategoryVariable?.name
                        )
                  }'`}</span>
                  <span className="punctuation">, </span>
                </pre>

                <pre className="ms-3 text-wrap" style={{ marginBottom: 0 }}>
                  <span className="keyword">'eventAction'</span>
                  <span className="punctuation">{":"} </span>
                  <span className="value">{`'${
                    data?.eventAction.length > 0
                      ? data?.eventAction
                      : formattingVariableWithDollars(
                          data.eventActionVariable?.name
                        )
                  }'`}</span>
                  <span className="punctuation">, </span>
                </pre>

                <pre className="ms-3 text-wrap" style={{ marginBottom: 0 }}>
                  <span className="keyword">'eventLabel</span>
                  <span className="punctuation">{":"} </span>
                  <span className="value">{`'${
                    data?.eventLabel.length > 0
                      ? data?.eventLabel
                      : formattingVariableWithDollars(
                          data.eventLabelVariable?.name
                        )
                  }'`}</span>
                  <span className="punctuation">, </span>
                </pre>

                {!!data?.customField &&
                  data?.customField?.edges.length > 0 &&
                  data.node.customField.edges.map((item) => (
                    <pre
                      className="ms-3 text-wrap"
                      style={{ marginBottom: 0 }}
                      key={item.node.pk}
                    >
                      <span className="keyword">{`'${item?.name}'`}</span>
                      <span className="punctuation">{":"} </span>
                      <span className="value">{`'${
                        item?.value.length > 0
                          ? item?.value
                          : item?.valueVariable?.name
                          ? formattingVariableWithDollars(
                              item?.valueVariable?.name
                            )
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
          <p className="fw-bold">{data?.snippetName ?? ""}</p>
        </div>
        {location.pathname === "/dashboard/snippet" && (
          <div className="d-flex justify-content-center">
            <LinkContainer
              to={`${match.path}/ga-snippet/${data?.id}/${data?.pk}/edit`}
            >
              <Button variant="outline-secondary" className="btn-sm">
                <i className="fas fa-edit"></i>
                <span className="ms-1">Edit</span>
              </Button>
            </LinkContainer>
            <Button
              variant="outline-danger"
              className="btn-sm ms-1"
              onClick={() => deleteHandler(data?.pk, data?.snippetName)}
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

export default DashboardSnippet;
