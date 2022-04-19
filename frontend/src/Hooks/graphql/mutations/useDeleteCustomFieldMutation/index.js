import { gql, useMutation } from "@apollo/client";

const deleteCustomFieldMutation = gql`
  mutation customFieldDelete($deleteID: ID!) {
    deleteCustomField(id: $deleteID) {
      ok
      customField {
        id
        gaSnippet {
          id
          section {
            id
          }
        }
      }
    }
  }
`;

export function useDeleteCustomFieldMutation(mutationOptions) {
  return useMutation(deleteCustomFieldMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          deleteCustomField: { customField },
        },
      }
    ) {
      cache.modify({
        id: cache.identify({
          __ref: `GASnippetNode:${customField.gaSnippet.id}`,
        }),
        fields: {
          customField(existingCustomFieldRefs, { readField }) {
            return existingCustomFieldRefs.edges.filter(
              (el) => readField("id", el.node) !== customField.id
            );
          },
        },
      });
    },
  });
}
