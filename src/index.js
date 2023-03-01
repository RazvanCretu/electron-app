import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter as Router } from "react-router-dom";
import { GlobalStyles } from "@mui/material";
import App from "./App";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <GlobalStyles
        styles={{
          body: {
            // WebkitAppRegion: "drag",
            margin: 0,
          },
          "button, a": {
            // WebkitAppRegion: "no-drag",
          },
        }}
      />
      <App />
    </Router>
  </React.StrictMode>
);
