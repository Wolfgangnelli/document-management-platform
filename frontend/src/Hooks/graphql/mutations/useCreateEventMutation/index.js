import { gql, useMutation } from "@apollo/client";

const createEventMutation = gql`
  mutation createEvent($event_data: EventInputType!) {
    createEvent(input: $event_data) {
      event {
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

export function useCreateEventMutation(mutationOptions) {
  return useMutation(createEventMutation, {
    ...mutationOptions,
    update(cache, { data: { createEvent } }) {
      cache.modify({
        fields: {
          events(existingEvents = {}, { readField }) {
            const newEventRef = cache.writeFragment({
              data: createEvent?.event,
              fragment: gql`
                fragment NewEvent on EventNode {
                  id
                  pk
                  name
                  category {
                    id
                    pk
                    name
                  }
                }
              `,
            });
            // Quick safety check
            if (
              existingEvents.edges.some(
                (ref) => readField("id", ref) === createEvent.event.id
              )
            ) {
              return existingEvents;
            }
            return [...existingEvents.edges, newEventRef];
          },
        },
      });
    },
  });
}
