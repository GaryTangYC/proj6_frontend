import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import { Context, updateDetail } from "./../../store";
import axios from "axios";

export default function PostalCodeDetail() {
  const { store, dispatch } = useContext(Context);
  const { user, token } = store;
  const { postal } = user;
  const [postalState, setPostalState] = useState(postal);

  const doUpdate = async () => {
    const auth = { headers: { Authorization: `Bearer ${token}` } };
    const bckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/user/postal`;

    const formData = {
      id: user.id,
      postal: postalState,
    };

    try {
      const result = await axios.put(bckendUrl, formData, auth);
      dispatch(updateDetail("postal", postalState));
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
            value={postalState}
            onChange={(e) => {
              setPostalState(e.target.value);
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
