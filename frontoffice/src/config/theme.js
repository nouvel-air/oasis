import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#FF96A0' },
    secondary: { main: '#5A696B' },
    // background: { default: '#F6F6F6' }
  },
  // breakpoints: {
  //   values: {
  //     md: 920,
  //     lg: 1360
  //   }
  // },
  typography: {
    fontFamily: 'Geomanist',
    body1: {
      fontSize: 18,
      lineHeight: "21.6px"
    },
    body2: {
      fontSize: 16,
      fontWeight: 500, // Medium
      lineHeight: '19.2px'
    },
    h1: {
      color: '#5A696B',
      fontSize: 48,
      fontWeight: 500, // Medium
      lineHeight: '60px'
    },
    h3: {
      color: '#5A696B',
      fontSize: 30,
      fontWeight: 500, // Medium
      lineHeight: '36px'
    },
    h4: {
      color: '#5A696B',
      fontSize: 26,
      fontWeight: 500, // Medium
      lineHeight: '30px'
    },
    h5: {
      color: '#5A696B',
      fontSize: 24,
      fontWeight: 500, // Medium
      lineHeight: '30px'
    },
    h6: {
      color: '#FF96A0',
      fontWeight: 500,
      fontSize: 18,
      lineHeight: '30px'
    },
    subtitle1: {
      color: '#5A696B',
      fontSize: 16,
      lineHeight: '30px'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          textTransform: 'none',
          fontSize: '16px',
          padding: 0,
          paddingRight: 0
        },
        startIcon: {
          marginTop: -5,
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          marginTop: 0
        },
        input: {
          paddingTop: 12,
          fontSize: 16,
          fontWeight: 500
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          paddingTop: 8,
          textAlign: 'center'
        }
      }
    }
  }
});

export default theme;
