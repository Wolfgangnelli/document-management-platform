import { gql, useMutation } from "@apollo/client";

const deleteGA4EcoSnippetTemplateMutation = gql`
  mutation deleteGA4EcoSnippetTemplate($delete_id: ID!) {
    deleteGa4EcoSnippetTemplate(id: $delete_id) {
      ok
      id
    }
  }
`;

export function useDeleteGA4EcoSnippetTemplateMutation(mutationOptions) {
  return useMutation(deleteGA4EcoSnippetTemplateMutation, {
    ...mutationOptions,
    update(cache, { data: { deleteGa4EcoSnippetTemplate } }) {
      cache.modify({
        fields: {
          ga4EcoSnippetsTemplate(
            existingGA4EcoSnippetTemplateRefs = {},
            { readField }
          ) {
            return existingGA4EcoSnippetTemplateRefs.edges.filter(
              (snippet) =>
                deleteGa4EcoSnippetTemplate.id !== readField("id", snippet.node)
            );
          },
        },
      });
    },
  });
}
