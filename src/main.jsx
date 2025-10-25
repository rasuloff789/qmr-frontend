import React from "react";
import * as ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import client from "./api/apollo/client";
import App from "./App";
import "./index.css";
import "./config/i18n";


ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
