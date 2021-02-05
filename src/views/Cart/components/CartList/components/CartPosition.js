import React from 'react';
import { useCart } from 'context';
import { CurrencyNumberFormat } from 'components';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import RemoveIcon from '@material-ui/icons/Remove';
import PropTypes from 'prop-types';

const CartPosition = (props) => {
  const { food, variant_id, index, quantity, price, extras } = props;
  const {
    deleteCartPosition,
    decrementCartPosition,
    incrementCartPosition
  } = useCart();

  const handleDecrementCartPosition = () => {
    quantity > 1 ? decrementCartPosition(index) : deleteCartPosition(index);
  };

  const handleIncrementCartPosition = () => {
    incrementCartPosition(index);
  };

  return (
    <ListItem disableGutters divider>
      <ListItemIcon>
        <IconButton onClick={handleIncrementCartPosition} size={'small'}>
          <AddIcon color={'primary'} />
        </IconButton>
        <IconButton onClick={handleDecrementCartPosition} size={'small'}>
          {quantity === 1 ? (
            <DeleteOutlineIcon color={'primary'} />
          ) : (
            <RemoveIcon color={'primary'} />
          )}
        </IconButton>
      </ListItemIcon>
      <ListItemText
        primary={
          <>
            <Typography color={'textSecondary'} variant={'body2'}>
              {quantity}x
            </Typography>
            <Typography component={'p'} variant={'h5'}>
              {food.name}
            </Typography>
          </>
        }
        secondary={
          <>
            <Typography component={'span'} variant={'body2'}>
              {food.variants
                .find((variant) => variant.id === variant_id)
                .variations.map((variation) => variation.name)
                .concat(extras.map((extra) => extra.name))
                .join(', ')}
            </Typography>
          </>
        }
      />
      <Typography color={'primary'} component={'span'} noWrap variant={'body1'}>
        <CurrencyNumberFormat
          value={
            (price +
              extras.map((extra) => extra.price).reduce((a, b) => a + b, 0)) *
            quantity
          }
        />
      </Typography>
    </ListItem>
  );
};

CartPosition.propTypes = {
  extras: PropTypes.array.isRequired,
  food: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  variant_id: PropTypes.number.isRequired
};

export default CartPosition;
