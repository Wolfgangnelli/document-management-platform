import { gql, useQuery } from "@apollo/client";

const getCategoriesQuery = gql`
  query getCategories {
    categories {
      edges {
        node {
          id
          pk
          name
          customer {
            edges {
              node {
                id
                pk
                name
                image {
                  id
                  pk
                  name
                  url
                }
                document {
                  edges {
                    node {
                      created
                      modified
                      id
                      pk
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export function useGetCategoriesQuery(queryOptions) {
  return useQuery(getCategoriesQuery, queryOptions);
}
