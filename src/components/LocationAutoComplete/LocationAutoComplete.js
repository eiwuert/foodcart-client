import React, { useState, useEffect } from 'react';
import { Typography, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios';
import PropTypes from 'prop-types';

const LocationAutoComplete = (props) => {
  const { value, margin, setValue, error, disabled } = props;
  const [inputValue, setInputValue] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    inputValue?.length > 2 &&
      axios
        .get(
          process.env.REACT_APP_HOST +
            '/api/postcodes/' +
            inputValue.substring(0, 5)
        )
        .then((response) => {
          setOptions(response.data);
        });
  }, [inputValue]);

  const handleOnChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOnInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  return (
    <Autocomplete
      disabled={disabled}
      getOptionLabel={(option) => option && option.postcode + ' ' + option.name}
      getOptionSelected={(option, value) => {
        return option.id === value.id;
      }}
      noOptionsText={'Keinen Ort gefunden'}
      onChange={handleOnChange}
      onInputChange={handleOnInputChange}
      openOnFocus
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          disabled={disabled}
          error={error}
          fullWidth
          label={'Postleitzahl'}
          margin={margin}
          variant={'filled'}
        />
      )}
      renderOption={(option) => (
        <Typography noWrap>{option.postcode + ' ' + option.name}</Typography>
      )}
      value={value || ''}
    />
  );
};

LocationAutoComplete.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  margin: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.object
};

export default LocationAutoComplete;
