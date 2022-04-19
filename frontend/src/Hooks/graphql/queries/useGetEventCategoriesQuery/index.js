import { gql, useQuery } from "@apollo/client";

export const getEventCategoriesQuery = gql`
  query getEventCategories {
    eventCategories {
      edges {
        node {
          id
          pk
          name
        }
      }
    }
  }
`;

export function useGetEventCategoriesQuery(queryOptions) {
  return useQuery(getEventCategoriesQuery, queryOptions);
}
