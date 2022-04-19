import { gql, useMutation } from "@apollo/client";

const createGaSnippetTemplateMutation = gql`
  mutation createGaSnippetTemplate($snippet_data: GASnippetTemplateInputType!) {
    createGaSnippetTemplate(input: $snippet_data) {
      snippetTemplate {
        id
        eventCategory
        eventAction
        eventLabel
        eventCategoryVariable {
          id
          pk
          name
          isTemplate
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
          isTemplate
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
          isTemplate
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
        snippetName
        event {
          name
          id
          pk
        }
        pk
        sectionTemplate {
          edges {
            node {
              id
              pk
              title
              action
              note
              priority
              category
            }
          }
        }
      }
    }
  }
`;

export function useCreateGaSnippetTemplateMutation(mutationOptions) {
  return useMutation(createGaSnippetTemplateMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          createGaSnippetTemplate: { snippetTemplate },
        },
      }
    ) {
      cache.modify({
        fields: {
          gaSnippetsTemplate(
            existingGaSnippetsTemplateRefs = {},
            { readField }
          ) {
            const newGaSnippetTemplateRef = cache.writeFragment({
              data: snippetTemplate,
              fragment: gql`
                fragment NewGaSnippetTemplate on GASnippetTemplateNode {
                  id
                  eventCategory
                  eventAction
                  eventLabel
                  eventCategoryVariable {
                    id
                    pk
                    name
                    isTemplate
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
                    isTemplate
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
                    isTemplate
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
                  snippetName
                  event {
                    name
                    id
                    pk
                  }
                  pk
                  sectionTemplate {
                    edges {
                      node {
                        id
                        pk
                        title
                        action
                        note
                        priority
                        category
                      }
                    }
                  }
                }
              `,
            });
            // Quick safety check
            //console.log(existingGaSnippetsTemplateRefs);
            if (
              existingGaSnippetsTemplateRefs.edges.some(
                (ref) => readField("id", ref.node.id) === snippetTemplate.id
              )
            ) {
              return existingGaSnippetsTemplateRefs;
            }
            return [
              ...existingGaSnippetsTemplateRefs.edges,
              newGaSnippetTemplateRef,
            ];
          },
        },
      });
    },
  });
}
