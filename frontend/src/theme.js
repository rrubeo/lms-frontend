import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#252846",
    },
    secondary: {
      main: "#788CB4",
      white: "#ffffff",
      magenta: "#B34A9D",
    },
    background: {
      paper: "#ffffff",
    },
    text: {
      primary: "#252846",
      secondary: "#46505A",
    },
    typography: {
      h1: {
        fontSize: "50pt",
        fontWeight: 800,
      },
      h2: {
        fontSize: "37pt",
      },
      h3: {
        fontSize: "30pt",
        fontWeight: 800,
      },
      h4: {
        fontSize: "29pt",
        fontWeight: 800,
      },
      h5: {
        fontSize: "19pt",
        fontWeight: 800,
      },
      h6: {
        fontSize: "9pt",
        fontWeight: 800,
      },
    },
  },
});

export default theme;
