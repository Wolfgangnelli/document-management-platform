import { gql, useQuery } from "@apollo/client";

const getGA4EcoSnippetsTemplateQuery = gql`
  query getGA4EcoSnippetsTemplate {
    ga4EcoSnippetsTemplate {
      edges {
        node {
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
    }
  }
`;

export function useGetGA4EcoSnippetsTemplateQuery(queryOptions) {
  return useQuery(getGA4EcoSnippetsTemplateQuery, queryOptions);
}
