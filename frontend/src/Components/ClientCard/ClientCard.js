import React from "react";
import { Card, Button } from "react-bootstrap";
import "./_clientCard.scss";

//https://picsum.photos/286/180

const ClientCard = ({ client, doc }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={client?.node?.image?.url}
        alt={client?.node?.image?.name}
        style={{ maxHeight: "203px" }}
      />
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title className="text-center">{doc?.title}</Card.Title>
        <Card.Text className="text-date">
          {doc?.modified.substring(0, 10) ?? doc?.created.substring(0, 10)}
        </Card.Text>
        <Button variant="primary">View Doc</Button>
      </Card.Body>
    </Card>
  );
};

export default ClientCard;
