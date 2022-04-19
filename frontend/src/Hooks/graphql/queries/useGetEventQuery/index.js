import { gql, useQuery } from "@apollo/client";

export const getEventQuery = gql`
  query getEvent($id_event: ID!) {
    event(id: $id_event) {
      id
      pk
      name
      category {
        id
        pk
        name
      }
    }
  }
`;

export function useGetEventQuery(queryOptions) {
  return useQuery(getEventQuery, queryOptions);
}
