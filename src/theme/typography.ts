declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    tiny: true
    buttonSmall: true
    buttonLarge: true
    h0: true
  }
}

const typography = {
  button: {
    textTransform: "none",
  },
  Typography: {
    textTransform: "none",
  },
  Box: {
    textTransform: "none",
  },
  "*": {
    boxSizing: "border-box",
  },

  fontFamily: "IRANSans",
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h0: {
    fontWeight: 300,
    fontSize: 48,
    lineHeight: "64px",
  },
  h1: {
    fontWeight: 300,
    fontSize: 48,
    lineHeight: "64px",
  },
  h2: {
    fontWeight: 300,
    fontSize: 40,
    lineHeight: "48px",
  },
  h3: {
    fontWeight: 500,
    fontSize: 32,
    lineHeight: "48px",
  },
  h4: {
    fontWeight: 500,
    fontSize: 24,
    lineHeight: "36px",
  },
  h5: {
    fontWeight: 400,
    fontSize: 20,
    lineHeight: "30px",
  },
  h6: {
    fontWeight: 400,
    fontSize: 18,
    lineHeight: "28px",
  },
  subtitle1: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: "24px",
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "22px",
  },
  body1: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: "24px",
  },
  body2: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "22px",
  },
  caption: {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: "18px",
  },
  overline: {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: "18px",
    textTransform: "uppercase",
  },
  buttonSmall: {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: "22px",
  },
  buttonLarge: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "24px",
  },
  tiny: {
    fontWeight: 400,
    fontSize: 10,
    lineHeight: "14px",
  },
} as const

export default typography
