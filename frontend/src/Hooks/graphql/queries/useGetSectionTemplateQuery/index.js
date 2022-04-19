import { gql, useQuery } from "@apollo/client";

const getSectionTemplateQuery = gql`
  query getSectionTemplate($section_id: ID!) {
    sectionTemplate(id: $section_id) {
      id
      pk
      title
      action
      note
      priority
      category
      gaSnippetTemplate {
        id
        pk
      }
      ecoSnippetTemplate {
        id
        pk
      }
      ga4EcoSnippetTemplate {
        id
        pk
      }
    }
  }
`;

export function useGetSectionTemplateQuery(queryOptions) {
  return useQuery(getSectionTemplateQuery, queryOptions);
}
