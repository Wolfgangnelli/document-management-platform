import { gql, useMutation } from "@apollo/client";

const createSectionTemplateMutation = gql`
  mutation createSectionTemplateMutation(
    $data_create: SectionTemplateInputType!
  ) {
    createSectionTemplate(input: $data_create) {
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

export function useCreateSectionTemplateMutation(mutationOptions) {
  return useMutation(createSectionTemplateMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          createSectionTemplate: { sectionTemplate },
        },
      }
    ) {
      cache.modify({
        fields: {
          sectionsTemplate(existingSectionsTemplateRefs = {}, { readField }) {
            const newSectionTemplateRef = cache.writeFragment({
              data: sectionTemplate,
              fragment: gql`
                fragment NewSectionTemplate on SectionTemplateNode {
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
              `,
            });
            if (
              existingSectionsTemplateRefs.edges.some(
                (ref) => readField("id", ref) === sectionTemplate.id
              )
            ) {
              return existingSectionsTemplateRefs;
            }
            return [
              ...existingSectionsTemplateRefs.edges,
              newSectionTemplateRef,
            ];
          },
        },
      });
    },
  });
}
