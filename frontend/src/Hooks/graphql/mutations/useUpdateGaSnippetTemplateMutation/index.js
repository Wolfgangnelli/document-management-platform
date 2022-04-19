import { gql, useMutation } from "@apollo/client";

const updateGaSnippetTemplateMutation = gql`
  mutation updateGaSnippetTemplate($data_update: GASnippetTemplateInputType!) {
    updateGaSnippetTemplate(input: $data_update) {
      snippetTemplate {
        id
        eventCategory
        eventAction
        eventLabel
        snippetName
        pk
        event {
          name
          id
          pk
        }
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
      }
    }
  }
`;

export function useUpdateGaSnippetTemplateMutation(mutationOptions) {
  return useMutation(updateGaSnippetTemplateMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          updateGaSnippetTemplate: { snippetTemplate },
        },
      }
    ) {
      cache.modify({
        id: cache.identify({
          __ref: `GASnippetTemplateNode:${snippetTemplate.id}`,
        }),
        fields: {
          gaSnippetTemplate() {
            return snippetTemplate;
          },
          /*           snippetName(cacheName) {
            return cacheName === snippetTemplate.snippetName
              ? cacheName
              : snippetTemplate.snippetName;
          },
          eventCategory(cacheCategory) {
            return cacheCategory === snippetTemplate.eventCategory
              ? cacheCategory
              : snippetTemplate.eventCategory;
          },
          eventAction(cacheAction) {
            return cacheAction === snippetTemplate.eventAction
              ? cacheAction
              : snippetTemplate.eventAction;
          },
          eventLabel(cacheLabel) {
            return cacheLabel === snippetTemplate.eventLabel
              ? cacheLabel
              : snippetTemplate.eventLabel;
          },
          event(cacheEvent) {
            return cacheEvent.name === snippetTemplate.event.name
              ? cacheEvent.name
              : snippetTemplate.event.name;
          }, */
        },
      });
    },
  });
}
