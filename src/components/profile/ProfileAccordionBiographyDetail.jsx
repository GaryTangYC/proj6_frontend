import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { Context, updateDetail } from "./../../store";

export default function BiographyDetail() {
  const { store, dispatch } = useContext(Context);
  const { bio } = store.user;

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
            onChange={(e) => dispatch(updateDetail("bio", e.target.value))}
            // justus: pls try to see if can make use of the dispatch function above to change global store state & also update db when bio is edited...
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
