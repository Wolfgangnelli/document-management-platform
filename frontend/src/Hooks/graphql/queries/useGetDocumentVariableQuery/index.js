import { gql, useQuery } from "@apollo/client";

const getDocumentVariableQuery = gql`
  query getDocumentVariable($id: ID!) {
    documentVariable(id: $id) {
      created
      modified
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
      documentVariableValue {
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
`;

export function useGetDocumentVariableQuery(queryOptions) {
  return useQuery(getDocumentVariableQuery, queryOptions);
}
