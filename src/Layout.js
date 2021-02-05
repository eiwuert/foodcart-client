import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { default as MenuView } from './views/Menu';
import { NavigationDrawer } from 'components';
import PropTypes from 'prop-types';

const drawerWidth = parseInt(process.env.REACT_APP_DRAWER_WIDTH);

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    left: 0,
    right: drawerWidth,
    [theme.breakpoints.down('sm')]: {
      right: 0
    }
  },
  menu: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 70
    }
  }
}));

const Layout = (props) => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <div className={classes.menu}>
        <MenuView />
      </div>
      <NavigationDrawer>{props.children}</NavigationDrawer>
    </main>
  );
};

Layout.propTypes = {
  children: PropTypes.object
};

export default Layout;
