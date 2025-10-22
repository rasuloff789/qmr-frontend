import React from "react";
import * as ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import client from "./ApolloClient.js";
import App from "./App";
import "./index.css";
import "./i18n"; // agar bor bo‘lsa


ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
