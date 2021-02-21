import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import ApolloBoost, { gql } from "apollo-boost";
import { ApolloProvider } from 'react-apollo';

const client = new ApolloBoost({
  uri: 'http://localhost:5000/graphql'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

reportWebVitals();
