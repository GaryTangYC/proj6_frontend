import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import { Context, updateDetail } from "./../../store";
import axios from "axios";

export default function EmailDetail() {
  const { store, dispatch } = useContext(Context);
  const { user, token } = store;
  console.log(store);
  const { email } = user;
  const [emailState, setEmailState] = useState(email);

  const doUpdate = async () => {
    const auth = { headers: { Authorization: `Bearer ${token}` } };
    const bckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/user/email`;

    const formData = {
      id: user.id,
      email: emailState,
    };

    try {
      const result = await axios.put(bckendUrl, formData, auth);
      dispatch(updateDetail("email", emailState));
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
          <Typography>Use an address you’ll always have access to.</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            color="grey"
            fullWidth
            focused
            value={emailState}
            onChange={(e) => {
              setEmailState(e.target.value);
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
