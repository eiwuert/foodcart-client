import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { default as Layout } from './Layout';
import { default as CartView } from './views/Cart';
const CheckoutView = lazy(() => import('./views/Checkout'));

const Routes = () => {
  return (
    <Layout>
      <Suspense fallback={null}>
        <Switch>
          <Route component={CartView} exact path={'/'} />
          <Route component={CartView} exact path={'/cart'} />
          <Route component={CheckoutView} path={'/checkout'} />
          <Redirect to={'/'} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default Routes;
