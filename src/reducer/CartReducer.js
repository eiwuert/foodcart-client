import {
  ADD_CART_POSITION,
  DELETE_CART_POSITION,
  EMPTY_CART,
  DECREMENT_CART_POSITION,
  INCREMENT_CART_POSITION
} from 'types';

const comparePositions = (pos, pos2) => {
  return (
    pos.variant_id === pos2.variant_id &&
    pos.extras.length === pos2.extras.length &&
    pos.extras.every((extra) => pos2.extras.includes(extra))
  );
};

const addCartPosition = (pos1, state) => {
  const doubled = state.findIndex((pos2) => comparePositions(pos1, pos2));
  return (
    (doubled !== -1 &&
      state.map((pos, i) =>
        i === doubled ? { ...pos, quantity: pos.quantity + 1 } : pos
      )) ||
    state.concat({ ...pos1, quantity: 1 })
  );
};

const decrementCartPosition = (position, state) => {
  return state.map((pos, index) =>
    index === position ? { ...pos, quantity: pos.quantity - 1 } : pos
  );
};

const incrementCartPosition = (position, state) => {
  return state.map((pos, index) =>
    index === position ? { ...pos, quantity: pos.quantity + 1 } : pos
  );
};

const deleteCartPosition = (position, state) => {
  return state.filter((item, index) => index !== position);
};
const emptyCart = () => {
  return [];
};

export default (state, action) => {
  switch (action.type) {
    case ADD_CART_POSITION:
      return addCartPosition(action.payload, state);
    case DELETE_CART_POSITION:
      return deleteCartPosition(action.payload, state);
    case EMPTY_CART:
      return emptyCart();
    case DECREMENT_CART_POSITION:
      return decrementCartPosition(action.payload, state);
    case INCREMENT_CART_POSITION:
      return incrementCartPosition(action.payload, state);
    default:
      return state;
  }
};
