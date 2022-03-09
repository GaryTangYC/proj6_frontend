import { ThemeProvider, createTheme } from "@mui/material/styles";
import palette from "./palette";
import typography from "./typography";

// ----------------------------------------------------------------------

export default function ThemeConfig({ children }) {
  const theme = createTheme({
    palette,
    typography,
    shape: { borderRadius: 8 },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
