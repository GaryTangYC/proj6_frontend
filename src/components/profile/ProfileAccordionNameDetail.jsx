/* no need to use import * as React from "react" cos we r alr destructing stuff we need frm react in line 7 below */ 
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { Context } from "./../../store";

export default function NameDetail() {
  const { store, dispatch } = useContext(Context);
  const { name } = store.user;

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
            value={name}
            // justus: pls try to see if can make use of the dispatch function above to change global store state & also update db when name is edited... 
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
