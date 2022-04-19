import { gql, useMutation } from "@apollo/client";

const createDatalayerMutation = gql`
  mutation createDatalayer($datalayer_data: DatalayerInputType!) {
    createDatalayer(input: $datalayer_data) {
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

export function useCreateDatalayerMutation(mutationOptions) {
  return useMutation(createDatalayerMutation, {
    ...mutationOptions,
    update(
      cache,
      {
        data: {
          createDatalayer: { datalayer },
        },
      }
    ) {
      cache.modify({
        id: cache.identify({ __ref: `DocumentNode:${datalayer.document.id}` }),
        fields: {
          datalayer(existingDatalayerRef = null) {
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
