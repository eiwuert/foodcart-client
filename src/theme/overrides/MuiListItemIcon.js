import palette from 'theme/palette';

export default {
  root: {
    minWidth: 'auto',
    backgroundColor: `${palette.secondary.main}22`,
    borderRadius: 16,
    marginRight: 10,
    display: 'block',
    '& button': {
      display: 'block'
    }
  }
};
