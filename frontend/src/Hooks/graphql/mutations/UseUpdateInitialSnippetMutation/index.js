import { gql, useMutation } from "@apollo/client";

const updateInitialSnippetMutation = gql`
  mutation updateInitialSnippet($data_update: InitialSnippetInputType!) {
    updateInitialSnippet(input: $data_update) {
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

export function useUpdateInitialSnippetMutation(mutationOptions) {
  return useMutation(updateInitialSnippetMutation, {
    ...mutationOptions,
    update(cache, { data: { updateInitialSnippet } }) {
      cache.modify({
        id: cache.identify(updateInitialSnippet),
        fields: {
          ...updateInitialSnippet,
        },
      });
    },
  });
}
