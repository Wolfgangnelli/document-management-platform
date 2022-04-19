import { gql, useMutation } from "@apollo/client";

const updateGA4EcoSnippetTemplateMutation = gql`
  mutation updateGA4EcoSnippetTemplate(
    $data_update: GA4EcommerceSnippetTemplateInputType!
  ) {
    updateGa4EcoSnippetTemplate(input: $data_update) {
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

export function useUpdateGA4EcoSnippetTemplateMutation(mutationOptions) {
  return useMutation(updateGA4EcoSnippetTemplateMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          updateGa4EcoSnippetTemplate: { ga4EcommerceSnippetTemplate },
        },
      }
    ) {
      cache.modify({
        id: cache.identify(ga4EcommerceSnippetTemplate.id),
        fields: {
          ...ga4EcommerceSnippetTemplate,
        },
      });
    },
  });
}
