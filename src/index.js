import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

(async () => {
  const publishableKey =
    "pk_test_51KeGEbIBxjmqX6vG78Y4dJpnCts9gA4ZQr9UlH6fX3mQ8Mtf3iRx5gspbBME50uXCuM7OXVnrq7F7JSQkog9Z33p0085Yz4YKW";
  const stripePromise = await loadStripe(publishableKey);

  /* from docs: StrictMode is a tool for highlighting potential problems in an application. Like Fragment , StrictMode does not render any visible UI. It activates additional checks and warnings for its descendants. Note: Strict mode checks are run in development mode only; they do not impact the production build. */
  ReactDOM.render(
    <React.StrictMode>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </React.StrictMode>,
    document.getElementById("root")
  );
})();
