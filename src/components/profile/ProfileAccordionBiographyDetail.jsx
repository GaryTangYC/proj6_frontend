import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import { Context, updateDetail } from "./../../store";
import axios from "axios";

export default function BiographyDetail() {
  const { store, dispatch } = useContext(Context);
  const { user, token } = store;
  const { bio } = user;
  const [bioState, setBioState] = useState(bio);

  const doUpdate = async () => {
    const auth = { headers: { Authorization: `Bearer ${token}` } };
    const bckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/user/bio`;

    const formData = {
      id: user.id,
      bio: bioState,
    };

    try {
      const result = await axios.put(bckendUrl, formData, auth);
      dispatch(updateDetail("bio", bioState));
      if (result.status === 200) {
        alert("Updated Success!");
      } else {
        alert(result.status);
      }
    } catch (err) {
      let msg;
      if (err.toString().includes("403")) {
        msg = "You have to be logged in to do this";
      } else {
        msg = "Something went wrong with the update, pls try again";
      }
      alert(msg);
    }
  };

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
            value={bioState}
            onChange={(e) => {
              setBioState(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="large"
            disableElevation
            onClick={doUpdate}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
