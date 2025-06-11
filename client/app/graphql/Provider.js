"use client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
const port =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/graphql"
    : "https://www.vercel.com";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: port,

    credentials: "include",
  }),
});

export function Provider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
