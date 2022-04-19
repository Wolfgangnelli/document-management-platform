import React, { useState, createContext, useEffect } from "react";
import { useLocation, useRouteMatch, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Form,
  Accordion,
  Table,
  Alert,
} from "react-bootstrap";
import Loader from "../../../../components/Loader/index";
import Message from "../../../../components/Message/index";
import { GoBackBtn } from "../../../../components/Buttons/GoBackBtn";
import SidePanel from "../../../../components/SidePanelDashboard/SidePanel";
import { ModalRadioCheckEcoGA4 } from "../../../../components/Modal/ModalRadioCheckEcoGA4/index";
import { InputField } from "../../../../components/Form/InputField/index";
import { useGetEventsQuery } from "../../../../hooks/graphql/queries/useGetEventsQuery/index";
import { useCreateGA4EcoSnippetTemplateMutation } from "../../../../hooks/graphql/mutations/useCreateGA4EcoSnippetTemplateMutation/index";
import { useGetGA4EcoSnippetTemplateQuery } from "../../../../hooks/graphql/queries/useGA4EcoSnippetTemplateQuery/index";
import { useUpdateGA4EcoSnippetTemplateMutation } from "../../../../hooks/graphql/mutations/useUpdateGA4EcoSnippetTemplateMutation/index";

export const ContextGA4EcoSnippet = createContext([]);

const NewGA4EcoSnippet = ({ isSidePanel }) => {
  const [created, setCreated] = useState(false);

  const [clicked, setClicked] = useState("");

  const [event, setEvent] = useState("");

  const [name, setName] = useState("");

  const [show, setShow] = useState(false);

  const [eventNameClicked, setEventNameClicked] = useState("");

  const [itemName, setItemName] = useState("");

  const [itemId, setItemId] = useState("");

  const [price, setPrice] = useState("");

  const [itemBrand, setItemBrand] = useState("");

  const [itemCategory, setItemCategory] = useState("");

  const [itemCategory2, setItemCategory2] = useState("");

  const [itemCategory3, setItemCategory3] = useState("");

  const [itemCategory4, setItemCategory4] = useState("");

  const [itemVariant, setItemVariant] = useState("");

  const [itemListName, setItemListName] = useState("");

  const [itemListId, setItemListId] = useState("");

  const [index, setIndex] = useState("");

  const [quantity, setQuantity] = useState("");

  const [promotionId, setPromotionId] = useState("");

  const [promotionName, setPromotionName] = useState("");

  const [creativeName, setCreativeName] = useState("");

  const [creativeSlot, setCreativeSlot] = useState("");

  const [locationId, setLocationId] = useState("");

  const [affiliation, setAffiliation] = useState("");

  const [coupon, setCoupon] = useState("");

  const [currency, setCurrency] = useState("");

  const [discount, setDiscount] = useState("");

  const [paymentType, setPaymentType] = useState("");

  const [shippingTier, setShippingTier] = useState("");

  const [transactionId, setTransactionId] = useState("");

  const [value, setValue] = useState("");

  const [tax, setTax] = useState("");

  const [shipping, setShipping] = useState("");

  const [customMetric, setCustomMetric] = useState({ key: "", value: "" });

  const [customDimension, setCustomDimension] = useState({
    key: "",
    value: "",
  });

  const [allDimensions, setAllDimensions] = useState([]);

  const [allMetrics, setAllMetrics] = useState([]);

  let location = useLocation();

  let match = useRouteMatch();

  let { snippetID, pk } = useParams();

  const { data } = useGetEventsQuery();

  const [
    createGA4EcoSnippetTemplate,
    { error: errorGA4EcoSnippetTemp, data: dataGA4EcoSnippetTemp },
  ] = useCreateGA4EcoSnippetTemplateMutation();

  const {
    loading: loadingGa4EcoSnipTemp,
    error: errorGa4EcoSnipTemp,
    data: dataGa4EcoSnipTemp,
  } = useGetGA4EcoSnippetTemplateQuery({
    variables: {
      id: snippetID,
    },
    skip: !snippetID,
  });

  const [
    updateGA4EcoSnippetTemplate,
    { error: errorUpdate, data: dataUpdate },
  ] = useUpdateGA4EcoSnippetTemplateMutation();

  const handleSidePanel = (type, status) => {
    setClicked(type);
    if (status === "open" && type === "variable") {
      if (
        !location.pathname.includes("/dashboard/snippet") &&
        match.path !== "/dashboard/snippet/crea-snippet-interazione"
      ) {
        document.querySelectorAll(`.sidepanel`)[0].style.width = "100%";
        document.querySelector(".sheet-overlay-panel").style.opacity = "0.62";
        document.querySelector(".sheet-overlay-panel").style.visibility =
          "visible";
        document.querySelectorAll(`.sidepanel`)[1].style.width = "75vw";
      } else {
        document.querySelectorAll(`.sidepanel`)[0].style.width = "75vw";
      }

      document.querySelector(".sheet-overlay").style.opacity = "0.62";
      document.querySelector(".sheet-overlay").style.visibility = "visible";
    } else {
      if (
        !location.pathname.includes("/dashboard/snippet") &&
        match.path !== "/dashboard/snippet/crea-snippet-interazione"
      ) {
        document.querySelectorAll(`.sidepanel`)[1].style.width = "0";
        document.querySelectorAll(`.sidepanel`)[0].style.width = "75vw";
        document.querySelector(".sheet-overlay-panel").style.opacity = "0";
        document.querySelector(".sheet-overlay-panel").style.visibility =
          "hidden";
      } else {
        document.querySelectorAll(`.sidepanel`)[0].style.width = "0";
        document.querySelectorAll(`.sidepanel`)[0].style.opacity = "1";
        document.querySelector(".sheet-overlay").style.opacity = "0";
        document.querySelector(".sheet-overlay").style.visibility = "hidden";
      }
    }
  };

  const handleModal = (s) => {
    setShow(true);
    setEventNameClicked(s);
  };

  const handleForm = (e) => {
    e.preventDefault();
    let event_obj = data.events.edges.find((obj) => obj?.node?.name === event);
    if (!snippetID) {
      createGA4EcoSnippetTemplate({
        variables: {
          ga4_eco_data: {
            itemName,
            itemId,
            price,
            itemBrand,
            itemCategory,
            itemCategory2,
            itemCategory3,
            itemCategory4,
            itemVariant,
            itemListName,
            itemListId,
            index,
            quantity,
            promotionId,
            promotionName,
            creativeName,
            creativeSlot,
            locationId,
            affiliation,
            coupon,
            currency,
            discount,
            paymentType,
            shippingTier,
            transactionId,
            value,
            tax,
            shipping,
            event: event_obj?.node?.pk,
            snippetName: name,
          },
        },
      });

      setItemName("");
      setItemId("");
      setPrice("");
      setItemBrand("");
      setItemCategory("");
      setItemCategory2("");
      setItemCategory3("");
      setItemCategory4("");
      setItemVariant("");
      setItemListName("");
      setItemListId("");
      setIndex("");
      setQuantity("");
      setPromotionId("");
      setPromotionName("");
      setCreativeName("");
      setCreativeSlot("");
      setLocationId("");
      setAffiliation("");
      setCoupon("");
      setCurrency("");
      setDiscount("");
      setPaymentType("");
      setShippingTier("");
      setTransactionId("");
      setValue("");
      setTax("");
      setShipping("");
      setEvent("");
      setName("");
    } else {
      updateGA4EcoSnippetTemplate({
        variables: {
          data_update: {
            itemName,
            id: pk,
            itemId,
            price,
            itemBrand,
            itemCategory,
            itemCategory2,
            itemCategory3,
            itemCategory4,
            itemVariant,
            itemListName,
            itemListId,
            index,
            quantity,
            promotionId,
            promotionName,
            creativeName,
            creativeSlot,
            locationId,
            affiliation,
            coupon,
            currency,
            discount,
            paymentType,
            shippingTier,
            transactionId,
            value,
            tax,
            shipping,
            event: event_obj?.node?.pk,
            snippetName: name,
          },
        },
      });
    }
    setCreated(true);
    setTimeout(() => {
      setCreated(false);
    }, 3000);
  };

  useEffect(() => {
    if (snippetID && dataGa4EcoSnipTemp) {
      const { ga4EcoSnippetTemplate } = dataGa4EcoSnipTemp;
      setEvent(ga4EcoSnippetTemplate?.event?.name);
      setItemName(ga4EcoSnippetTemplate?.itemName);
      setItemId(ga4EcoSnippetTemplate?.itemId);
      setPrice(ga4EcoSnippetTemplate?.price);
      setItemBrand(ga4EcoSnippetTemplate?.itemBrand);
      setItemCategory(ga4EcoSnippetTemplate?.itemCategory);
      setItemCategory2(ga4EcoSnippetTemplate?.itemCategory2);
      setItemCategory3(ga4EcoSnippetTemplate?.itemCategory3);
      setItemCategory4(ga4EcoSnippetTemplate?.itemCategory4);
      setItemVariant(ga4EcoSnippetTemplate?.itemVariant);
      setItemListName(ga4EcoSnippetTemplate?.itemListName);
      setItemListId(ga4EcoSnippetTemplate?.itemListId);
      setIndex(ga4EcoSnippetTemplate?.index);
      setQuantity(ga4EcoSnippetTemplate?.quantity);
      setPromotionId(ga4EcoSnippetTemplate?.promotionId);
      setPromotionName(ga4EcoSnippetTemplate?.promotionName);
      setCreativeName(ga4EcoSnippetTemplate?.creativeName);
      setCreativeSlot(ga4EcoSnippetTemplate?.creativeSlot);
      setLocationId(ga4EcoSnippetTemplate?.locationId);
      setAffiliation(ga4EcoSnippetTemplate?.affiliation);
      setCoupon(ga4EcoSnippetTemplate?.coupon);
      setCurrency(ga4EcoSnippetTemplate?.currency);
      setDiscount(ga4EcoSnippetTemplate?.discount);
      setPaymentType(ga4EcoSnippetTemplate?.paymentType);
      setShippingTier(ga4EcoSnippetTemplate?.shippingTier);
      setTransactionId(ga4EcoSnippetTemplate?.transactionId);
      setValue(ga4EcoSnippetTemplate?.value);
      setTax(ga4EcoSnippetTemplate?.tax);
      setShipping(ga4EcoSnippetTemplate?.shipping);
      setName(ga4EcoSnippetTemplate?.snippetName);
    }
  }, [dataGa4EcoSnipTemp, snippetID]);

  return (
    <ContextGA4EcoSnippet.Provider
      value={[
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
      ]}
    >
      {loadingGa4EcoSnipTemp && <Loader />}
      <SidePanel handleSidePanel={handleSidePanel} clicked={clicked} />
      <Row>
        {location.pathname !== "/dashboard/interaction/crea-interazione" &&
          !isSidePanel && <GoBackBtn />}
        <ModalRadioCheckEcoGA4
          show={show}
          onHide={setShow}
          eventName={eventNameClicked}
        />
        <Col>
          <h1 className="text-center">
            {!snippetID ? "Crea GA4" : "Update"}{" "}
            <span style={{ color: "red" }}>
              {dataGa4EcoSnipTemp?.ga4EcoSnippetTemplate?.snippetName}
            </span>{" "}
            Ecommerce Snippet
          </h1>
        </Col>
        {created && (errorGa4EcoSnipTemp || errorUpdate) && (
          <Message variant="danger">
            {errorGa4EcoSnipTemp?.message ?? errorUpdate?.message}
          </Message>
        )}
        {created && dataUpdate && (
          <Message variant="success">
            GA4 Ecommerce Snippet updated correctly!
          </Message>
        )}
        <Row>
          <Col lg={5} className="d-flex justify-content-start">
            <Button
              variant="secondary"
              className="fw-bold btn-outline-secondary"
              onClick={() => handleSidePanel("variable", "open")}
            >
              CREATE VARIABLE
            </Button>
          </Col>
        </Row>
        <Row>
          <Form onSubmit={handleForm}>
            <Row>
              {(dataGA4EcoSnippetTemp || errorGA4EcoSnippetTemp) && created && (
                <Alert variant="info">
                  {errorGA4EcoSnippetTemp
                    ? `Error: ${errorGA4EcoSnippetTemp?.message}`
                    : "GA4 Ecommerce Snippet Template creato!"}
                </Alert>
              )}
            </Row>
            <Row>
              <Col className="d-flex justify-content-end" lg={11}>
                <Button variant="success" type="submit" className="fw-bolder">
                  SAVE
                </Button>
              </Col>
            </Row>
            <Row>
              <Col lg={5}>
                <Form.Group className="mb-3" controlId="eventName">
                  <Form.Label>Event: </Form.Label>
                  <Form.Select
                    aria-label="Event name"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                    required
                  >
                    <option value=""></option>
                    {data?.events &&
                      data?.events?.edges.map((item) => (
                        <option key={item.node.pk} value={item.node.name}>
                          {item.node.name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={5}>
                <Form.Group className="mb-3" controlId="snippet name">
                  <Form.Label>Snippet name: </Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Tip. Metti stesso nome dell'interazione. Es. Ricerca nel
                    sito
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <InputField
                fieldName="itemName"
                fieldValue={itemName}
                setField={setItemName}
                labelName="Item name: "
                handleModal={handleModal}
              />
              <InputField
                fieldName="itemId"
                fieldValue={itemId}
                setField={setItemId}
                labelName="Item id: "
                handleModal={handleModal}
              />
            </Row>
            <Row>
              <InputField
                fieldName="price"
                fieldValue={price}
                setField={setPrice}
                labelName="Price: "
                handleModal={handleModal}
              />
              <InputField
                fieldName="itemBrand"
                fieldValue={itemBrand}
                setField={setItemBrand}
                labelName="Item brand: "
                handleModal={handleModal}
              />
            </Row>
            <Row>
              <InputField
                fieldName="itemCategory"
                fieldValue={itemCategory}
                setField={setItemCategory}
                labelName="Item category: "
                handleModal={handleModal}
              />
              <InputField
                fieldName="itemCategory2"
                fieldValue={itemCategory2}
                setField={setItemCategory2}
                labelName="Item category 2: "
                handleModal={handleModal}
              />
            </Row>
            <Row>
              <InputField
                fieldName="itemCategory3"
                fieldValue={itemCategory3}
                setField={setItemCategory3}
                labelName="Item category 3: "
                handleModal={handleModal}
              />
              <InputField
                fieldName="itemCategory4"
                fieldValue={itemCategory4}
                setField={setItemCategory4}
                labelName="Item category 4: "
                handleModal={handleModal}
              />
            </Row>
            <Row>
              <InputField
                fieldName="itemVariant"
                fieldValue={itemVariant}
                setField={setItemVariant}
                labelName="Item variant: "
                handleModal={handleModal}
              />
              <InputField
                fieldName="itemListName"
                fieldValue={itemListName}
                setField={setItemListName}
                labelName="Item list name: "
                handleModal={handleModal}
              />
            </Row>
            <Row>
              <InputField
                fieldName="itemListId"
                fieldValue={itemListId}
                setField={setItemListId}
                labelName="Item list id: "
                handleModal={handleModal}
              />
              <InputField
                fieldName="index"
                fieldValue={index}
                setField={setIndex}
                labelName="Index: "
                handleModal={handleModal}
              />
            </Row>
            <Row>
              <InputField
                fieldName="quantity"
                fieldValue={quantity}
                setField={setQuantity}
                labelName="Quantity: "
                handleModal={handleModal}
              />
              <InputField
                fieldName="promotionId"
                fieldValue={promotionId}
                setField={setPromotionId}
                labelName="Promotion id: "
                handleModal={handleModal}
              />
            </Row>
            <Row>
              <InputField
                fieldName="promotionName"
                fieldValue={promotionName}
                setField={setPromotionName}
                labelName="Promotion name: "
                handleModal={handleModal}
              />
              <InputField
                fieldName="creativeName"
                fieldValue={creativeName}
                setField={setCreativeName}
                labelName="Creative name: "
                handleModal={handleModal}
              />
            </Row>
            <Row>
              <InputField
                fieldName="creativeSlot"
                fieldValue={creativeSlot}
                setField={setCreativeSlot}
                labelName="Creative slot: "
                handleModal={handleModal}
              />
              <InputField
                fieldName="locationId"
                fieldValue={locationId}
                setField={setLocationId}
                labelName="Location id: "
                handleModal={handleModal}
              />
            </Row>
            <Row>
              <InputField
                fieldName="affiliation"
                fieldValue={affiliation}
                setField={setAffiliation}
                labelName="Affiliation: "
                handleModal={handleModal}
              />
              <InputField
                fieldName="coupon"
                fieldValue={coupon}
                setField={setCoupon}
                labelName="Coupon: "
                handleModal={handleModal}
              />
            </Row>
            <Row>
              <InputField
                fieldName="currency"
                fieldValue={currency}
                setField={setCurrency}
                labelName="Currency: "
                handleModal={handleModal}
              />
              <InputField
                fieldName="discount"
                fieldValue={discount}
                setField={setDiscount}
                labelName="Discount: "
                handleModal={handleModal}
              />
            </Row>
            <Row>
              <InputField
                fieldName="paymentType"
                fieldValue={paymentType}
                setField={setPaymentType}
                labelName="Payment type: "
                handleModal={handleModal}
              />
              <InputField
                fieldName="shippingTier"
                fieldValue={shippingTier}
                setField={setShippingTier}
                labelName="Shipping tier: "
                handleModal={handleModal}
              />
            </Row>
            <Row>
              <InputField
                fieldName="transactionId"
                fieldValue={transactionId}
                setField={setTransactionId}
                labelName="Transaction id: "
                handleModal={handleModal}
              />
              <InputField
                fieldName="value"
                fieldValue={value}
                setField={setValue}
                labelName="Value: "
                handleModal={handleModal}
              />
            </Row>
            <Row>
              <InputField
                fieldName="tax"
                fieldValue={tax}
                setField={setTax}
                labelName="Tax: "
                handleModal={handleModal}
              />
              <InputField
                fieldName="shipping"
                fieldValue={shipping}
                setField={setShipping}
                labelName="Shipping: "
                handleModal={handleModal}
              />
            </Row>
            {!location.pathname.includes("/dashboard") && (
              <Row>
                <Col>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header style={{ paddingTop: 0 }}>
                        Custom Dimensions
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col lg={5}>
                            <Form.Group className="mb-3" controlId="name">
                              <Form.Label>name: </Form.Label>
                              <div className="d-flex">
                                <Form.Control
                                  type="text"
                                  placeholder="Enter name"
                                  value={customDimension.key}
                                  onChange={(e) =>
                                    setCustomDimension((prev) => ({
                                      ...prev,
                                      key: e.target.value,
                                    }))
                                  }
                                />
                                <Button
                                  title="variables"
                                  onClick={() =>
                                    handleModal("eco_dimension_name")
                                  }
                                >
                                  <i className="fas fa-code"></i>
                                </Button>
                              </div>
                              <Form.Text className="text-muted">
                                Scrivi o scegli una variabile
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Col lg={5}>
                            <Form.Group className="mb-3" controlId="value">
                              <Form.Label>value: </Form.Label>
                              <div className="d-flex">
                                <Form.Control
                                  type="text"
                                  placeholder="Enter value"
                                  value={customDimension.value}
                                  onChange={(e) =>
                                    setCustomDimension((prev) => ({
                                      ...prev,
                                      value: e.target.value,
                                    }))
                                  }
                                />
                                <Button
                                  title="variables"
                                  onClick={() =>
                                    handleModal("eco_dimension_value")
                                  }
                                >
                                  <i className="fas fa-code"></i>
                                </Button>
                              </div>
                              <Form.Text className="text-muted">
                                Scrivi o scegli una variabile
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Col
                            lg={2}
                            className="d-flex align-items-center justify-content-evenly mb-2"
                          >
                            <Button
                              variant="success"
                              onClick={() =>
                                setAllDimensions((prev) => [
                                  ...prev,
                                  {
                                    key: customDimension.key,
                                    value: customDimension.value,
                                  },
                                ])
                              }
                            >
                              <i className="fas fa-save"></i>
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={8}>
                            <Table striped bordered hover responsive size="sm">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Name</th>
                                  <th>Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {allDimensions.map((dim, idx) => (
                                  <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{dim.key}</td>
                                    <td>{dim.value}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header style={{ paddingTop: 0 }}>
                        Custom Metrics
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col lg={5}>
                            <Form.Group className="mb-3" controlId="name">
                              <Form.Label>name: </Form.Label>
                              <div className="d-flex">
                                <Form.Control
                                  type="text"
                                  placeholder="Enter name"
                                  value={customMetric.key}
                                  onChange={(e) =>
                                    setCustomMetric((prev) => ({
                                      ...prev,
                                      key: e.target.value,
                                    }))
                                  }
                                />
                                <Button
                                  title="variables"
                                  onClick={() => handleModal("eco_metric_name")}
                                >
                                  <i className="fas fa-code"></i>
                                </Button>
                              </div>
                              <Form.Text className="text-muted">
                                Scrivi o scegli una variabile
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Col lg={5}>
                            <Form.Group className="mb-3" controlId="value">
                              <Form.Label>value: </Form.Label>
                              <div className="d-flex">
                                <Form.Control
                                  type="text"
                                  placeholder="Enter value"
                                  value={customMetric.value}
                                  onChange={(e) =>
                                    setCustomMetric((prev) => ({
                                      ...prev,
                                      value: e.target.value,
                                    }))
                                  }
                                />
                                <Button
                                  title="variables"
                                  onClick={() =>
                                    handleModal("eco_metric_value")
                                  }
                                >
                                  <i className="fas fa-code"></i>
                                </Button>
                              </div>
                              <Form.Text className="text-muted">
                                Scrivi o scegli una variabile
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Col
                            lg={2}
                            className="d-flex align-items-center justify-content-end mb-2"
                          >
                            <Button
                              variant="success"
                              onClick={() =>
                                setAllMetrics((prev) => [
                                  ...prev,
                                  {
                                    key: customMetric.key,
                                    value: customMetric.value,
                                  },
                                ])
                              }
                            >
                              <i className="fas fa-save"></i>
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={8}>
                            <Table striped bordered hover responsive size="sm">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Name</th>
                                  <th>Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {allMetrics.map((dim, idx) => (
                                  <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{dim.key}</td>
                                    <td>{dim.value}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
              </Row>
            )}
          </Form>
        </Row>
      </Row>
    </ContextGA4EcoSnippet.Provider>
  );
};

export default NewGA4EcoSnippet;
