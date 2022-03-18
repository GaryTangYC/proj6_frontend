import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { CardElement } from "@stripe/react-stripe-js";

export default function PaymentDetail() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CardElement />
        </Grid>
      </Grid>
    </>
  );
}
