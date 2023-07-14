import { alpha } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    neutral: string;
    shadeNeutral: string;
    darkest: string;
  }
  interface TypeText {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    title: string;
  }
}

export const GREY = {
  100: "#FFFFFF",
  200: "#F4F6F8",
  300: "#E0E0E0",
  400: "#CDCDCD",
  500: "#B8B8B8",
  600: "#9E9E9E",
  700: "#757575",
  800: "#505050",
  900: "#373737",
};

export const PRIMARY = {
  light: "#FEBA4D",
  main: "#F05123",
  dark: "#C32C00",
  contrastText: "#3C2517",
};

export const SECONDARY = {
  light: "#D68452",
  main: "#3C2517",
  dark: "#632B09",
  contrastText: GREY[200],
};
export const INFO = {
  light: "#29FFFF",
  main: "#14E4E4",
  dark: "#259E9E",
  contrastText: "",
};
export const SUCCESS = {
  light: "#A0EECF",
  main: "#00D17E",
  dark: "#009D5F",
  contrastText: "",
};
export const WARNING = {
  light: "#F1F101",
  main: "#FAC107",
  dark: "#E4B003",
  contrastText: "",
};
export const ERROR = {
  light: "#F44336",
  main: "#ED1B2F",
  dark: "#B71C1C",
  contrastText: "",
};

const COMMON = {
  common: { black: "#000", white: "#fff" },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: GREY[500],
  action: {
    active: GREY[500],
    hover: GREY[900],
    selected: GREY[800],
    disabled: GREY[900],
    disabledBackground: GREY[500],
    focus: GREY[500],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const palette = {
  light: {
    ...COMMON,
    mode: "light",
    text: {
      primary: GREY[900],
      secondary: GREY[600],
      tertiary: "#f0f0f0",
      caption: "#D2D2D2",
      title: "#9E9E9E",
      icon: "#494949",
    },
    background: {
      paper: GREY[200],
      default: GREY[100],
      darkest: GREY[900],
      card: GREY[800],
      neutral: GREY[600],
      shade: alpha("#000000", 0.6),
    },
  },
  dark: {
    ...COMMON,
    mode: "dark",
    text: {
      primary: GREY[100],
      secondary: GREY[300],
      tertiary: "#f0f0f0",
      caption: "#D2D2D2",
      title: "#9E9E9E",
      icon: "#494949",
    },
    background: {
      paper: GREY[900],
      default: GREY[700],
      darkest: GREY[900],
      card: GREY[800],
      neutral: GREY[600],
      shade: alpha("#000000", 0.6),
    },
  },
} as const;

export default palette;
