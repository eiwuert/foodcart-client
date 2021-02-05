import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const RestaurantContext = createContext([]);

export const useRestaurant = () => useContext(RestaurantContext);

export const RestaurantProvider = (props) => {
  const [restaurant, setRestaurant] = useState({
    opening_hours: {},
    informations: {},
    loaded: false
  });

  useEffect(() => {
    restaurant.loaded ||
      axios
        .get(process.env.REACT_APP_HOST + '/api/restaurant')
        .then((response) => {
          setRestaurant({ ...response.data, loaded: true });
        });
  }, [restaurant.loaded]);

  return (
    <RestaurantContext.Provider value={{ ...restaurant }}>
      {props.children}
    </RestaurantContext.Provider>
  );
};

RestaurantProvider.propTypes = {
  children: PropTypes.object.isRequired
};
