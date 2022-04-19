import { gql, useMutation } from "@apollo/client";

const updateInitialSnippetVariableValueMutation = gql`
  mutation updateInitialSnippetVariableValue(
    $dataUpdate: InitialSnippetVariableValueInputType!
  ) {
    updateInitialSnippetVariableValue(input: $dataUpdate) {
      initialSnippetVariableValue {
        id
        pk
        name
        condition
        oldIdx
      }
    }
  }
`;

export function useUpdateInitialSnippetVariableValueMutation(mutationOptions) {
  return useMutation(updateInitialSnippetVariableValueMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          updateInitialSnippetVariableValue: { initialSnippetVariableValue },
        },
      }
    ) {
      cache.modify({
        id: cache.identify({
          __ref: `InitialSnippetVariableValueNode:${initialSnippetVariableValue?.id}`,
        }),
        fields: {
          name(existingNameRef) {
            return existingNameRef === initialSnippetVariableValue.name
              ? existingNameRef
              : initialSnippetVariableValue.name;
          },
          condition(existingConditionRef) {
            return existingConditionRef ===
              initialSnippetVariableValue.condition
              ? existingConditionRef
              : initialSnippetVariableValue.condition;
          },
        },
      });
    },
  });
}
