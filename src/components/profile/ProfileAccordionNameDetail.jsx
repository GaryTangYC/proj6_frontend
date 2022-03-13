import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { DataContext } from "../../pages/Profile";
import { textTransform } from "@mui/system";

export default function NameDetail() {
  const { data, setData } = useContext(DataContext);
  const { name } = data;

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
