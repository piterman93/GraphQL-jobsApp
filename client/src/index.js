import "bulma/css/bulma.css";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAccessToken, isLoggedIn } from "./auth";

const httpLink = createHttpLink({
  uri: "http://localhost:9000/graphiql",
});

const authLink = setContext((_, { headers }) => {
  let token;
  if (isLoggedIn()) {
    token = getAccessToken();
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
