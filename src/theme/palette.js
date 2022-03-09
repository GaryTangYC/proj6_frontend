import { blueGrey } from "@mui/material/colors";

const palette = {
  common: { black: "#000", white: "#fff" },
  primary: { main: "#ffe66d" },
  secondary: { main: "#ff6b6b" },
  error: { main: "#fb8b24" },
  text: {
    primary: blueGrey[900],
    secondary: blueGrey[500],
    disabled: blueGrey.A100,
  },
  background: { paper: "#fff", default: blueGrey[800], neutral: blueGrey[100] },
};

export default palette;
