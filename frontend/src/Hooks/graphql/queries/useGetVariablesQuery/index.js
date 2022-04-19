import { gql, useQuery } from "@apollo/client";

export const listVariablesQuery = gql`
  query allVariables(
    $after: String
    $before: String
    $last: Int
    $first: Int
    $termSearched: String
  ) {
    variables(
      first: $first
      last: $last
      after: $after
      before: $before
      name: $termSearched
    ) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          created
          modified
          id
          pk
          name
          type {
            id
            reference
            scope
            priority
          }
          variableValue {
            edges {
              node {
                id
                pk
                name
                condition
                variable {
                  id
                  name
                  pk
                }
              }
            }
          }
        }
      }
    }
  }
`;

export function useListVariablesQuery(queryOptions) {
  return useQuery(listVariablesQuery, queryOptions);
}
