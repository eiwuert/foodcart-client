import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const OpeningHour = (props) => {
  const { opening_hours, exceptionally_closed } = props;
  const date = new Date();
  const formatOpeningHour = (time) => {
    return Math.floor(time / 60) + ':' + ((time % 60) + '0').slice(0, 2);
  };
  return exceptionally_closed ? (
    <Typography color={'error'} component={'p'} gutterBottom variant={'body1'}>
      Heute außerordentlich geschlossen
    </Typography>
  ) : opening_hours[date.getDay()] ? (
    <Typography component={'p'} gutterBottom variant={'body1'}>
      {'Heute von ' +
        opening_hours[date.getDay()]
          .map(
            (item) =>
              formatOpeningHour(item.from) +
              ' bis ' +
              formatOpeningHour(item.to) +
              ' Uhr'
          )
          .join(' und von ')}
    </Typography>
  ) : (
    <Typography color={'error'} component={'p'} gutterBottom variant={'body1'}>
      Heute geschlossen
    </Typography>
  );
};

OpeningHour.propTypes = {
  exceptionally_closed: PropTypes.bool.isRequired,
  opening_hours: PropTypes.object.isRequired
};

export default OpeningHour;
