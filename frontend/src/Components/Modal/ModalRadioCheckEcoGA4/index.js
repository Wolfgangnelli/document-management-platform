import React, { useState, useEffect, useContext } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { ContextGA4EcoSnippet } from "../../../Pages/Dashboard/SnippetTemplate/NewGA4EcoSnippetTemplate/index";
import { useListVariablesQuery } from "../../../hooks/graphql/queries/useGetVariablesQuery/index";
import Loader from "../../../components/Loader/index";

export const ModalRadioCheckEcoGA4 = (props) => {
  const [checked, setChecked] = useState("");
  const [
    setCustomDimension,
    setCustomMetric,
    setItemName,
    setItemId,
    setPrice,
    setItemBrand,
    setItemCategory,
    setItemCategory2,
    setItemCategory3,
    setItemCategory4,
    setItemVariant,
    setItemListId,
    setItemListName,
    setIndex,
    setQuantity,
    setPromotionId,
    setPromotionName,
    setCreativeName,
    setCreativeSlot,
    setLocationId,
    setAffiliation,
    setCoupon,
    setCurrency,
    setDiscount,
    setPaymentType,
    setShippingTier,
    setTransactionId,
    setValue,
    setTax,
    setShipping,
  ] = useContext(ContextGA4EcoSnippet);
  const { loading, data } = useListVariablesQuery();

  const formattingVariable = (var_name) => {
    return `$$$${var_name}$$$`;
  };

  const handleChecked = (id, name) => {
    if (checked.length > 0) {
      setChecked("");
    } else {
      setChecked(id);
      switch (props.eventName.fieldName) {
        case "dimension_name":
          setCustomDimension((prev) => ({ ...prev, key: name }));
          break;
        case "dimension_value":
          setCustomDimension((prev) => ({ ...prev, value: name }));
          break;
        case "metric_name":
          setCustomMetric((prev) => ({ ...prev, key: name }));
          break;
        case "metric_value":
          setCustomMetric((prev) => ({ ...prev, value: name }));
          break;
        case "itemName":
          setItemName(formattingVariable(name));
          break;
        case "itemId":
          setItemId(formattingVariable(name));
          break;
        case "price":
          setPrice(formattingVariable(name));
          break;
        case "itemBrand":
          setItemBrand(formattingVariable(name));
          break;
        case "itemCategory":
          setItemCategory(formattingVariable(name));
          break;
        case "itemCategory2":
          setItemCategory2(formattingVariable(name));
          break;
        case "itemCategory3":
          setItemCategory3(formattingVariable(name));
          break;
        case "itemCategory4":
          setItemCategory4(formattingVariable(name));
          break;
        case "itemVariant":
          setItemVariant(formattingVariable(name));
          break;
        case "itemListName":
          setItemListName(formattingVariable(name));
          break;
        case "itemListId":
          setItemListId(formattingVariable(name));
          break;
        case "index":
          setIndex(formattingVariable(name));
          break;
        case "quantity":
          setQuantity(formattingVariable(name));
          break;
        case "promotionId":
          setPromotionId(formattingVariable(name));
          break;
        case "promotionName":
          setPromotionName(formattingVariable(name));
          break;
        case "creativeName":
          setCreativeName(formattingVariable(name));
          break;
        case "creativeSlot":
          setCreativeSlot(formattingVariable(name));
          break;
        case "locationId":
          setLocationId(formattingVariable(name));
          break;
        case "affiliation":
          setAffiliation(formattingVariable(name));
          break;
        case "coupon":
          setCoupon(formattingVariable(name));
          break;
        case "currency":
          setCurrency(formattingVariable(name));
          break;
        case "discount":
          setDiscount(formattingVariable(name));
          break;
        case "paymentType":
          setPaymentType(formattingVariable(name));
          break;
        case "shippingTier":
          setShippingTier(formattingVariable(name));
          break;
        case "transactionId":
          setTransactionId(formattingVariable(name));
          break;
        case "value":
          setValue(formattingVariable(name));
          break;
        case "tax":
          setTax(formattingVariable(name));
          break;
        case "shipping":
          setShipping(formattingVariable(name));
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    return () => setChecked("");
  }, [props.show]);

  return (
    <Modal show={props.show} fullscreen="true" onHide={props.onHide}>
      {loading && <Loader />}
      {data && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Choose variable</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {data?.variables?.edges.map((item) => (
              <Form.Check
                key={item.node.id}
                disabled={
                  checked.length <= 0
                    ? false
                    : checked === item.node.id
                    ? false
                    : true
                }
                type="checkbox"
                id={item.node.id}
                label={item.node.name}
                onClick={() => handleChecked(item.node.id, item.node.name)}
              />
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button type="primary" onClick={() => props.onHide(false)}>
              SAVE
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};
