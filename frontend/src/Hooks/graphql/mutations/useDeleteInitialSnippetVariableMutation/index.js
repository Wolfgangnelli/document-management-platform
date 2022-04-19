import { gql, useMutation } from "@apollo/client";

const deleteInitialSnippetVariableMutation = gql`
  mutation deleteInitialSnippetVariable($id: ID!) {
    deleteInitialSnippetVariable(id: $id) {
      ok
      id
      initialSnippet {
        id
      }
    }
  }
`;

export function useDeleteInitialSnippetVariable(mutationOptions) {
  return useMutation(deleteInitialSnippetVariableMutation, {
    ...mutationOptions,
    update(cache, { data: { deleteInitialSnippetVariable } }) {
      cache.modify({
        id: cache.identify({
          __ref: `InitialSnippetNode:${deleteInitialSnippetVariable.initialSnippet.id}`,
        }),
        fields: {
          initialSnippetVariable(
            existingInitialSnippetVariableRefs = {},
            { readField }
          ) {
            return existingInitialSnippetVariableRefs.edges.filter(
              (item) =>
                deleteInitialSnippetVariable.id !==
                readField("id", item.node.id)
            );
          },
        },
      });
    },
  });
}
