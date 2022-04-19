import { gql, useQuery } from "@apollo/client";

const getVariableQuery = gql`
  query getVariable($id: ID!) {
    variable(id: $id) {
      id
      pk
      name
      isTemplate
      type {
        scope
        reference
        priority
      }
      variableValue {
        edges {
          cursor
          node {
            name
            condition
            id
            pk
          }
        }
      }
    }
  }
`;

export function useGetVariableQuery(queryOptions) {
  return useQuery(getVariableQuery, queryOptions);
}
