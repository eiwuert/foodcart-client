import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
const breakpoints = createBreakpoints({});

export default {
  paperAnchorDockedRight: {
    [breakpoints.down('sm')]: {
      borderLeft: 'none'
    }
  }
};
