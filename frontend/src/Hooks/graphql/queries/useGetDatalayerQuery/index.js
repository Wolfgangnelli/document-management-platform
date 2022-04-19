import { gql, useQuery } from "@apollo/client";

export const getDatalayerQuery = gql`
  query getDatalayer($datalayerID: ID!) {
    datalayer(id: $datalayerID) {
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
`;

export function useGetDatalayerQuery(queryOptions) {
  return useQuery(getDatalayerQuery, queryOptions);
}
