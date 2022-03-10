import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function NameDetail() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            This is the name on your travel document, which could be a licence
            or a passport.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            color="grey"
            fullWidth
            focused
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" size="large" disableElevation>
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
