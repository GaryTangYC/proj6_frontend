import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { DataContext } from "../../pages/Profile";

export default function BiographyDetail() {
  const { data, setData } = useContext(DataContext);
  const { bio } = data;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            This is a short description of yourself that helps your partners get
            to know you.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Text Area"
            variant="outlined"
            color="grey"
            maxRows={7}
            fullWidth
            focused
            multiline
            value={bio}
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
