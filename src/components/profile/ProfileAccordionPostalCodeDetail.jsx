/* no need to use import * as React from "react" cos we r alr destructing stuff we need frm react in line 7 below */ 
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { Context } from "./../../store";

export default function PostalCodeDetail() {
  const { store, dispatch } = useContext(Context);
  const { postal } = store.user;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            Use the postal code of your permanent address for better partner
            matches.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Postcode"
            variant="outlined"
            color="grey"
            type="number"
            fullWidth
            focused
            value={postal}
            // justus: pls try to see if can make use of the dispatch function above to change global store state & also update db when postal is edited...
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
