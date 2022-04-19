import { gql, useMutation } from "@apollo/client";

const createInitialSnippetMutation = gql`
  mutation createInitialSnippet(
    $initial_snippet_data: InitialSnippetInputType!
  ) {
    createInitialSnippet(input: $initial_snippet_data) {
      initialSnippet {
        id
        pk
        event {
          id
          pk
          name
        }
        initialSnippetVariable {
          id
          pk
          name
          isTemplate
          oldIdx
          type {
            id
            pk
            reference
            scope
            priority
          }
          initialSnippetVariableValue {
            id
            pk
            oldIdx
            name
            condition
          }
        }
      }
    }
  }
`;

export function useCreateInitialSnippetMutation(mutationOptions) {
  return useMutation(createInitialSnippetMutation, mutationOptions);
}
