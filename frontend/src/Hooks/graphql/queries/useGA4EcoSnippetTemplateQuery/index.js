import { gql, useQuery } from "@apollo/client";

const getGa4EcoSnippetTemplateQuery = gql`
  query getGa4EcoSnippetTemplate($id: ID!) {
    ga4EcoSnippetTemplate(id: $id) {
      created
      modified
      id
      pk
      itemName
      itemId
      price
      itemBrand
      itemCategory
      itemCategory2
      itemCategory3
      itemCategory4
      itemVariant
      itemListName
      itemListId
      index
      quantity
      promotionId
      promotionName
      creativeName
      creativeSlot
      locationId
      affiliation
      coupon
      currency
      discount
      paymentType
      shippingTier
      transactionId
      value
      tax
      shipping
      event {
        id
        pk
        name
      }
      snippetName
    }
  }
`;

export function useGetGA4EcoSnippetTemplateQuery(queryOptions) {
  return useQuery(getGa4EcoSnippetTemplateQuery, queryOptions);
}
