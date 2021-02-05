import React, { useContext, useEffect, createContext, useState } from 'react';
import { Typography, Button, Dialog, DialogContent } from '@material-ui/core';
import axios from 'axios';
import { LocationAutoComplete } from 'components';
import PropTypes from 'prop-types';

const LocationContext = createContext([]);

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = (props) => {
  const [location, setLocation] = useState(
    JSON.parse(localStorage.getItem('location'))
  );
  const [value, setValue] = useState();
  const [rates, setRates] = useState();

  useEffect(() => {
    if (!location) return;
    localStorage.setItem('location', JSON.stringify(location));
    if (!location.region_id) {
      setRates([]);
    }

    axios
      .get(process.env.REACT_APP_HOST + '/api/rates/' + location.postcode)
      .then((response) => {
        const rates = response.data;
        setRates(rates);
      });
  }, [location]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value) {
      setLocation(value);
    }
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        rates,
        setLocation
      }}>
      {props.children}
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        open={!location}
        scroll={'body'}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Typography component={'h5'} gutterBottom variant={'h5'}>
              Wohin soll dein Essen geliefert werden?
            </Typography>
            <LocationAutoComplete
              margin={'normal'}
              setValue={setValue}
              value={value}
            />
            <Button
              className={'box-t'}
              color={'primary'}
              disabled={!value}
              fullWidth
              size={'large'}
              type={'submit'}
              variant={'contained'}>
              Weiter
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </LocationContext.Provider>
  );
};

LocationProvider.propTypes = {
  children: PropTypes.object.isRequired
};
