/* react imports */
import { useContext, useRef } from "react";
import { Context, updateDetail } from "./../../store";
/* mui imports */
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
/* other imports */
import axios from "axios";

export default function BiographyDetail() {
  const { store, dispatch } = useContext(Context);
  const formInput = useRef();
  const { user, token } = store;

  const doUpdate = async () => {
    const auth = { headers: { Authorization: `Bearer ${token}` } };
    const bckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/user/bio`;
    const bioFormInput = formInput.current.value.toLowerCase();
    const formData = {
      id: user.id,
      bio: bioFormInput,
    };

    try {
      const result = await axios.put(bckendUrl, formData, auth);
      if (result.status === 200) {
        dispatch(updateDetail("bio", bioFormInput));
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
            inputRef={formInput}
            placeholder={!user.bio?"pls enter your bio":user.bio}
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
