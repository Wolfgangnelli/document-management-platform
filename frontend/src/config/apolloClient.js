import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = from([
  errorLink,
  createUploadLink({ uri: "http://localhost:9000/graphql" }),
  // new HttpLink({ uri: "http://localhost:9000/graphql" }),
]);

export const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache,
  link: link,
});
