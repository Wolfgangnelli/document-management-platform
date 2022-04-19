import { gql, useMutation } from "@apollo/client";

const updateDatalayerMutation = gql`
  mutation updateDatalayer($update_data: DatalayerInputType!) {
    updateDatalayer(input: $update_data) {
      datalayer {
        id
        pk
        name
        container {
          id
          pk
          name
        }
        document {
          id
        }
      }
    }
  }
`;

export function useUpdateDatalayerMutation(mutationOptions) {
  return useMutation(updateDatalayerMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          updateDatalayer: { datalayer },
        },
      }
    ) {
      cache.modify({
        id: cache.identify({ __ref: `DocumentNode:${datalayer.document.id}` }),
        fields: {
          datalayer(existingDatalayerRef = {}) {
            const newDatalayerRef = cache.writeFragment({
              data: datalayer,
              fragment: gql`
                fragment NewDatalayer on DatalayerNode {
                  id
                  pk
                  name
                  container {
                    id
                    pk
                    name
                  }
                  document {
                    id
                  }
                }
              `,
            });
            return newDatalayerRef;
          },
        },
      });
    },
  });
}
