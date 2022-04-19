import { gql, useMutation } from "@apollo/client";

const createGA4EcoSnippetTemplateMutation = gql`
  mutation createGA4EcoSnippetTemplate(
    $ga4_eco_data: GA4EcommerceSnippetTemplateInputType!
  ) {
    createGa4EcoSnippetTemplate(input: $ga4_eco_data) {
      ga4EcommerceSnippetTemplate {
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
`;

export function useCreateGA4EcoSnippetTemplateMutation(mutationOptions) {
  return useMutation(createGA4EcoSnippetTemplateMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          createGa4EcoSnippetTemplate: { ga4EcommerceSnippetTemplate },
        },
      }
    ) {
      cache.modify({
        fields: {
          ga4EcoSnippetsTemplate(
            existingGA4EcoSnippetsTemplateRefs,
            { readField }
          ) {
            const newGA4EcoSnippetTemplate = cache.writeFragment({
              data: ga4EcommerceSnippetTemplate,
              fragment: gql`
                fragment NewGA4EcoSnippetTemplate on GA4EcommerceSnippetTemplateNode {
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
              `,
            });
            if (
              existingGA4EcoSnippetsTemplateRefs.edges.some(
                (ref) => readField("id", ref) === ga4EcommerceSnippetTemplate.id
              )
            ) {
              return existingGA4EcoSnippetsTemplateRefs;
            }
            return [
              ...existingGA4EcoSnippetsTemplateRefs.edges,
              newGA4EcoSnippetTemplate,
            ];
          },
        },
      });
    },
  });
}
