import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Drawer, Backdrop } from '@material-ui/core';
import PropTypes from 'prop-types';

const drawerWidth = parseInt(process.env.REACT_APP_DRAWER_WIDTH);

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  drawerPaper: {
    width: drawerWidth
  },

  backdrop: {
    zIndex: 1000
  },
  drawerForcedPaper: {
    width: drawerWidth,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      left: 0
    }
  }
}));

const Routes = (props) => {
  const [state, setState] = useState({ forced: false, focused: false });
  const classes = useStyles();
  const history = useHistory();
  const switchLocation = useCallback(() => {
    switch (history.location.pathname.split('/')[1]) {
      case 'cart':
        setState({ forced: true, focused: false });
        break;
      case 'checkout':
        setState({ forced: true, focused: true });
        break;
      default:
        setState({ forced: false, focused: false });
    }
  }, [history.location.pathname]);

  useEffect(() => {
    switchLocation();
  }, [switchLocation]);

  useEffect(() => {
    history.listen(switchLocation);
  }, [history, switchLocation]);
  return (
    <>
      <Drawer
        anchor={'right'}
        className={state.forced ? classes.drawerForced : classes.drawer}
        classes={{
          paper: state.forced ? classes.drawerForcedPaper : classes.drawerPaper
        }}
        variant={'permanent'}>
        {props.children}
      </Drawer>
      <Backdrop className={classes.backdrop} open={state.focused} />
    </>
  );
};

Routes.propTypes = {
  children: PropTypes.any.isRequired
};

export default Routes;
