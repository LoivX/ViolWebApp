import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#2563EB",
    },

    secondary: {
      main: "#64748B",
    },

    background: {
      default: "#F5F7FA",
      paper: "#FFFFFF",
    },

    success: {
      main: "#16A34A",
    },

    warning: {
      main: "#F59E0B",
    },

    error: {
      main: "#DC2626",
    },

    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },
  },

  shape: {
    borderRadius: 16,
  },

  spacing: 8,

  typography: {
    fontFamily: '"Roboto Condensed", "Roboto", "Arial", "sans-serif"',

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});

export default theme;
