import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { CurrencyNumberFormat } from 'components';

const RateMessage = (props) => {
  const { rates, total } = props;
  const minimum = !rates[0] || rates[0].minimum;
  return rates.length === 0 ? (
    <Typography color={'error'} component={'p'} variant={'body1'}>
      Wir liefern nicht zu deiner Postleitzahl.
    </Typography>
  ) : (
    minimum > total && (
      <Typography color={'error'} component={'p'} variant={'body1'}>
        Leider kannst Du noch nicht bestellen. Wir liefern erst ab einem
        Mindestbestellwert von {<CurrencyNumberFormat value={minimum} />} zu
        deiner Postleitzahl.
      </Typography>
    )
  );
};

RateMessage.propTypes = {
  rates: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired
};

export default RateMessage;
