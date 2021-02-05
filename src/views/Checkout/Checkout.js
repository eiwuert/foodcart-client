import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  Form as FormView,
  Result as ResultView,
  PayPal as PayPalView
} from './components';
import PropTypes from 'prop-types';

const Checkout = (props) => {
  const { path } = props?.match;
  return (
    <Switch>
      <Route component={FormView} exact path={path} />
      <Route component={ResultView} exact path={`${path}/result`} />
      <Route component={PayPalView} exact path={`${path}/paypal`} />
      <Redirect to={'/checkout'} />
    </Switch>
  );
};

Checkout.propTypes = {
  match: PropTypes.object.isRequired
};

export default Checkout;
