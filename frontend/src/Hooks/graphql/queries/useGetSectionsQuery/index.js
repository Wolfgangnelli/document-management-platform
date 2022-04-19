import { gql, useQuery } from "@apollo/client";

const getSectionsQuery = gql`
  query getSections($subChapterID: ID!) {
    sections(subChapter: $subChapterID) {
      edges {
        node {
          id
          title
          action
          note
          priority
          category
          pk
          image {
            id
            pk
            name
            url
            pageLink
          }
          gaSnippet {
            edges {
              node {
                id
                pk
                event {
                  id
                  pk
                  name
                }
                eventLabel
                eventLabelVariable {
                  id
                  pk
                  name
                  gaSnippetVariableValue {
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
                eventAction
                eventActionVariable {
                  id
                  pk
                  name
                  gaSnippetVariableValue {
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
                eventCategory
                eventCategoryVariable {
                  id
                  pk
                  name
                  gaSnippetVariableValue {
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
                snippetName
                eventIdCustom
                customField {
                  edges {
                    node {
                      id
                      pk
                      name
                      value
                      valueVariable {
                        id
                        pk
                        name
                        gaSnippetVariableValue {
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
                      isMetric
                      isDimension
                    }
                  }
                }
                eventLabelVariable {
                  id
                  pk
                  name
                  gaSnippetVariableValue {
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
          }
        }
      }
    }
  }
`;

export function useGetSectionsQuery(queryOptions) {
  return useQuery(getSectionsQuery, queryOptions);
}
