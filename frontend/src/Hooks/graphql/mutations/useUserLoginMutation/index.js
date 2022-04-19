import { gql, useMutation } from "@apollo/client";

const userLogin = gql`
  mutation userLogin($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      refreshExpiresIn
      token
      payload
      user {
        id
        username
        email
        isStaff
      }
    }
  }
`;

export function useUserLoginMutation(mutationOptions) {
  return useMutation(userLogin, mutationOptions); // fare caching
}
