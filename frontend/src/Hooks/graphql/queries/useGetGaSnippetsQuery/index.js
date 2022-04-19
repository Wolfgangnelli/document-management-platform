import { gql, useQuery } from "@apollo/client";

export const getGaSnippetsQuery = gql`
  query getGaSnippets($datalayerID: ID!, $cursor: String) {
    gaSnippets(datalayer: $datalayerID, first: 6, after: $cursor) {
      totalCount
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
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
          snippetName
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
            id
            pk
            name
            category {
              name
            }
          }
          datalayer {
            pk
            id
          }
          customField {
            edges {
              node {
                id
                name
                value
                valueVariable {
                  name
                  id
                  pk
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
                pk
                isDimension
                isMetric
              }
            }
          }
        }
      }
    }
  }
`;

export function useGetGaSnippetsQuery(queryOptions) {
  return useQuery(getGaSnippetsQuery, queryOptions);
}
