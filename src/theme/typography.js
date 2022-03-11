import { blueGrey } from "@mui/material/colors";

const FONT = "'Quicksand', sans-serif";

const typography = {
  allVariants: { color: blueGrey[800] },
  fontFamily: FONT,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontSize: 24,
    fontWeight: 700,
    textTransform: "uppercase",
    lineHeight: 80 / 64,
  },
  h2: {
    fontSize: 14,
    fontWeight: 600,
    textTransform: "uppercase",
    lineHeight: 64 / 48,
  },
  h3: {
    fontSize: 14,
    fontWeight: 500,
    textTransform: "capitalize",
    lineHeight: 1.5,
  },
  h4: {
    fontSize: 14,
    fontWeight: 400,
    textTransform: "capitalize",
    lineHeight: 1.5,
  },
  h5: {
    fontSize: 14,
    fontWeight: 400,
    textTransform: "capitalize",
    lineHeight: 1.5,
  },

  body1: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: 12,
    lineHeight: 22 / 14,
  },
  caption: {
    fontSize: 12,
    lineHeight: 1.5,
  },
  button: {
    fontSize: 13,
    fontWeight: 500,
    textTransform: "capitalize",
    lineHeight: 24 / 14,
  },
};

export default typography;
