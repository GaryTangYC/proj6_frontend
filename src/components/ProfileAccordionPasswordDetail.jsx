import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

export default function PasswordDetail() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            To change your password, first key in your current password.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Current Password"
            variant="outlined"
            color="grey"
            fullWidth
            focused
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Key in your new password and ensure that it is adequately secure.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="New Password"
            variant="outlined"
            color="grey"
            fullWidth
            focused
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Repeat your new password to confirm it. Remember to click the update
            password button.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            color="grey"
            fullWidth
            focused
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" size="large" disableElevation>
            Update Password
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
