import { gql, useMutation } from "@apollo/client";

const updateVariableMutation = gql`
  mutation updateVariable($variableData: VariableInputType!) {
    updateVariable(input: $variableData) {
      variable {
        name
        id
        pk
        type {
          reference
          scope
          priority
        }
        isTemplate
        variableValue {
          edges {
            node {
              name
              condition
            }
          }
        }
      }
    }
  }
`;

export function useUpdateVariableMutation(mutationOptions) {
  return useMutation(updateVariableMutation, mutationOptions);
}
