import { grey, deepOrange, orange, red } from '@material-ui/core/colors';

const white = '#ffffff';
const black = '#000000';

const isDark =
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const dark = {
  type: 'dark',
  text: {
    primary: white,
    secondary: grey[400]
  },
  background: {
    default: '#202020',
    paper: '#2a2a2a'
  }
};

const palette = {
  black,
  white,
  common: {
    black: black,
    white: white
  },
  primary: {
    contrastText: white,
    dark: deepOrange[900],
    main: deepOrange[500],
    light: deepOrange[100]
  },
  secondary: {
    contrastText: white,
    dark: orange[900],
    main: orange['A400'],
    light: orange['A400']
  },
  success: {
    contrastText: white,
    dark: deepOrange[900],
    main: deepOrange[600],
    light: deepOrange[400]
  },
  info: {
    contrastText: white,
    dark: deepOrange[900],
    main: deepOrange[600],
    light: deepOrange[400]
  },
  warning: {
    contrastText: white,
    dark: orange[900],
    main: orange[600],
    light: orange[400]
  },
  error: {
    contrastText: white,
    dark: red[900],
    main: red[600],
    light: red[400]
  },
  text: {
    primary: '#202020',
    secondary: '#666666',
    link: orange[600]
  },

  background: {
    default: '#fefcfa',
    paper: white
  },
  icon: grey[600]
};

export default isDark ? { ...palette, ...dark } : palette;
