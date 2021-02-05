import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, ButtonBase } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  card: {
    borderRadius: 16
  },
  button: {
    textAlign: 'initial',
    display: 'block',
    width: '100%'
  }
}));

const ClickableCard = (props) => {
  const { children, onClick, ...rest } = props;
  const classes = useStyles();

  return (
    <Card {...rest} className={classes.card}>
      <ButtonBase className={classes.button} onClick={onClick}>
        {children}
      </ButtonBase>
    </Card>
  );
};

ClickableCard.propTypes = {
  children: PropTypes.any,
  elevation: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.number
};

export default ClickableCard;
