import React from "react";
import data from "../../../json/Ecommerce.json";
import EcommerceCard from "../../../components/Cards/Ecommerce/EcommerceCard";
import AnchorLinks from "../../../components/AnchorLinks/AnchorLinks";
import { Hr } from "../../../components/Hr/index";

const ECommerce = () => {
  const arrayTitle = data.eCommerce.map((el) => el.title);
  return (
    <article>
      <header>
        <h1>E-Commerce</h1>
      </header>
      <AnchorLinks anchor_links={arrayTitle} />
      <Hr />
      <EcommerceCard jsonData={data} />
    </article>
  );
};

export default ECommerce;
