/* react imports */
import { Link as RouterLink } from "react-router-dom";
/* mui imports */
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
  Box,
  Typography,
} from "@mui/material";
/* widget/component imports */
import SubmitBtn from "../widgets/SubmitBtn";
import SignContainer from "../components/SignContainer";


export default function SignIn() {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = new FormData(evt.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <SignContainer text="Sign In">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>       
        <TextField
          margin="normal"
          required
          fullWidth
          color="secondary"
          label="Email Address"
          name="email"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          color="secondary"
          label="Password"
          name="password"
          type="password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="secondary" />}
          label={<Typography>Remember me</Typography>}
        />
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
