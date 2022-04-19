import { gql, useMutation } from "@apollo/client";

const deleteVariableMutation = gql`
  mutation deleteVariable($id_delete: ID!) {
    deleteVariable(id: $id_delete) {
      ok
      id
    }
  }
`;

export function useDeleteVariableMutation(mutationOptions) {
  return useMutation(deleteVariableMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          deleteVariable: { id },
        },
      }
    ) {
      cache.modify({
        fields: {
          variables(existingVariablesRefs = {}, { readField }) {
            return existingVariablesRefs.edges.filter(
              (variableRef) => id !== readField("id", variableRef)
            );
          },
        },
      });
    },
  });
}
