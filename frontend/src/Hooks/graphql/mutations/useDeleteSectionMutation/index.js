import { gql, useMutation } from "@apollo/client";

const deleteSectionMutation = gql`
  mutation deleteSection($deleteId: ID!) {
    deleteSection(id: $deleteId) {
      ok
      id
    }
  }
`;

export function useDeleteSectionMutation(mutationOptions) {
  return useMutation(deleteSectionMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          deleteSection: { id },
        },
      }
    ) {
      cache.modify({
        fields: {
          sections(existingSectionRefs = {}, { readField }) {
            return existingSectionRefs.edges.filter(
              (section) => id !== readField("id", section.node)
            );
          },
        },
      });
    },
  });
}
