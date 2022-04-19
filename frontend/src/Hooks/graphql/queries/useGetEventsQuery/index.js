import { gql, useQuery } from "@apollo/client";

export const getEventsQuery = gql`
  query getEvents {
    events {
      edges {
        node {
          created
          modified
          id
          pk
          name
          category {
            name
          }
        }
      }
    }
  }
`;

export function useGetEventsQuery(queryOptions) {
  return useQuery(getEventsQuery, queryOptions);
}
