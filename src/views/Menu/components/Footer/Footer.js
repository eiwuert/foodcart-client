import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Button, Badge } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { CurrencyNumberFormat } from 'components';
import { useCart } from 'context';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    height: 64,
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 100,
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex'
    }
  }
}));

const Footer = () => {
  const { cart, subtotal } = useCart();

  const classes = useStyles();
  return (
    cart.length > 0 &&
    subtotal && (
      <Button
        className={classes.root}
        color={'primary'}
        component={RouterLink}
        size={'large'}
        startIcon={
          <Badge
            badgeContent={cart
              .map((position) => position.quantity)
              .reduce((a, b) => a + b, 0)}
            color={'secondary'}>
            <ShoppingBasketIcon />
          </Badge>
        }
        to={'/cart'}
        variant={'contained'}>
        Warenkorb (<CurrencyNumberFormat value={subtotal} />)
      </Button>
    )
  );
};

export default Footer;
