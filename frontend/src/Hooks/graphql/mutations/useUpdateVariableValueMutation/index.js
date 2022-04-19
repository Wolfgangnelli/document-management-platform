import { gql, useMutation } from "@apollo/client";

const updateVariableValueMutation = gql`
  mutation variableValueUpdate($dataVariableValue: VariableValueInputType!) {
    updateVariableValue(input: $dataVariableValue) {
      variableValue {
        name
        condition
        pk
        id
        variable {
          id
          pk
        }
      }
    }
  }
`;

export function useUpdateVariableValueMutation(mutationOptions) {
  return useMutation(updateVariableValueMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          updateVariableValue: { variableValue },
        },
      }
    ) {
      cache.modify({
        id: cache.identify({
          __ref: `VariableValueNode:${variableValue.id}`,
        }),
        fields: {
          name(existingNameRef) {
            return existingNameRef === variableValue.name
              ? existingNameRef
              : variableValue.name;
          },
          condition(existingConditionRef) {
            return existingConditionRef === variableValue.condition
              ? existingConditionRef
              : variableValue.condition;
          },
        },
      });
    },
  });
}
