import { gql, useMutation } from "@apollo/client";

const deleteVariableValueMutation = gql`
  mutation variableValueDelete($deleteID: ID!) {
    deleteVariableValue(id: $deleteID) {
      ok
      variableValue {
        id
        pk
        name
        condition
        variable {
          id
          pk
        }
      }
    }
  }
`;

export function useDeleteVariableValueMutation(mutationOptions) {
  return useMutation(deleteVariableValueMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          deleteVariableValue: { variableValue },
        },
      }
    ) {
      cache.modify({
        id: cache.identify({
          __ref: `VariableNode:${variableValue.variable.id}`,
        }),
        fields: {
          variableValue(existingVariableValueRef, { readField }) {
            return existingVariableValueRef.edges.filter(
              (item) => variableValue.id !== readField("id", item.node)
            );
          },
        },
      });
    },
  });
}
