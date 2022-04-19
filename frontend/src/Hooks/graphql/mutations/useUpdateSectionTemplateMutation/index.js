import { gql, useMutation } from "@apollo/client";

const updateSectionTemplateMutation = gql`
  mutation updateSectionTemplateMutation(
    $update_data: SectionTemplateInputType!
  ) {
    updateSectionTemplate(input: $update_data) {
      sectionTemplate {
        id
        pk
        title
        action
        note
        priority
        category
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
          event {
            name
            category {
              name
            }
          }
        }
        gaSnippetTemplate {
          id
          pk
          eventCategory
          eventAction
          eventLabel
          event {
            id
            pk
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
`;

export function useUpdateSectionTemplateMutation(mutationOptions) {
  return useMutation(updateSectionTemplateMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          updateSectionTemplate: { sectionTemplate },
        },
      }
    ) {
      cache.modify({
        id: cache.identify(sectionTemplate.id),
        fields: {
          ...sectionTemplate,
        },
      });
    },
  });
}
