import { gql, useMutation } from "@apollo/client";

const uploadSectionMutation = gql`
  mutation uploadSectionMutation(
    $ids: [ID]
    $datalayerID: ID!
    $documentID: ID!
    $subChapterID: ID!
  ) {
    uploadSection(
      id: $ids
      datalayer: $datalayerID
      document: $documentID
      subChapter: $subChapterID
    ) {
      uploaded
    }
  }
`;

export function useUploadSectionMutation(mutationOptions) {
  return useMutation(uploadSectionMutation, mutationOptions);
}
