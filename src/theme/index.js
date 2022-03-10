import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";
import palette from "./palette";
import typography from "./typography";

// ----------------------------------------------------------------------

export default function ThemeConfig({ children }) {
  let theme = createTheme({
    palette,
    typography,
    shape: { borderRadius: 8 },
  });
  // This supposed to make our text responsive in size. To check out
  theme = responsiveFontSizes(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

// Login and signin page TextField (InputProps & InpuLabelProps) color are currently hardcoded. If we want to change it via Theme, will need to use override in this page: https://stackoverflow.com/questions/70405734/material-ui-v5-theming-customization