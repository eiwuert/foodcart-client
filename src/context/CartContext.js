import React, {
  useState,
  useEffect,
  createContext,
  useReducer,
  useContext
} from 'react';
import { CartReducer } from 'reducer';
import {
  EMPTY_CART,
  ADD_CART_POSITION,
  DELETE_CART_POSITION,
  DECREMENT_CART_POSITION,
  INCREMENT_CART_POSITION
} from 'types';
import PropTypes from 'prop-types';

const CartContext = createContext([]);

export default CartContext;

export const useCart = () => useContext(CartContext);

export const CartProvider = (props) => {
  const useSessionStorage =
    process.env.REACT_APP_USE_SESSION_STORAGE === 'TRUE';
  const [state, dispatch] = useReducer(
    CartReducer,
    JSON.parse(
      useSessionStorage
        ? sessionStorage.getItem('cart')
        : localStorage.getItem('cart')
    ) || []
  );

  const [subtotal, setSubtotal] = useState(0);

  const addCartPosition = (categories) => {
    dispatch({
      payload: categories,
      type: ADD_CART_POSITION
    });
  };
  const deleteCartPosition = (index) => {
    dispatch({
      payload: index,
      type: DELETE_CART_POSITION
    });
  };
  const incrementCartPosition = (index) => {
    dispatch({
      payload: index,
      type: INCREMENT_CART_POSITION
    });
  };
  const decrementCartPosition = (index) => {
    dispatch({
      payload: index,
      type: DECREMENT_CART_POSITION
    });
  };
  const emptyCart = () => {
    dispatch({
      type: EMPTY_CART
    });
  };

  useEffect(() => {
    setSubtotal(
      state
        .map(
          (position) =>
            (position.price +
              position.extras
                .map((extra) => extra.price)
                .reduce((a, b) => a + b, 0)) *
            position.quantity
        )
        .reduce((a, b) => a + b, 0)
    );
  }, [state]);

  useEffect(() => {
    useSessionStorage
      ? sessionStorage.setItem('cart', JSON.stringify(state))
      : localStorage.setItem('cart', JSON.stringify(state));
  }, [state, useSessionStorage]);

  return (
    <CartContext.Provider
      value={{
        cart: state,
        subtotal: subtotal,
        addCartPosition,
        decrementCartPosition,
        deleteCartPosition,
        emptyCart,
        incrementCartPosition
      }}>
      {props.children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.object.isRequired
};
