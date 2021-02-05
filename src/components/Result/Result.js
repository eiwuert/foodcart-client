import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { ClickableCard } from 'components';
import { CardContent, Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import { usePromptToInstall } from 'context';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: 'auto'
  },
  imageContainer: {
    marginTop: theme.spacing(3),
    display: 'flex'
  },
  image: {
    maxWidth: '100%',
    width: 140,
    margin: 'auto',
    color: theme.palette.primary.main,
    backgroundColor: `${theme.palette.secondary.main}22`,
    padding: 16,
    borderRadius: 16,
    height: 'auto'
  },
  hintImage: {
    width: 48,
    color: theme.palette.primary.main,
    backgroundColor: `${theme.palette.secondary.main}22`,
    padding: 8,
    marginRight: 8,
    borderRadius: 16,
    height: 'auto'
  },
  hint: {
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    margin: theme.spacing(3)
  },
  hintContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  }
}));

const EmptyCart = (props) => {
  const { icon, primary, secondary, homeButton } = props;
  const { deferredEvt } = usePromptToInstall();

  const addToHomeScreen = () => {
    deferredEvt?.prompt();
  };

  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Typography
          align={'center'}
          component={'h2'}
          gutterBottom
          variant={'h2'}>
          {primary}
        </Typography>
        <Typography
          align={'center'}
          color={'textSecondary'}
          component={'p'}
          variant={'body2'}>
          {secondary}
        </Typography>
        {props.children}
        <div className={classes.imageContainer}>
          {(icon === 'ErrorOutlineIcon' && (
            <ErrorOutlineIcon className={classes.image} />
          )) ||
            (icon === 'FastfoodOutlinedIcon' && (
              <FastfoodOutlinedIcon className={classes.image} />
            )) ||
            (icon === 'CheckCircleIcon' && (
              <CheckCircleIcon className={classes.image} />
            ))}
        </div>
        {homeButton && (
          <div className={'box'}>
            <Button
              component={RouterLink}
              fullWidth
              size={'large'}
              to={'/'}
              variant={'outlined'}>
              Schließen
            </Button>
          </div>
        )}
      </div>
      {deferredEvt && (
        <div className={classes.hint}>
          <ClickableCard onClick={addToHomeScreen} variant={'outlined'}>
            <CardContent className={`${classes.hintContent} add-to-homescreen`}>
              <AddToHomeScreenIcon className={classes.hintImage} />
              <div>
                <Typography component="p" variant="h6">
                  Nur für Feinschmecker
                </Typography>
                <Typography color="textSecondary">
                  Zum Start hinzufügen
                </Typography>
              </div>
            </CardContent>
          </ClickableCard>
        </div>
      )}
    </>
  );
};

EmptyCart.propTypes = {
  children: PropTypes.object,
  homeButton: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired
};

export default EmptyCart;
