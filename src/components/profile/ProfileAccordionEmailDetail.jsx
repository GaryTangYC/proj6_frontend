/* no need to use import * as React from "react" cos we r alr destructing stuff we need frm react in line 7 below */ 
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { Context } from "./../../store";

export default function EmailDetail() {
  const { store, dispatch } = useContext(Context);
  const { email } = store.user;

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
            // justus: pls try to see if can make use of the dispatch function above to change global store state & also update db when email is edited...
            // onChange={(e) => setData(e.target.value)}
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
