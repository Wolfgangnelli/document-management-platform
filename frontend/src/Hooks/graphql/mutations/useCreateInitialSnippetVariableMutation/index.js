import { gql, useMutation } from "@apollo/client";

const createInitialSnippetVariableMutation = gql`
  mutation createInitialSnippetVariable(
    $data_variable: InitialSnippetVariableInputType!
  ) {
    createInitialSnippetVariable(input: $data_variable) {
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
              oldIdx
            }
          }
        }
      }
    }
  }
`;

export function useCreateInitialSnippetVariableMutation(mutationOptions) {
  return useMutation(createInitialSnippetVariableMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          createInitialSnippetVariable: { initialSnippetVariable },
        },
      }
    ) {
      cache.modify({
        id: cache.identify({
          __typename: "InitialSnippetNode",
          id: initialSnippetVariable.initialSnippet.id,
        }),
        fields: {
          initialSnippetVariable(
            existingInitialSnippetVariableRefs = {},
            { readField }
          ) {
            const newInitialSnippetVariableRef = cache.writeFragment({
              data: initialSnippetVariable,
              fragment: gql`
                fragment NewInitialSnippetVariable on initialSnippetVariable {
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
                        oldIdx
                      }
                    }
                  }
                }
              `,
            });
            if (
              existingInitialSnippetVariableRefs.edges.some(
                (ref) =>
                  readField("id", ref.node.id) ===
                  newInitialSnippetVariableRef.id
              )
            ) {
              return existingInitialSnippetVariableRefs;
            }
            return [
              ...existingInitialSnippetVariableRefs.edges,
              newInitialSnippetVariableRef,
            ];
          },
        },
      });
    },
  });
}
