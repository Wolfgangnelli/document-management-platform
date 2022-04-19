import { gql, useQuery } from "@apollo/client";

const getDatalayersQuery = gql`
  query getDatalayers {
    datalayers {
      edges {
        node {
          id
          pk
          name
          container {
            id
            pk
            name
          }
        }
      }
    }
  }
`;

export function useGetDatalayersQuery(queryOptions) {
  return useQuery(getDatalayersQuery, queryOptions);
}
