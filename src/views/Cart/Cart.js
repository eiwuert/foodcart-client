import React from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { useCart, useLocation } from 'context';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { CartList, CartTotal, RateMessage } from './components';
import { Result } from 'components';

const useStyles = makeStyles((theme) => ({
  desktop: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  mobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  }
}));

const Cart = () => {
  const { emptyCart, cart, subtotal } = useCart();
  const { rates, location } = useLocation();
  const classes = useStyles();
  const handleEmptyCart = () => {
    emptyCart();
  };

  return (
    <>
      {(!location || cart.length === 0) && <Redirect to={'/'} />}
      {rates &&
        (cart.length > 0 ? (
          <div>
            <Card elevation={0}>
              <CardContent>
                <Typography align={'center'} component={'h2'} variant={'h2'}>
                  Warenkorb
                </Typography>
                <CartList />
                <CartTotal />
                <RateMessage rates={rates} total={subtotal} />
                <Button
                  className={'box-t'}
                  color={'primary'}
                  component={RouterLink}
                  disabled={!rates[0] || rates[0].minimum > subtotal}
                  fullWidth
                  size={'large'}
                  to={'/checkout'}
                  variant={'contained'}>
                  Bestellung Abschließen
                </Button>
                <div className={`${classes.mobile} box-t`}>
                  <Button
                    component={RouterLink}
                    fullWidth
                    size={'large'}
                    to={'/'}
                    variant={'outlined'}>
                    Zurück zur Speisekarte
                  </Button>
                </div>
                <div className={`${classes.desktop} box-t`}>
                  <Button
                    fullWidth
                    onClick={handleEmptyCart}
                    size={'large'}
                    variant={'outlined'}>
                    Warenkorb leeren
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Result
            icon={'FastfoodOutlinedIcon'}
            primary={'Warenkorb'}
            secondary={
              'Wähle leckere Gerichte aus der Karte und bestelle Dein Menü.'
            }
          />
        ))}
    </>
  );
};

Cart.propTypes = {
  forced: PropTypes.bool
};

export default Cart;
