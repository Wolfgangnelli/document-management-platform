import { gql, useQuery } from "@apollo/client";

export const getSectionsTemplateQuery = gql`
  query getSectionsTemplate {
    sectionsTemplate {
      edges {
        node {
          id
          pk
          title
          action
          note
          priority
          category
          gaSnippetTemplate {
            id
            pk
            eventCategory
            eventAction
            eventLabel
            eventCategoryVariable {
              id
              pk
              name
              variableValue {
                edges {
                  node {
                    id
                    pk
                    name
                    condition
                  }
                }
              }
            }
            eventActionVariable {
              id
              pk
              name
              variableValue {
                edges {
                  node {
                    id
                    pk
                    name
                    condition
                  }
                }
              }
            }
            eventLabelVariable {
              id
              pk
              name
              variableValue {
                edges {
                  node {
                    id
                    pk
                    name
                    condition
                  }
                }
              }
            }
            event {
              id
              pk
              name
              category {
                name
              }
            }
          }
          ecoSnippetTemplate {
            id
            pk
            name
            currencyCode
            itemId
            price
            brand
            category
            variant
            list
            position
            quantity
            creative
            affiliation
            revenue
            event {
              name
              category {
                name
              }
            }
          }
          ga4EcoSnippetTemplate {
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
              name
              id
              pk
            }
            snippetName
          }
        }
      }
    }
  }
`;

export function useGetSectionsTemplateQuery(queryOptions) {
  return useQuery(getSectionsTemplateQuery, queryOptions);
}
