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
const lightMuiTheme = createMuiTheme({
  type: "light",
  palette: {
    primary: {
      main: "#FFF"
    },
    secondary: {
      main: amber[500],
      light: "#feefc3"
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
      iconColor: "#5f6368",
      itemBorderColor: "#DDDDDD",
      iconHighlight: grey[900],
      notesCheckbox: grey[700],
      profilePopColor: "#FFF",
      noteBackground: {
        default: "#0000",
        red: "#F28B82",
        orange: "#FBBC04",
        yellow: "#FFF475",
        green: "#CCFF90",
        cyan: "#A7FFEB",
        lightblue: "#CBF0F8",
        darkblue: "#AECBFA",
        purple: "#D7AEFB",
        pink: "#FDCFE8",
        brown: "#E6C9A8",
        grey: "#E8EAED"
      },
      noteColorCheck: "#0007",
      labelBackground: "#0002"
    }
  }
});

const darkMuiTheme = createMuiTheme({
  type: "dark",
  palette: {
    primary: {
      main: "#202124"
    },
    secondary: {
      main: amber[500],
      light: "#41331C"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#202124",
      highlight: "#535456"
    },
    text: {
      primary: "#E8EAED",
      secondary: "#FFFFFFDE"
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
      iconColor: "#949596",
      itemBorderColor: "#5F6368",
      iconHighlight: "#888A8B",
      notesCheckbox: "#5F6368",
      profilePopColor: "#2D2E30",
      noteBackground: {
        default: "#0000",
        red: "#5C2B29",
        orange: "#614A19",
        yellow: "#635D18",
        green: "#345920",
        cyan: "#16504B",
        lightblue: "#2D555E",
        darkblue: "#1E3A5F",
        purple: "#42275E",
        pink: "#5B2245",
        brown: "#442F19",
        grey: "#3C3F43"
      },
      noteColorCheck: "#FFF7",
      labelBackground: "#0002"
    }
  }
});

export const light = responsiveFontSizes(lightMuiTheme);
export const dark = responsiveFontSizes(darkMuiTheme);
