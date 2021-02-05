import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { useCart, useLocation } from 'context';
import { CurrencyNumberFormat } from 'components';

const CartTotal = () => {
  const { subtotal } = useCart();
  const { rates } = useLocation();

  const rate = [...rates].reverse().find((rate) => rate.minimum <= subtotal);
  return (
    <List>
      <ListItem dense disableGutters>
        <ListItemText secondary={'Zwischensumme'} />
        <Typography component={'span'} variant={'body1'}>
          <CurrencyNumberFormat value={subtotal} />
        </Typography>
      </ListItem>
      <ListItem dense disableGutters>
        <ListItemText secondary={'Lieferung'} />
        <Typography component={'span'} variant={'body1'}>
          {rate && <CurrencyNumberFormat value={rate && rate.costs} />}
        </Typography>
      </ListItem>
      <ListItem dense disableGutters>
        <ListItemText secondary={'Gesamt'} />
        <Typography component={'span'} variant={'body1'}>
          {rate && (
            <CurrencyNumberFormat value={rate && subtotal + rate.costs} />
          )}
        </Typography>
      </ListItem>
    </List>
  );
};

export default CartTotal;
