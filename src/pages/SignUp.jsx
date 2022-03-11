/* mui imports */
import { TextField, Grid, Link, Box, Typography } from "@mui/material";
/* widget imports */
import SubmitBtn from "../widgets/SubmitBtn";
import SignContainer from "../components/SignContainer";

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <SignContainer text="Sign Up">
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              color="secondary"
              label="Name"
              name="name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              color="secondary"
              label="Email Address"
              name="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              color="secondary"
              label="Password"
              name="password"
              type="password"
            />
          </Grid>
        </Grid>
        <SubmitBtn text="Sign Up" />
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/" variant="body2">
              Already have an account? Sign in (outside typography)
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
