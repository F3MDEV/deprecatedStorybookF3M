import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },
  palette: {
    primary: {
      main: '#4CB3BA',
      dark: '#019ea9',
      contrastText: '#fff'
    },
    secondary: {
      main: '#ffffff',
    },
    text: {
      primary: '#494949',
      secondary: '#4CB3BA',
      disabled: '#b2b2b2',
      hint: '#019ea9'
    },
  },
  overrides: {
    MuiFormLabel: {
      root: {
        // Some CSS
        color: '#494949',
        fontWeight: 'bold',
        fontSize: 18
      }
    },
    MuiTableSortLabel: {
      root: {
        lineHeight: 1.5,
        whiteSpace: 'nowrap'
      }
    },
    MuiTableCell: {
      root: {
        // whiteSpace: "nowrap",
      }
    },
    MuiInputBase: {
      root: {
        fontSize: 12
      }
    },
    MuiTab: {
      root: {
        fontSize: 14,
        fontFamily: 'Nunito',
        fontWeight: 900
      }
    }
  }
});

/* <color name="colorPrimary">#4CB3BA</color>
<color name="colorAccent">#4CB3BA</color>
<color name="colorPrimaryDark">#019ea9</color>
<color name="colorBotao">#65000000</color>
<color name="white">#FFFFFF</color>
<drawable name="whitesplash">#FFFFFF</drawable>
<color name="texto">#494949</color>
<color name="greyMpds">#adadad</color>
<color name="separador">#dcdcdc</color>
<color name="fundoMenu">#e4f4f5</color>
<color name="lightGrey">#E8E8E8</color>
<color name="rippleNavHeader">#e8e8e8</color>

<!-- Tipologia de diagnostico -->
<color name="ferida">#FF8882</color>
<color name="sinalCutaneo">#ED9821</color>

<!--filtros pesquisa-->
<color name="filterButton">#ebebeb</color>

<!--track background slider-->
<color name="transparent_colorPrimay">#7F4CB3BA</color>
<color name="transparent_text">#66494949</color>

<!--localization-->
<color name="red">#FF530D</color>

<color name="black_overlay">#66000000</color>
<color name="transparent">#00000000</color>
<color name="whiteTransparent">#66FFFFFF</color>
<!--fraunhofer-->
<color name="dialog_positive_button">#4CB3BA</color>
<color name="dialog_negative_button">#4CB3BA</color> */
