import React from 'react';
import PropTypes from 'prop-types';
import { FoodItem } from './components';

const FoodList = (props) => {
  const { food } = props;
  return (
    <>
      {food.map((item) => (
        <FoodItem key={item.id} {...item} />
      ))}
    </>
  );
};

FoodList.propTypes = {
  food: PropTypes.array.isRequired
};

export default FoodList;
