import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../config/apolloClient";

export function AppProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
