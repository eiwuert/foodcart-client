import palette from 'theme/palette';
export default {
  root: {
    textTransform: 'initial',
    minWidth: '0 !important',
    borderRadius: 16,
    padding: '6px 18px',
    margin: '0 2px',
    fontWeight: '600',
    '&$selected': {
      color: palette.primary.main,
      backgroundColor: `${palette.secondary.main}22`
    }
  },
  textColorInherit: {
    color: palette.text.primary,
    opacity: 1
  }
};
