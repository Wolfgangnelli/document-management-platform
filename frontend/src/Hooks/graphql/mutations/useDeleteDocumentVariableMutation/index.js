import { gql, useMutation } from "@apollo/client";

const deleteDocumentVariableMutation = gql`
  mutation deleteDocumentVariable($delete_id: ID!) {
    deleteDocumentVariable(id: $delete_id) {
      id
      ok
    }
  }
`;

export function useDeleteDocumentVariableMutation(mutationOptions) {
  return useMutation(deleteDocumentVariableMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          deleteDocumentVariable: { id },
        },
      }
    ) {
      cache.modify({
        fields: {
          documentVariables(existingDocumentVariableRefs = {}, { readField }) {
            return existingDocumentVariableRefs.edges.filter(
              (variableRef) => id !== readField("id", variableRef)
            );
          },
        },
      });
    },
  });
}
