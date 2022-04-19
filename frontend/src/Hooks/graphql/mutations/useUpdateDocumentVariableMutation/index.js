import { gql, useMutation } from "@apollo/client";

const updateDocumentVariableMutation = gql`
  mutation updateDocumentVariable($data_update: DocumentVariableInputType!) {
    updateDocumentVariable(input: $data_update) {
      documentVariable {
        id
        pk
        name
        type {
          id
          pk
          reference
          scope
          priority
        }
        document {
          id
          pk
        }
        documentVariableValue {
          edges {
            node {
              id
              pk
              name
              condition
            }
          }
        }
      }
    }
  }
`;

export function useUpdateDocumentVariableMutation(mutationOptions) {
  return useMutation(updateDocumentVariableMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          updateDocumentVariable: { documentVariable },
        },
      }
    ) {
      cache.modify({
        id: cache.identify(documentVariable.id),
        fields: {
          ...documentVariable,
        },
      });
    },
  });
}
