import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState, useContext } from "react";
import { Context, userLogOut } from "./../../store";
import { Typography } from "@mui/material";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

export default function PaymentDetail() {
  const { dispatch } = useContext(Context);
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/",
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }

    alert("stripe account being created. Please relogin");

    await dispatch(userLogOut());
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <PaymentElement />
            <br />
            <Button
              variant="contained"
              size="large"
              disableElevation
              type={"submit"}
            >
              Save
            </Button>
            <br />
            <Typography variant="caption">
              Saving a payment method will log you out. Use only to add new
              payment methods.
            </Typography>
            {errorMessage && <div>{errorMessage}</div>}
          </form>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </>
  );
}
