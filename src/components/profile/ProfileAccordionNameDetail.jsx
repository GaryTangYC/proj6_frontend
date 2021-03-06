import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import { Context, updateDetail } from "./../../store";
import axios from "axios";

export default function NameDetail() {
  const { store, dispatch } = useContext(Context);
  const { user, token } = store;
  const { name } = user;
  const [nameState, setNameState] = useState(name);

  const doUpdate = async () => {
    const auth = { headers: { Authorization: `Bearer ${token}` } };
    const bckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/user/name`;

    const formData = {
      id: user._id,
      name: nameState,
    };

    try {
      const result = await axios.put(bckendUrl, formData, auth);
      dispatch(updateDetail("name", nameState));
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
            value={nameState}
            onChange={(e) => {
              setNameState(e.target.value);
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
