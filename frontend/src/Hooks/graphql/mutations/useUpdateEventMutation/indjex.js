import { gql, useMutation } from "@apollo/client";

const updateEventMutation = gql`
  mutation updateEvent($data_event_update: EventInputType!) {
    updateEvent(input: $data_event_update) {
      event {
        created
        modified
        id
        pk
        name
        category {
          id
          pk
          name
        }
      }
    }
  }
`;

export function useUpdateEventMutation(mutationOptions) {
  return useMutation(updateEventMutation, {
    ...mutationOptions,
    update(cache, { data: { updateEvent } }) {
      cache.modify({
        id: cache.identify(updateEvent?.event),
        fields: {
          name(cachedName) {
            return cachedName === updateEvent?.event?.name
              ? cachedName
              : updateEvent?.event?.name;
          },
          category(categoryFields) {
            return categoryFields.name === updateEvent?.event?.category?.name
              ? categoryFields.name
              : updateEvent?.event?.category?.name;
          },
        },
      });
    },
  });
}
