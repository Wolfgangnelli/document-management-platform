import { gql, useMutation } from "@apollo/client";

const updateSectionMutation = gql`
  mutation updateSection($image: Upload, $dataUpdate: SectionInputType!) {
    updateSection(input: $dataUpdate, file: $image) {
      section {
        id
        pk
        title
        action
        image {
          id
          pk
          name
          url
          pageLink
        }
        note
        priority
        category
        gaSnippet {
          edges {
            node {
              id
              pk
              eventIdCustom
              eventCategory
              eventAction
              eventLabel
              event {
                id
                pk
                name
              }
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
                    }
                    isDimension
                    isMetric
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

export function useUpdateSectionMutation(mutationOptions) {
  return useMutation(updateSectionMutation, mutationOptions);
}
