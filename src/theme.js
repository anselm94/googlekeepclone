import { red, amber, grey } from "@material-ui/core/colors";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import Fonts from "./assets/fonts";

const fontFamilyRoboto = {
  fontFamily: [
    "Roboto",
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(",")
};

const fontFamilyMetropolis = {
  fontFamily: [
    "Metropolis",
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(","),
  letterSpacing: "0.015rem"
};

// A custom theme for this app
const theme = createMuiTheme({
  type: "light",
  palette: {
    primary: {
      main: "#FFF"
    },
    secondary: {
      main: amber[500],
      light: amber[100]
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#FFF",
      highlight: "#F1F3F4"
    }
  },
  typography: {
    ...fontFamilyRoboto,
    overline: {
      fontWeight: 500,
      fontSize: "0.7rem"
    }
  },
  shape: {
    borderRadius: "0.5rem"
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100
  },
  mixins: {
    drawer: {
      minWidth: 280
    }
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [
          Fonts.MetropolisRegular,
          Fonts.MetropolisBold,
          Fonts.RobotoRegular,
          Fonts.RobotoMedium,
          Fonts.RobotoBold
        ]
      }
    },
    MuiListItemText: {
      primary: {
        ...fontFamilyMetropolis,
        fontWeight: 500,
        fontSize: "0.87rem"
      }
    }
  },
  custom: {
    fontFamily: {
      roboto: fontFamilyRoboto,
      metropolis: fontFamilyMetropolis
    },
    palette: {
      iconHighlight: grey[900],
      noteBackground: [
        "#FFF",
        "#F28B82",
        "#FBBC04",
        "#FFF475",
        "#CCFF90",
        "#A7FFEB",
        "#CBF0F8",
        "#CBF0F8",
        "#AECBFA",
        "#FDCFE8",
        "#E6C9A8",
        "#E8EAED"
      ],
      noteColorCheck: "#0007"
    }
  }
});

export default responsiveFontSizes(theme);
