import { gql, useMutation } from "@apollo/client";

const userSingUp = gql`
  mutation userSingUp($input: UserInputType!) {
    userCreate(input: $input) {
      user {
        id
        username
        email
        isStaff
      }
    }
  }
`;

export function useUserSingUpMutation(mutationOptions) {
  return useMutation(userSingUp, mutationOptions);
}
