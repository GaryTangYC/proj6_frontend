/* react imports */
import { useContext } from "react";
import { Context, userSignUp } from "./../store";
import { Link as RouterLink, useNavigate } from "react-router-dom";
/* mui imports */
import { TextField, Grid, Link, Box, Typography } from "@mui/material";
/* widget imports */
import SubmitBtn from "../widgets/SubmitBtn";
import SignContainer from "../components/SignContainer";
/* other imports */
import axios from "axios";

export default function SignUp() {
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();

  const doSignUp = async (evt) => {
    evt.preventDefault();
    const data = new FormData(evt.currentTarget);
    const name = data.get("name").toLowerCase();
    const email = data.get("email").toLowerCase();
    const postal = data.get("postal");
    const password = data.get("password");
    const bckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/signup`;
    if (
      name === "" ||
      /[<>=@{};]/.test(name) ||
      email === "" ||
      !/@/.test(email) ||
      postal === "" ||
      postal.length !== 2 ||
      password === ""
    ) {
      return alert("dude u left a field empty or filled it out incorrectly");
    }
    const user = await axios.post(bckendUrl, {
      name,
      email,
      postal,
      password,
    });
    if (user.data.err) {
      return alert(user.data.err);
    }
    dispatch(
      userSignUp(
        user.data.id,
        user.data.name,
        user.data.email,
        user.data.postal,
        user.data.token
      )
    );
    navigate("/home");
  };

  const GridItem = ({ label, name, type, placeholder }) => {
    return (
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          color="secondary"
          label={label}
          name={name}
          type={type}
          placeholder={placeholder}
        />
      </Grid>
    );
  };

  return (
    <SignContainer text="Sign Up">
      <Box component="form" noValidate onSubmit={doSignUp} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <GridItem
            label="Name"
            name="name"
            type="text"
            placeholder="any user name you like, <>=@{}; characters not allowed"
          />
          <GridItem
            label="Email Address"
            name="email"
            type="text"
            placeholder="pls ensure valid email w an @"
          />
          <GridItem
            label="Postal Code"
            name="postal"
            type="text"
            placeholder="just first 2 digits of postal code pls"
          />
          <GridItem
            label="Password"
            name="password"
            type="password"
            placeholder="any password u like"
          />
        </Grid>
        <SubmitBtn text="Sign Up" />
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/" underline="none">
              <Typography variant="body2">
                Already have an account? Sign in
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </SignContainer>
  );
}
