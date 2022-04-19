import { gql, useQuery } from "@apollo/client";

export const getGaSnippetsTemplateQuery = gql`
  query getGaSnippetsTemplate($cursor: String) {
    gaSnippetsTemplate(first: 6, after: $cursor) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      edges {
        cursor
        node {
          id
          pk
          eventCategory
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
          eventAction
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
          eventLabel
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
          snippetName
          event {
            name
            category {
              name
            }
          }
        }
      }
    }
  }
`;

export function useGetGaSnippetsTemplate(queryOptions) {
  return useQuery(getGaSnippetsTemplateQuery, queryOptions);
}
