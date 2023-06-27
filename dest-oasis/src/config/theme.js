import { createTheme } from '@mui/material/styles';

// Allow to use breakpoints
const defaultTheme = createTheme();

const theme = createTheme({
  palette: {
    primary: { main: '#FF96A0' },
    secondary: { main: '#5A696B' },
    background: { default: '#F6F6F6' }
  },
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
    h5: {
      color: '#5A696B',
      fontSize: 26,
      fontWeight: 500, // Medium
      lineHeight: '30px'
    },
    h6: {
      color: '#FF96A0',
      fontWeight: 500,
      fontSize: 18,
      lineHeight: '30px'
    }
  },
  components: {
    // RaChipField: {
    //   styleOverrides: {
    //     chip: {
    //       marginLeft: 0,
    //       marginTop: 0,
    //       marginRight: 8,
    //       marginBottom: 8
    //     }
    //   }
    // },
    // RaShow: {
    //   styleOverrides: {
    //     card: {
    //       padding: 25,
    //       [defaultTheme.breakpoints.down('sm')]: {
    //         padding: 15
    //       }
    //     }
    //   }
    // },
    // RaList: {
    //   styleOverrides: {
    //     content: {
    //       padding: 25,
    //       [defaultTheme.breakpoints.down('sm')]: {
    //         padding: 15,
    //         paddingTop: 0,
    //         marginTop: -8
    //       }
    //     }
    //   }
    // },
    // RaListToolbar: {
    //   styleOverrides: {
    //     toolbar: {
    //       paddingLeft: '0 !important'
    //     }
    //   }
    // },
    // RaSingleFieldList: {
    //   styleOverrides: {
    //     root: {
    //       marginTop: 0,
    //       marginBottom: 0
    //     }
    //   }
    // },
    // RaAutocompleteArrayInput: {
    //   styleOverrides: {
    //     chipContainerFilled: {
    //       '& .serverName': {
    //         display: 'none'
    //       }
    //     }
    //   }
    // },
    // MuiTab: {
    //   styleOverrides: {
    //     root: {
    //       minWidth: 160
    //     },
    //     labelIcon: {
    //       paddingTop: 0
    //     }
    //   }
    // },
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
    // MuiAutocomplete: {
    //   styleOverrides: {
    //     inputRoot: {
    //       paddingTop: 12,
    //       paddingBottom: 5
    //     }
    //   }
    // },
    // MuiCard: {
    //   styleOverrides: {
    //     root: {
    //       '@media print': {
    //         boxShadow: 'none !important'
    //       }
    //     }
    //   }
    // }
  }
});

export default theme;
