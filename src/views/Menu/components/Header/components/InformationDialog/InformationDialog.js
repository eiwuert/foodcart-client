import React from 'react';
import {
  Dialog,
  Button,
  Link,
  Typography,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import PropTypes from 'prop-types';

const InformationDialog = (props) => {
  const {
    name,
    onClose,
    representative,
    authority,
    vat_id,
    city,
    street,
    country,
    ...rest
  } = props;
  return (
    <Dialog fullWidth onClose={onClose} {...rest} scroll={'body'}>
      <DialogContent>
        <Typography component={'h2'} gutterBottom variant={'h2'}>
          Informationen
        </Typography>
        <DialogContentText>
          {representative} handelt im Namen von {name}
          <br />
          {street}
          <br />
          {city}
          <br />
          {country}
          <br />
          <br />
          Umsatzsteuer-ID
          <br />
          {vat_id}
          <br />
          Aufsichtsbehörde
          <br />
          {authority}
          <br />
          <br />
          <Link href={'https://ec.europa.eu/consumers/odr'}>
            Plattform der EU-Kommission zur Online-Streitbeilegung
          </Link>
          <br />
          <br />
          Made with ❤ in Kassel
          <br />
          by <Link href={'mailto:habibhaidari@outlook.com'}>Habib Haidari</Link>
          <br />
        </DialogContentText>
        <Button
          className={'box-t'}
          color={'primary'}
          fullWidth
          onClick={onClose}
          size={'large'}
          variant={'contained'}>
          Schließen
        </Button>
      </DialogContent>
    </Dialog>
  );
};

InformationDialog.propTypes = {
  authority: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  representative: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  vat_id: PropTypes.string.isRequired
};

export default InformationDialog;
