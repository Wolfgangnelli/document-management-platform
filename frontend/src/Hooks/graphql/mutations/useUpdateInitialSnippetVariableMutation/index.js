import { gql, useMutation } from "@apollo/client";

const updateInitialSnippetVariableMutation = gql`
  mutation updateInitialSnippetVariable(
    $dataUpdate: InitialSnippetVariableInputType!
  ) {
    updateInitialSnippetVariable(input: $dataUpdate) {
      initialSnippetVariable {
        id
        pk
        name
        initialSnippet {
          id
          pk
        }
        initialSnippetVariableValue {
          edges {
            node {
              id
              pk
              name
              condition
              initialSnippetVariable {
                id
                pk
              }
              oldIdx
            }
          }
        }
      }
    }
  }
`;

export function useUpdateInitialSnippetVariableMutation(mutationOptions) {
  return useMutation(updateInitialSnippetVariableMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          updateInitialSnippetVariable: { initialSnippetVariable },
        },
      }
    ) {
      cache.modify({
        id: cache.identify({
          __ref: `InitialSnippetVariableNode:${initialSnippetVariable.id}`,
        }),
        fields: {
          name(existingName) {
            return existingName === initialSnippetVariable.name
              ? existingName
              : initialSnippetVariable.name;
          },
          initialSnippetVariableValue(
            existingInitialSnippetVariableValueRefs = {}
          ) {
            return initialSnippetVariable.initialSnippetVariableValue;
          },
        },
      });
    },
  });
}
