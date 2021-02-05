import { colors } from '@material-ui/core';

const white = '#ffffff';
const black = '#000000';

const isDark =
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const dark = {
  black,
  white,
  type: 'dark',
  text: {
    primary: white,
    secondary: colors.grey[400]
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
    dark: '#1f716c',
    main: '#28938d',
    light: '#2da7a0'
  },
  secondary: {
    contrastText: white,
    dark: '#1f716c',
    main: '#28938d',
    light: '#2da7a0'
  },
  success: {
    contrastText: white,
    dark: '#1f716c',
    main: '#28938d',
    light: '#2da7a0'
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: '#1f716c',
    main: '#28938d',
    light: '#2da7a0'
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: '#202020',
    secondary: '#888888',
    link: '#28938d'
  },

  background: {
    default: '#fefffc',
    paper: white
  },
  icon: colors.grey[600]
};

export default isDark ? { ...palette, ...dark } : palette;
