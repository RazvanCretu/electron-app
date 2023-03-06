import React from "react";
import ReactDOM from "react-dom/client";
import client from "./apollo/client";
import { ApolloProvider } from "@apollo/client";
import { MemoryRouter as Router } from "react-router-dom";
import { GlobalStyles } from "@mui/material";
import App from "./App";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Auth } from "./contexts/auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <GlobalStyles
          styles={{
            body: {
              // WebkitAppRegion: "drag",
              // minHeight: "800px",
              // minWidth: "1200px",
              margin: 0,
            },
            "button, a": {
              // WebkitAppRegion: "no-drag",
            },
          }}
        />
        <Auth>
          <App />
        </Auth>
      </ApolloProvider>
    </Router>
  </React.StrictMode>
);
