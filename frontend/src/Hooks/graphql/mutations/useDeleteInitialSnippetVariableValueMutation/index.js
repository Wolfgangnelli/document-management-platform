import { gql, useMutation } from "@apollo/client";

const deleteInitialSnippetVariableValueMutation = gql`
  mutation deleteInitialSnippetVariableValue($deleteID: ID!) {
    deleteInitialSnippetVariableValue(id: $deleteID) {
      ok
      id
      initialSnippetVariableValue {
        id
        initialSnippetVariable {
          id
        }
      }
    }
  }
`;

export function useDeleteInitialSnippetVariableValueMutation(mutationOptions) {
  return useMutation(deleteInitialSnippetVariableValueMutation, {
    update(cache, { data: { deleteInitialSnippetVariableValue } }) {
      cache.modify({
        id: cache.identify({
          __ref: `InitialSnippetVariableNode:${deleteInitialSnippetVariableValue.initialSnippetVariableValue.initialSnippetVariable.id}`,
        }),
        fields: {
          initialSnippetVariableValue(
            existingInitialSnippetVariableValueRefs = {},
            { readField }
          ) {
            return existingInitialSnippetVariableValueRefs.edges.filter(
              (item) =>
                readField("id", item.node) !==
                deleteInitialSnippetVariableValue.initialSnippetVariableValue.id
            );
          },
        },
      });
    },
  });
}
