import { gql, useQuery } from "@apollo/client";

const getDocumentQuery = gql`
  query getDocument($id: ID!) {
    document(id: $id) {
      id
      pk
      url
      title
      chapter {
        edges {
          node {
            id
            pk
            title
            path
            icon
            subChapter {
              edges {
                node {
                  id
                  pk
                  title
                  path
                  chapter {
                    id
                    pk
                    title
                    path
                    icon
                  }
                }
              }
            }
          }
        }
      }
      datalayer {
        id
        pk
        name
        container {
          id
          pk
          name
        }
        initialSnippet {
          id
          pk
        }
      }
    }
  }
`;

export function useGetDocumentQuery(queryOptions) {
  return useQuery(getDocumentQuery, queryOptions);
}
