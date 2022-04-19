import { gql, useQuery } from "@apollo/client";

const getUser = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      username
      email
      isStaff
    }
  }
`;

export function useGetUserQuery(queryOptions) {
  return useQuery(getUser, queryOptions);
}
