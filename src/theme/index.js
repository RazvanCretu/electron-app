import { ThemeProvider, createTheme } from "@mui/material";

const darkGrey = {
  50: "#eceef6",
  100: "#d0d6e1",
  200: "#b3baca",
  300: "#969eb3",
  400: "#808aa1",
  500: "#6a7690",
  600: "#5c677f",
  700: "#4b5468",
  800: "#3b4252", // Primary
  900: "#282e3a",
};

// #AAA
// hsl(222, 16, 28)

const theme = createTheme({
  palette: {
    darkGrey: {
      light: darkGrey[200],
      main: darkGrey[500],
      dark: darkGrey[700],
      darker: darkGrey[900],
    },
    tonalOffset: 0.3,
  },
});

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
