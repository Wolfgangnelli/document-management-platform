import React from "react";
import { GA4EcoSnippetField } from "../GA4EcoSnippetField/index";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation, useRouteMatch } from "react-router-dom";
import { useDeleteGA4EcoSnippetTemplateMutation } from "../../../hooks/graphql/mutations/useDeleteGA4EcoSnippetTemplateMutation/index";

//MEMO: DEVO MOSTRARE MESSAGGIO DI AVVENUTA ELIMINAZIONE O DELL'ERRORE

const EcommerceSnippetGA4 = ({ data }) => {
  let location = useLocation();
  let match = useRouteMatch();
  const [
    deleteGA4EcoSnippetTemplate,
    { loading: loadingDelete, error: errorDelete, data: dataDelete },
  ] = useDeleteGA4EcoSnippetTemplateMutation();
  const deleteHandler = (id, snippet_name) => {
    if (
      window.confirm(
        `Sei sicuro di voler eliminare lo snippet ${snippet_name}?`
      )
    ) {
      deleteGA4EcoSnippetTemplate({
        variables: {
          delete_id: id,
        },
      });
    }
  };
  return (
    <div className="mb-5">
      <div className="snippet-highlight">
        <pre className="snippet-code-jsx">
          <code>
            <pre style={{ marginBottom: 0 }} className="text-wrap">
              <span className="punctuation">dataLayer.push</span>
              <span className="punctuation">{"({"}</span>
              <pre className="ms-1 text-wrap" style={{ marginBottom: 0 }}>
                <span className="keyword">{`'event'`}</span>
                <span className="punctuation">{":"} </span>
                <span className="value">{`'${data?.node?.event?.name}'`}</span>
                <span className="punctuation">, </span>
              </pre>
              <pre style={{ marginBottom: 0 }} className="text-wrap ms-1">
                <span className="keyword">{`${"'ecommerce'"}`}</span>
                <span className="punctuation">{": {"}</span>
              </pre>
              {data?.node?.transactionId && (
                <pre className="ms-2 text-wrap" style={{ marginBottom: 0 }}>
                  <span className="keyword">{`'transaction_id'`}</span>
                  <span className="punctuation">{":"} </span>
                  <span className="value">{`'${data?.node?.transactionId}'`}</span>
                  <span className="punctuation">, </span>
                </pre>
              )}
              {data?.node?.affiliation && (
                <pre className="ms-2 text-wrap" style={{ marginBottom: 0 }}>
                  <span className="keyword">{`'affiliation'`}</span>
                  <span className="punctuation">{":"} </span>
                  <span className="value">{`'${data?.node?.affiliation}'`}</span>
                  <span className="punctuation">, </span>
                </pre>
              )}
              {data?.node?.tax && data?.node?.tax > 0 && (
                <pre className="ms-2 text-wrap" style={{ marginBottom: 0 }}>
                  <span className="keyword">{`'tax'`}</span>
                  <span className="punctuation">{":"} </span>
                  <span className="value">{`'${data?.node?.tax}'`}</span>
                  <span className="punctuation">, </span>
                </pre>
              )}
              {data?.node?.shipping && (
                <pre className="ms-2 text-wrap" style={{ marginBottom: 0 }}>
                  <span className="keyword">{`'shipping'`}</span>
                  <span className="punctuation">{":"} </span>
                  <span className="value">{`'${data?.node?.shipping}'`}</span>
                  <span className="punctuation">, </span>
                </pre>
              )}
              {data?.node?.currencyCode && (
                <pre className="ms-2 text-wrap" style={{ marginBottom: 0 }}>
                  <span className="keyword">{`'currency'`}</span>
                  <span className="punctuation">{":"} </span>
                  <span className="value">{`'${data?.node?.currencyCode}'`}</span>
                  <span className="punctuation">, </span>
                </pre>
              )}
              {data?.node?.value && (
                <pre className="ms-2 text-wrap" style={{ marginBottom: 0 }}>
                  <span className="keyword">{`'value'`}</span>
                  <span className="punctuation">{":"} </span>
                  <span className="value">{`'${data?.node?.value}'`}</span>
                  <span className="punctuation">, </span>
                </pre>
              )}
              {data?.node?.coupon && (
                <pre className="ms-2 text-wrap" style={{ marginBottom: 0 }}>
                  <span className="keyword">{`'coupon'`}</span>
                  <span className="punctuation">{":"} </span>
                  <span className="value">{`'${data?.node?.coupon}'`}</span>
                  <span className="punctuation">, </span>
                </pre>
              )}
              {data?.node?.paymentType && (
                <pre className="ms-2 text-wrap" style={{ marginBottom: 0 }}>
                  <span className="keyword">{`'payment_type'`}</span>
                  <span className="punctuation">{":"} </span>
                  <span className="value">{`'${data?.node?.paymentType}'`}</span>
                  <span className="punctuation">, </span>
                </pre>
              )}
              {data?.node?.shippingTier && (
                <pre className="ms-2 text-wrap" style={{ marginBottom: 0 }}>
                  <span className="keyword">{`'shipping_tier'`}</span>
                  <span className="punctuation">{":"} </span>
                  <span className="value">{`'${data?.node?.shippingTier}'`}</span>
                  <span className="punctuation">, </span>
                </pre>
              )}
              <pre style={{ marginBottom: 0 }} className="text-wrap ms-2">
                <span className="keyword">{`${"'items'"}`}</span>
                <span className="punctuation">{": [{"}</span>
              </pre>
              {data?.node?.itemName && (
                <GA4EcoSnippetField
                  key_field="item_name"
                  value_field={data?.node?.itemName}
                  is_item={true}
                />
              )}
              {data?.node?.itemId && (
                <GA4EcoSnippetField
                  key_field="item_id"
                  value_field={data?.node?.itemId}
                  is_item={true}
                />
              )}
              {data?.node?.affiliation && (
                <GA4EcoSnippetField
                  key_field="affiliation"
                  value_field={data?.node?.affiliation}
                  is_item={true}
                />
              )}
              {data?.node?.coupon && (
                <GA4EcoSnippetField
                  key_field="coupon"
                  value_field={data?.node?.coupon}
                  is_item={true}
                />
              )}
              {data?.node?.currency && (
                <GA4EcoSnippetField
                  key_field="currency"
                  value_field={data?.node?.currency}
                  is_item={true}
                />
              )}
              {data?.node?.discount && (
                <GA4EcoSnippetField
                  key_field="discount"
                  value_field={data?.node?.discount}
                  is_item={true}
                />
              )}
              {data?.node?.price && (
                <GA4EcoSnippetField
                  key_field="price"
                  value_field={data?.node?.price}
                  is_item={true}
                />
              )}
              {data?.node?.itemBrand && (
                <GA4EcoSnippetField
                  key_field="item_brand"
                  value_field={data?.node?.itemBrand}
                  is_item={true}
                />
              )}
              {data?.node?.itemCategory && (
                <GA4EcoSnippetField
                  key_field="item_category"
                  value_field={data?.node?.itemCategory}
                  is_item={true}
                />
              )}
              {data?.node?.itemCategory2 && (
                <GA4EcoSnippetField
                  key_field="item_category2"
                  value_field={data?.node?.itemCategory2}
                  is_item={true}
                />
              )}
              {data?.node?.itemCategory3 && (
                <GA4EcoSnippetField
                  key_field="item_category3"
                  value_field={data?.node?.itemCategory3}
                  is_item={true}
                />
              )}
              {data?.node?.itemCategory4 && (
                <GA4EcoSnippetField
                  key_field="item_category4"
                  value_field={data?.node?.itemCategory4}
                  is_item={true}
                />
              )}
              {data?.node?.itemVariant && (
                <GA4EcoSnippetField
                  key_field="item_variant"
                  value_field={data?.node?.itemVariant}
                  is_item={true}
                />
              )}
              {data?.node?.itemListName && (
                <GA4EcoSnippetField
                  key_field="item_list_name"
                  value_field={data?.node?.itemListName}
                  is_item={true}
                />
              )}
              {data?.node?.itemListId && (
                <GA4EcoSnippetField
                  key_field="item_list_id"
                  value_field={data?.node?.itemListId}
                  is_item={true}
                />
              )}
              {data?.node?.index && (
                <GA4EcoSnippetField
                  key_field="index"
                  value_field={data?.node?.index}
                  is_item={true}
                />
              )}
              {data?.node?.quantity && (
                <GA4EcoSnippetField
                  key_field="quantity"
                  value_field={data?.node?.quantity}
                  is_item={true}
                />
              )}
              {data?.node?.promotionId && (
                <GA4EcoSnippetField
                  key_field="promotion_id"
                  value_field={data?.node?.promotionId}
                  is_item={true}
                />
              )}
              {data?.node?.promotionName && (
                <GA4EcoSnippetField
                  key_field="promotion_name"
                  value_field={data?.node?.promotionName}
                  is_item={true}
                />
              )}
              {data?.node?.creativeName && (
                <GA4EcoSnippetField
                  key_field="creative_name"
                  value_field={data?.node?.creativeName}
                  is_item={true}
                />
              )}
              {data?.node?.creativeSlot && (
                <GA4EcoSnippetField
                  key_field="creative_slot"
                  value_field={data?.node?.creativeSlot}
                  is_item={true}
                />
              )}
              {data?.node?.locationId && (
                <GA4EcoSnippetField
                  key_field="location_id"
                  value_field={data?.node?.locationId}
                  is_item={true}
                />
              )}
            </pre>
            <pre>
              <span className="punctuation ms-2">{"}]"}</span>
            </pre>
            <pre>
              <span className="punctuation ms-1">{"}"}</span>
            </pre>
            <pre>
              <span className="punctuation">{"});"}</span>
            </pre>
          </code>
        </pre>
      </div>

      <div className="d-flex flex-column">
        <div>
          <p className="fw-bold">
            {data?.node?.snippetName ? data?.node?.snippetName : ""}
          </p>
        </div>
        {location.pathname === "/dashboard/snippet" && (
          <div className="d-flex justify-content-center">
            <LinkContainer
              to={`${match.path}/ga4-eco-snippet-template/${data?.node?.id}/${data?.node?.pk}/edit`}
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

export default EcommerceSnippetGA4;
