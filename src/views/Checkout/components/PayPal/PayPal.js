import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Result } from 'components';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {
    margin: 'auto'
  }
}));

const PayPal = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({ failed: false });
  const history = props.history;
  const query = useLocation().search;
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_HOST + '/api/paypal/capture' + query)
      .then(() => {
        history.push('/checkout/result');
      })
      .catch(() => {
        setState({ failed: true });
      });
  }, [query]);

  return state.failed ? (
    <Result
      homeButton
      icon={'ErrorOutlineIcon'}
      primary={'Es ist ein Fehler aufgetreten'}
      secondary={'Deine Zahlung ist leider fehlgeschlagen'}
    />
  ) : (
    <CircularProgress className={classes.root} />
  );
};


PayPal.propTypes = {
  history: PropTypes.object.isRequired
};

export default PayPal;
