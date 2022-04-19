import { gql, useMutation } from "@apollo/client";

const createDocumentVariableMutation = gql`
  mutation createDocumentVariable(
    $document_variable_data: DocumentVariableInputType!
  ) {
    createDocumentVariable(input: $document_variable_data) {
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

export function useCreateDocumentVariableMutation(mutationOptions) {
  return useMutation(createDocumentVariableMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          createDocumentVariable: { documentVariable },
        },
      }
    ) {
      cache.modify({
        //id: cache.identify(),   NON MI FA CACHING :(((((
        fields: {
          documentVariables(existingDocumentVariableRefs = {}, { readField }) {
            const newDocumentVariableRef = cache.writeFragment({
              data: documentVariable,
              fragment: gql`
                fragment NewDocumentVariable on DocumentVariableNode {
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
              `,
            });
            if (
              existingDocumentVariableRefs.edges.some(
                (ref) => readField("id", ref.node) === newDocumentVariableRef.id
              )
            ) {
              return existingDocumentVariableRefs;
            }
            return [
              ...existingDocumentVariableRefs.edges,
              newDocumentVariableRef,
            ];
          },
        },
      });
    },
  });
}
