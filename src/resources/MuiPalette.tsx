import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#800080',
      dark: '#e6e6fa',
    },
  },
  spacing: 2,
  typography: {
    fontFamily: 'Verdana'
  }
});

export default theme;
