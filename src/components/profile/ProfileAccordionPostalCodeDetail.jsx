import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { DataContext } from "../../pages/Profile";

export default function PostalCodeDetail() {
  const { data, setData } = useContext(DataContext);
  const { postal } = data;

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
