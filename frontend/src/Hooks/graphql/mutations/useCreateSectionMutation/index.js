import { gql, useMutation } from "@apollo/client";

const createSectionMutation = gql`
  mutation createSection($image: Upload!, $sectionData: SectionInputType!) {
    createSection(input: $sectionData, file: $image) {
      section {
        id
        pk
        title
        action
        note
        priority
        category
        image {
          id
          pk
          name
          url
          pageLink
        }
        gaSnippet {
          edges {
            node {
              id
              pk
              eventCategory
              eventAction
              eventLabel
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
            }
          }
        }
      }
    }
  }
`;

export function useCreateSectionMutation(mutationOptions) {
  return useMutation(createSectionMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          createSection: { section },
        },
      }
    ) {
      cache.modify({
        fields: {
          sections(existingSectionRefs = {}, { readField }) {
            const newSectionRef = cache.writeFragment({
              data: section,
              fragment: gql`
                fragment NewSection on SectionNode {
                  id
                  pk
                  title
                  action
                  note
                  priority
                  category
                  gaSnippet {
                    edges {
                      node {
                        id
                        pk
                        eventCategory
                        eventAction
                        eventLabel
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
                      }
                    }
                  }
                }
              `,
            });
            if (
              existingSectionRefs.edges.some(
                (ref) => readField("id", ref.node.id) === section.id
              )
            ) {
              return existingSectionRefs;
            }
            return [...existingSectionRefs.edges, newSectionRef];
          },
        },
      });
    },
  });
}
