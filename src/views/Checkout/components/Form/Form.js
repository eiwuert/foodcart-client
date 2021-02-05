import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import MuiAlert from '@material-ui/lab/Alert';
import {
  Snackbar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  CardContent,
  Typography,
  Link,
  Button,
  CircularProgress,
  TextField
} from '@material-ui/core';
import { useCart, useLocation, useRestaurant } from 'context';
import axios from 'axios';
import { LocationAutoComplete } from 'components';
import { Schema, TermsDialog } from './components';

const Form = (props) => {
  const { cart, subtotal } = useCart();
  const { opening_hours, methods, informations } = useRestaurant();
  const { closed } = informations;
  const { rates, location, setLocation } = useLocation();
  const history = props.history;
  const debugMode = process.env.REACT_APP_DEBUG_MODE === 'TRUE';

  const [state, setState] = React.useState({
    isValid: false,
    isLoading: false,
    values: {
      method_id: '',
      location: location,
      floor: '',
      notes: '',
      delivery: ''
    },
    touched: {},
    errors: {},
    failed: false,
    openToday: false,
    filteredTimes: []
  });

  useEffect(() => {
    const date = new Date();
    const now = (date.getHours() % 24) * 60 + date.getMinutes();
    const openToday =
      debugMode ||
      (closed
        ? false
        : opening_hours[date.getDay()]?.some(
            (day) => now >= day.from && now <= day.to
          ));
    setState((state) => ({
      ...state,
      filteredTimes: closed
        ? []
        : opening_hours[date.getDay()]
        ? Array.from(Array(96).keys())
            .map((key) => key * 15)
            .filter((time) => time > now + 30)
            .filter((time2) =>
              opening_hours[date.getDay()].some(
                (opening) => time2 >= opening.from && time2 <= opening.to
              )
            )
        : [],
      openToday: openToday,
      values: {
        ...state.values,
        delivery: openToday ? -1 : ''
      }
    }));
  }, [opening_hours, debugMode, setState]);

  useEffect(() => {
    const errors = validate(state.values, Schema);
    setState((state) => ({
      ...state,
      isValid: !errors,
      errors: errors || {}
    }));
  }, [state.values]);
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    setState((state) => ({
      ...state,
      values: {
        ...state.values,
        method_id: methods?.find((method) => method.default).id || ''
      }
    }));
  }, [methods, setState]);

  useEffect(() => {
    state.values.location && setLocation(state.values.location);
  }, [state.values.location, setLocation]);

  const handleOpen = () => {
    setDialogVisible(true);
  };

  const handleClose = () => {
    setDialogVisible(false);
  };

  const handleSnackbarClose = () => {
    setState({ ...state, failed: false });
  };

  const handleChangeValue = (event) => {
    event.persist();
    setState((state) => ({
      ...state,
      values: {
        ...state.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...state.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleChangeLocation = (loc) => {
    setState((state) => ({
      ...state,
      values: {
        ...state.values,
        location: loc
      },
      touched: {
        ...state.touched,
        location: true
      }
    }));
  };

  const hasError = (field) => !!(state.touched[field] && state.errors[field]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.isValid) {
      setState({ ...state, isValid: false, isLoading: true });
      axios
        .post(process.env.REACT_APP_HOST + '/api/orders', {
          data: { ...state.values, cart: cart }
        })
        .then((response) => {
          if (state.values.method_id === 3) {
            window.location.href = response.data;
          } else {
            history.push('/checkout/result');
          }
        })
        .catch(() => {
          setState({ ...state, failed: true, isValid: true, isLoading: false });
        });
    }
  };

  return (
    <div>
      {!location && <Redirect to={'/'} />}
      {rates && (rates.length === 0 || subtotal < rates[0].minimum) && (
        <Redirect to={'/cart'} />
      )}
      <Card elevation={0}>
        <CardContent>
          <Typography align={'center'} gutterBottom variant={'h2'}>
            Bestellung abschließen
          </Typography>
          <Typography
            align={'center'}
            color={
              state.openToday || state.filteredTimes.length > 0
                ? 'textSecondary'
                : 'error'
            }
            component={'p'}
            gutterBottom
            variant={'body1'}>
            {state.openToday
              ? "Auf geht's! "
              : 'Du bestellst außerhalb unserer Lieferzeiten. '}
            {!state.openToday &&
              (state.filteredTimes.length > 0
                ? 'Wähle den Zeitpunkt aus, an dem du deine Lieferung erhalten möchtest. '
                : 'Wir liefern heute nicht. ')}
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              disabled={state.filteredTimes.length === 0 && !state.openToday}
              error={hasError('street')}
              fullWidth
              label={'Straße Hausnummer *'}
              margin={'dense'}
              name={'street'}
              onChange={handleChangeValue}
              value={state.values.street}
              variant={'filled'}
            />
            <LocationAutoComplete
              disabled={state.filteredTimes.length === 0 && !state.openToday}
              error={hasError('location')}
              margin={'dense'}
              setValue={handleChangeLocation}
              value={state.values.location}
            />
            <TextField
              disabled={state.filteredTimes.length === 0 && !state.openToday}
              error={hasError('floor')}
              fullWidth
              label={'Etage'}
              margin={'dense'}
              name={'floor'}
              onChange={handleChangeValue}
              value={state.values.floor}
              variant={'filled'}
            />
            <TextField
              disabled={state.filteredTimes.length === 0 && !state.openToday}
              error={hasError('name')}
              fullWidth
              label={'Name *'}
              margin={'dense'}
              name={'name'}
              onChange={handleChangeValue}
              value={state.values.name}
              variant={'filled'}
            />
            <TextField
              disabled={state.filteredTimes.length === 0 && !state.openToday}
              error={hasError('phone')}
              fullWidth
              label={'Telefonnummer *'}
              margin={'dense'}
              name={'phone'}
              onChange={handleChangeValue}
              value={state.values.phone}
              variant={'filled'}
            />
            <TextField
              disabled={state.filteredTimes.length === 0 && !state.openToday}
              error={hasError('email')}
              fullWidth
              label={'E-Mail *'}
              margin={'dense'}
              name={'email'}
              onChange={handleChangeValue}
              value={state.values.email}
              variant={'filled'}
            />
            <TextField
              disabled={state.filteredTimes.length === 0 && !state.openToday}
              error={hasError('notes')}
              fullWidth
              label={'Anmerkungen'}
              margin={'dense'}
              multiline
              name={'notes'}
              onChange={handleChangeValue}
              rows={4}
              value={state.values.notes}
              variant={'filled'}
            />
            <FormControl
              disabled={state.filteredTimes.length === 0 && !state.openToday}
              fullWidth
              margin={'dense'}
              variant={'filled'}>
              <InputLabel>Lieferung*</InputLabel>
              <Select
                label={'Lieferung*'}
                name={'delivery'}
                onChange={handleChangeValue}
                value={state.values.delivery}>
                {state.openToday && (
                  <MenuItem value={-1}>So schnell wie möglich</MenuItem>
                )}
                {state.filteredTimes.map((filteredTime) => (
                  <MenuItem key={filteredTime} value={filteredTime}>
                    {Math.floor(filteredTime / 60)}:
                    {('0' + (filteredTime % 60)).slice(-2)} Uhr
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              disabled={state.filteredTimes.length === 0 && !state.openToday}
              fullWidth
              margin={'dense'}
              variant={'filled'}>
              <InputLabel>Bezahlart*</InputLabel>
              <Select
                label={'Bezahlart*'}
                name={'method_id'}
                onChange={handleChangeValue}
                value={state.values.method_id}>
                {methods?.map((method) => (
                  <MenuItem key={method.id} value={method.id}>
                    {method.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography
              className={'box-t'}
              color={'textSecondary'}
              component={'p'}
              gutterBottom
              variant={'body1'}>
              Durch das Fortfahren bestätigst du den Warenkorb und Deine
              eingegeben Daten und stimmst unseren{' '}
              <Link onClick={handleOpen}>AGBs</Link> zu.
            </Typography>
            <Button
              className={'box-t'}
              color={'primary'}
              disabled={!state.isValid}
              fullWidth
              size={'large'}
              startIcon={state.isLoading && <CircularProgress size={20} />}
              type={'submit'}
              variant={'contained'}>
              {state.values.method_id && state.values.method_id === 3
                ? 'Bestellen & Weiter zu PayPal'
                : 'Zahlungspflichtig bestellen'}
            </Button>
            <Button
              className={'box-t'}
              component={RouterLink}
              fullWidth
              size={'large'}
              to={'/cart'}
              variant={'outlined'}>
              Zurück
            </Button>
          </form>
        </CardContent>
      </Card>
      <TermsDialog onClose={handleClose} visible={dialogVisible} />
      <Snackbar
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        open={state.failed}>
        <MuiAlert elevation={6} severity={'error'} variant={'filled'}>
          {'Deine Bestellung konnte nicht aufgegeben werden'}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

Form.propTypes = {
  history: PropTypes.object.isRequired
};

export default Form;
