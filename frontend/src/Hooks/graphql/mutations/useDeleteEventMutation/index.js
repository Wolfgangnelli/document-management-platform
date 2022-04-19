import { gql, useMutation } from "@apollo/client";

const deleteEventMutation = gql`
  mutation deleteEvent($delete_id: ID!) {
    deleteEvent(id: $delete_id) {
      ok
      id
    }
  }
`;

export function useDeleteEventMutation(mutationOptions) {
  return useMutation(deleteEventMutation, {
    ...mutationOptions,
    update(cache, { data: { deleteEvent } }) {
      cache.modify({
        fields: {
          events(cacheEvents, { readField }) {
            return cacheEvents.edges.filter(
              (event) => deleteEvent.id !== readField("id", event.node)
            );
          },
        },
      });
    },
  });
}
