import React from 'react';
import { List } from '@material-ui/core';
import CartPosition from './components';
import { useCart } from 'context';

const CartList = () => {
  const { cart } = useCart();
  return (
    <List>
      {cart.map((position, index) => (
        <CartPosition index={index} key={index} {...position} />
      ))}
    </List>
  );
};

export default CartList;
