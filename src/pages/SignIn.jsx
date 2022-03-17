/* react imports */
import { useContext } from "react";
import { Context, userSignIn } from "./../store";
import { Link as RouterLink, useNavigate } from "react-router-dom";
/* mui imports */
import { TextField, Grid, Link, Box, Typography } from "@mui/material";
/* widget/component imports */
import SubmitBtn from "../widgets/SubmitBtn";
import SignContainer from "../components/SignContainer";
/* other imports */
import axios from "axios";

export default function SignIn() {
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();

  const doSignIn = async (evt) => {
    evt.preventDefault();
    const data = new FormData(evt.currentTarget);
    const email = data.get("email").toLowerCase();
    const password = data.get("password");
    const bckendUrl = process.env.REACT_APP_BCKEND_BASE_URI;

    if (email === "" || !/@/.test(email) || password === "") {
      return alert(
        "dude u either left a field empty or did not key in an email"
      );
    }
    const result = await axios.post(bckendUrl, {
      email,
      password,
    });
    if (result.data.err) {
      return alert(result.data.err);
    }
    dispatch(
      userSignIn(
        result.data.token
      )
    );
    navigate(`/home/${result.data.id}`);
  };

  const MyTextField = ({ label, name, type }) => {
    return (
      <TextField
        margin="normal"
        required
        fullWidth
        color="secondary"
        label={label}
        name={name}
        type={type}
      />
    );
  };
  return (
    <SignContainer text="Sign In">
      <Box component="form" onSubmit={doSignIn} noValidate sx={{ mt: 1 }}>
        <MyTextField label="Email Address" name="email" type="text" />
        <MyTextField label="Password" name="password" type="password" />
        <SubmitBtn text="Sign In" />
        <Grid container>
          <Grid item xs>
            <Link href="#" underline="none">
              <Typography variant="body2">Forgot password?</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/signup" underline="none">
              <Typography variant="body2">
                Don't have an account? Sign Up
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </SignContainer>
  );
}
