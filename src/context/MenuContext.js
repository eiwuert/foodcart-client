import axios from 'axios';
import React, { useContext, createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MenuContext = createContext([]);

export default MenuContext;

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = (props) => {
  const [menu, setMenu] = useState({
    categories: [],
    extra_groups: [],
    loaded: false
  });

  useEffect(() => {
    axios.get(process.env.REACT_APP_HOST + '/api/menu').then((response) => {
      setMenu({ ...response.data, loaded: true });
    });
  }, []);

  return (
    <MenuContext.Provider value={{ ...menu }}>
      {props.children}
    </MenuContext.Provider>
  );
};

MenuProvider.propTypes = {
  children: PropTypes.object.isRequired
};
