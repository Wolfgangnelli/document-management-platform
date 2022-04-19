import { gql, useQuery } from "@apollo/client";

const getSectionQuery = gql`
  query getSection($sectionID: ID!) {
    section(id: $sectionID) {
      id
      pk
      title
      action
      note
      priority
      image {
        id
        pk
        name
        pageLink
        url
      }
      gaSnippet {
        edges {
          node {
            id
            pk
            eventIdCustom
            snippetName
            event {
              id
              pk
              name
            }
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
    }
  }
`;

export function useGetSectionQuery(queryOptions) {
  return useQuery(getSectionQuery, queryOptions);
}
