import { gql, useMutation } from "@apollo/client";

const createGaSnippetMutation = gql`
  mutation createGaSnippet($gaSnippetData: GASnippetInputType!) {
    createGaSnippet(input: $gaSnippetData) {
      gaSnippet {
        id
        pk
        eventIdCustom
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
        eventAction
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
        snippetName
        datalayer {
          id
          pk
        }
        event {
          id
          pk
          name
        }
        customField {
          edges {
            node {
              id
              pk
              name
              value
              isDimension
              isMetric
            }
          }
        }
      }
    }
  }
`;

export function useCreateGaSnippetMutation(mutationOptions) {
  return useMutation(createGaSnippetMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          createGaSnippet: { gaSnippet },
        },
      }
    ) {
      cache.modify({
        fields: {
          gaSnippets(existingGaSnippetRefs = {}, { readField }) {
            const newGaSnippet = cache.writeFragment({
              data: gaSnippet,
              fragment: gql`
                fragment newGaSnippet on GASnippetNode {
                  id
                  pk
                  eventIdCustom
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
                  eventAction
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
                  snippetName
                  datalayer {
                    id
                    pk
                  }
                  event {
                    id
                    pk
                    name
                  }
                  customField {
                    edges {
                      node {
                        id
                        pk
                        name
                        value
                        isDimension
                        isMetric
                      }
                    }
                  }
                }
              `,
            });
            if (
              existingGaSnippetRefs.edges.some(
                (ref) => readField("id", ref.node.id) === gaSnippet.id
              )
            ) {
              return existingGaSnippetRefs;
            }
            return [...existingGaSnippetRefs.edges, newGaSnippet];
          },
        },
      });
    },
  });
}
