import { gql, useMutation } from "@apollo/client";

const createDocumentMutation = gql`
  mutation createDocumentMutation(
    $image: Upload!
    $document_data: DocumentInputType!
  ) {
    createDocument(input: $document_data, file: $image) {
      document {
        created
        modified
        id
        pk
        url
        title
        customer {
          id
          pk
          name
          category {
            id
            pk
            name
          }
          image {
            id
            pk
            name
            url
          }
        }
        chapter {
          edges {
            node {
              id
              pk
              title
              path
              subChapter {
                edges {
                  node {
                    id
                    pk
                    title
                    path
                    section {
                      edges {
                        node {
                          id
                          pk
                          title
                          action
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      success
    }
  }
`;

export function useCreateDocumentMutation(mutationOptions) {
  return useMutation(createDocumentMutation, mutationOptions);
}
