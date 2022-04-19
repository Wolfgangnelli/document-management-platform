import { gql, useMutation } from "@apollo/client";

const updateGaSnippetMutation = gql`
  mutation updateGaSnippet($updateData: GASnippetInputType!) {
    updateGaSnippet(input: $updateData) {
      gaSnippet {
        id
        pk
        eventIdCustom
        eventAction
        section {
          id
        }
        eventActionVariable {
          id
          pk
          name
          gaSnippetVariableValue {
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
        eventCategory
        eventCategoryVariable {
          id
          pk
          name
          gaSnippetVariableValue {
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
        eventLabel
        eventLabelVariable {
          id
          pk
          name
          gaSnippetVariableValue {
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
          category {
            name
          }
          name
        }
        customField {
          edges {
            node {
              id
              pk
              name
              value
              valueVariable {
                id
                pk
                name
                gaSnippetVariableValue {
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
              isDimension
              isMetric
            }
          }
        }
      }
    }
  }
`;

export function useUpdateGaSnippetMutation(mutationOptions) {
  return useMutation(updateGaSnippetMutation, mutationOptions); // fare caching
}

/* update(
    cache,
    {
      data: {
        updateGaSnippet: { gaSnippet },
      },
    }
  ) {
    cache.modify({
      id: cache.identify(gaSnippet.section.id),
      fields: {
        ...gaSnippet,
      },
    });
  },
}); */
