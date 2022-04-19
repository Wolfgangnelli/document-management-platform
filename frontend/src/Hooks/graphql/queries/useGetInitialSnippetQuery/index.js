import { gql, useQuery } from "@apollo/client";

export const getInitialSnippetQuery = gql`
  query getInitialSnippet($id: ID!) {
    initialSnippet(id: $id) {
      id
      pk
      event {
        id
        pk
        name
      }
      initialSnippetVariable {
        edges {
          node {
            id
            pk
            name
            type {
              id
              pk
              reference
              scope
              priority
            }
            isTemplate
            oldIdx
            initialSnippetVariableValue {
              edges {
                node {
                  id
                  pk
                  name
                  condition
                  oldIdx
                }
              }
            }
          }
        }
      }
    }
  }
`;

export function useGetInitialSnippetQuery(queryOptions) {
  return useQuery(getInitialSnippetQuery, queryOptions);
}
