/* no need to use import * as React from "react" cos we r alr destructing stuff we need frm react in line 7 below */
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { Context, updateDetail } from "./../../store";
import axios from "axios";

export default function NameDetail() {
  const { store, dispatch } = useContext(Context);
  const { user, token } = store;
  const { name } = user;

  const doUpdate = async () => {
    const auth = { headers: { Authorization: `Bearer ${token}` } };
    const bckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/user/name`;

    const formData = {
      id: user.id,
      name: name,
    };

    try {
      console.log(auth);
      const result = await axios.put(bckendUrl, formData, auth);
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
            onChange={(e) => dispatch(updateDetail("name", e.target.value))}

            // justus: pls try to see if can make use of the dispatch function above to change global store state & also update db when name is edited...
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
