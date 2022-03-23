import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/* from docs: StrictMode is a tool for highlighting potential problems in an application. Like Fragment , StrictMode does not render any visible UI. It activates additional checks and warnings for its descendants. Note: Strict mode checks are run in development mode only; they do not impact the production build. */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
