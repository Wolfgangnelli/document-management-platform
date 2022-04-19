import { gql, useQuery } from "@apollo/client";

export const getDocumentVariablesQuery = gql`
  query getDocumentVariables(
    $document_id: ID!
    $after: String
    $before: String
  ) {
    documentVariables(
      document: $document_id
      first: 5
      after: $after
      before: $before
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
          document {
            id
            pk
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
    }
  }
`;

export function useGetDocumentVariablesQuery(queryOptions) {
  return useQuery(getDocumentVariablesQuery, queryOptions);
}
