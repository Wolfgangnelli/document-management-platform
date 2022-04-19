import { gql, useMutation } from "@apollo/client";

const deleteGaSnippetTemplateMutation = gql`
  mutation deleteGaSnippetTemplate($delete_id: ID!) {
    deleteGaSnippetTemplate(id: $delete_id) {
      ok
      id
      name
    }
  }
`;

export function useDeleteGaSnippetTemplateMutation(mutationOptions) {
  return useMutation(deleteGaSnippetTemplateMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          deleteGaSnippetTemplate: { id },
        },
      }
    ) {
      cache.modify({
        fields: {
          gaSnippetsTemplate(cacheGaSnippetsTemplate, { readField }) {
            return cacheGaSnippetsTemplate.edges.filter(
              (snippet) => id !== readField("id", snippet.node)
            );
          },
        },
      });
    },
  });
}
