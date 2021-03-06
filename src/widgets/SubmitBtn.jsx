import { Button } from "@mui/material";

export default function SubmitBtn({ text }) {
  return (
    <Button
      size="large"
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      {text}
    </Button>
  );
}
