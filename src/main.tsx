import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client/apollo-client.ts";
import Auth0ProviderWithNavigate from "./providers/Auth0-provider-with-navigate.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <NextUIProvider>
          <Auth0ProviderWithNavigate>
            <App />
          </Auth0ProviderWithNavigate>
        </NextUIProvider>
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);
