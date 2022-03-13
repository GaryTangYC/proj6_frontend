import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { DataContext } from "../../pages/Profile";

export default function EmailDetail() {
  const { data, setData } = useContext(DataContext);
  const { email } = data;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>Use an address you’ll always have access to.</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            color="grey"
            fullWidth
            focused
            value={email}
            onChange={(e) => setData(e.target.value)}
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
