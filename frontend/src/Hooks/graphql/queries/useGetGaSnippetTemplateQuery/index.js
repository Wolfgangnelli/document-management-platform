import { gql, useQuery } from "@apollo/client";

const getGaSnippetTemplateQuery = gql`
  query getGaSnippetTemplate($id: ID!) {
    gaSnippetTemplate(id: $id) {
      id
      pk
      eventCategory
      eventLabel
      eventAction
      snippetName
      event {
        name
        id
        pk
      }
      eventCategoryVariable {
        id
        pk
        name
        variableValue {
          edges {
            node {
              id
              pk
              name
              condition
            }
          }
        }
      }
      eventActionVariable {
        id
        pk
        name
        variableValue {
          edges {
            node {
              id
              pk
              name
              condition
            }
          }
        }
      }
      eventLabelVariable {
        id
        pk
        name
        variableValue {
          edges {
            node {
              id
              pk
              name
              condition
            }
          }
        }
      }
    }
  }
`;

export function useGetGaSnippetTemplateQuery(queryOptions) {
  return useQuery(getGaSnippetTemplateQuery, queryOptions);
}
