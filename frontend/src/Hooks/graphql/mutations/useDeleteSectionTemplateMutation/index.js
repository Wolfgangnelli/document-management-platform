import { gql, useMutation } from "@apollo/client";

const deleteSectionTemplateMutation = gql`
  mutation deleteSectionTemplateMutation($delete_id: ID!) {
    deleteSectionTemplate(id: $delete_id) {
      ok
      id
    }
  }
`;

export function useDeleteSectionTemplateMutation(mutationOptions) {
  return useMutation(deleteSectionTemplateMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          deleteSectionTemplate: { id },
        },
      }
    ) {
      cache.modify({
        fields: {
          sectionsTemplate(existingSectionsTemplateRefs = {}, { readField }) {
            return existingSectionsTemplateRefs.edges.filter(
              (section) => id !== readField("id", section.node)
            );
          },
        },
      });
    },
  });
}
