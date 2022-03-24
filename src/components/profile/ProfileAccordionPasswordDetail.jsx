import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Context } from "../../store";
import axios from "axios";

export default function PasswordDetail() {
  const { store } = useContext(Context);
  const { user, token } = store;
  const { _id } = user;

  const initState = {
    id: _id,
    currentPswd: "",
    newPswd: "",
    confirmPswd: "",
  };

  const [passwordState, setPasswordState] = useState(initState);

  const doUpdate = async () => {
    const auth = { headers: { Authorization: `Bearer ${token}` } };
    const bckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/user/password`;

    try {
      const result = await axios.put(bckendUrl, passwordState, auth);
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
            To change your password, first key in your current password.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Current Password"
            variant="outlined"
            color="grey"
            fullWidth
            focused
            value={passwordState.currentPswd}
            onChange={(e) => {
              setPasswordState({
                ...passwordState,
                currentPswd: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Key in your new password and ensure that it is adequately secure.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="New Password"
            variant="outlined"
            color="grey"
            fullWidth
            focused
            value={passwordState.newPswd}
            onChange={(e) => {
              setPasswordState({
                ...passwordState,
                newPswd: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Repeat your new password to confirm it. Remember to click the update
            password button.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            color="grey"
            fullWidth
            focused
            value={passwordState.confirmPswd}
            onChange={(e) => {
              setPasswordState({
                ...passwordState,
                confirmPswd: e.target.value,
              });
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
            Update Password
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
