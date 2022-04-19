import { useMutation, gql } from "@apollo/client";

export const createVariableMutation = gql`
  mutation createVariable($variableData: VariableInputType!) {
    createVariable(input: $variableData) {
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

export function useCreateVariableMutation(mutationOptions) {
  return useMutation(createVariableMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          createVariable: { variable },
        },
      }
    ) {
      cache.modify({
        fields: {
          variables(existingVariableRefs = {}, { readField }) {
            const newVariableRef = cache.writeFragment({
              data: variable,
              fragment: gql`
                fragment NewVariable on VariableNode {
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
              `,
            });
            if (
              existingVariableRefs.edges.some((ref) =>
                readField("id", ref.node.id)
              )
            ) {
              return existingVariableRefs;
            }
            return [...existingVariableRefs.edges, newVariableRef];
          },
        },
      });
    },
  });
}

/* export function useCreateVariableMutation(mutationOptions) {
  return useMutation(createVariableMutation, {
    ...mutationOptions,
    update(cache, { data }) {
      const newVariable = data?.variable;
      cache.writeQuery({
        query: "getVariable",
        data: {
          variable: newVariable,
        },
      });
    },
  });
} */
