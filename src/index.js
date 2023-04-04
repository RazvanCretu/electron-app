import React from "react";
import ReactDOM from "react-dom/client";
import client from "./apollo/client";
import { ApolloProvider } from "@apollo/client";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { GlobalStyles } from "@mui/material";
import App from "./App";
import store from "./store";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Auth } from "./contexts/auth";
import Theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ApolloProvider client={client}>
          <Auth>
            <GlobalStyles
              styles={{
                body: {
                  margin: 0,
                },
              }}
            />
            <Theme>
              <App />
            </Theme>
          </Auth>
        </ApolloProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
