import { gql, useQuery } from "@apollo/client";

const getDocumentsQuery = gql`
  query getDocuments {
    documents {
      edges {
        node {
          id
          pk
          url
          title
          customer {
            id
            pk
            name
            image
            category
          }
        }
      }
    }
  }
`;

export function useGetDocumentsQuery(queryOptions) {
  return useQuery(getDocumentsQuery, queryOptions);
}
