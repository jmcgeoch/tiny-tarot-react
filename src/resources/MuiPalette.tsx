import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#800080',
      dark: '#e6e6fa',
    },
    text: { 
      primary: '#303030'
     }
  },
  spacing: 2,
  typography: {
    fontFamily: 'Verdana'
  }
});

export default theme;
