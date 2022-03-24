import { blueGrey } from "@mui/material/colors";

const palette = {
  common: { black: "#000", white: "#fff" },
  primary: { main: "#ffe66d" },
  secondary: { main: "#ff6b6b" },
  error: { main: "#fb8b24" },
  info: { main: "#0570ea" },
  visa: { main: "#fb8b24" },
  text: {
    primary: blueGrey[800],
    secondary: blueGrey[500],
    disabled: blueGrey.A100,
  },
  background: { paper: "#f5f4ef", default: "#f5f4ef", neutral: blueGrey[100] },
};

export default palette;

/* 
General
- colors set here only affect mui components, NOT the base html doc, or any plain vanilla html elements shld we inject any of those into our jsx files
- primary.main is the same color as --primary-color in ./../App.css
- secondary.main is the same color as --accent-color in ./../App.css
Primary
- this will be the default color of the mui component unless otherwise specifed by passing `color=<color chosen>` into component
Typography
- default color for Typography component variants haf alr been set in ./typograhpy.js, however we can still customise to e colors above (such as text.primary etc) if we want
Background
- both background.paper and background.default use the same background-color set for body in ./../App.css
- as noted above in General, background here only controls background color of mui components, not background of the base htm doc
-background.paper shld impact Drawer component only
-background.default shld be e default color of mui component unless otherwise specified
*/
