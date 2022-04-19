import { gql, useMutation } from "@apollo/client";

const updateUserMutation = gql`
  mutation userUpdate($input: UserInputType, $id: Int!) {
    userUpdate(input: $input, id: $id) {
      user {
        id
        username
        email
        isStaff
      }
    }
  }
`;

export function useUpdateUserMutation(mutationOptions) {
  return useMutation(updateUserMutation, mutationOptions);
}
