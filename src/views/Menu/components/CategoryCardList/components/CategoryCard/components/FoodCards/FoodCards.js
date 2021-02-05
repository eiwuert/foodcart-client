import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { FoodItem } from './components';

const FoodCards = (props) => {
  const { food } = props;
  return (
    <Grid container spacing={3}>
      {food.map((item) => (
        <FoodItem key={item.id} {...item} />
      ))}
    </Grid>
  );
};

FoodCards.propTypes = {
  food: PropTypes.array.isRequired
};

export default FoodCards;
