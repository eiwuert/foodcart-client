import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  CardContent,
  CardActions,
  Button,
  Link,
  Typography
} from '@material-ui/core';
import { useLocation, useRestaurant } from 'context';
import PhoneIcon from '@material-ui/icons/Phone';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import DraftsIcon from '@material-ui/icons/Drafts';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import RoomIcon from '@material-ui/icons/Room';
import SmsFailedIcon from '@material-ui/icons/SmsFailed';
import { OpeningHour, InformationDialog } from './components';

const useStyles = makeStyles(() => ({
  alignRight: {
    margin: 'auto',
    height: 40
  }
}));

const Header = () => {
  const { loaded, informations, opening_hours } = useRestaurant();
  const { closed } = informations || false;
  const {
    allergens,
    name,
    logo,
    description,
    contact_tel,
    contact_wa,
    contact_mail,
    contact_bug
  } = informations;
  const [open, setOpen] = useState(false);
  const { setLocation, location } = useLocation();
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLocation = () => {
    setLocation();
  };

  return (
    <>
      <Container maxWidth={'md'}>
        <CardActions>
          <Button
            className={classes.alignRight}
            onClick={handleLocation}
            startIcon={<RoomIcon color={'action'} />}>
            {location && location.postcode + ' ' + location.name}
          </Button>
        </CardActions>
        <CardContent>
          <Typography component={'h1'} gutterBottom variant={'h1'}>
            {loaded && (
              logo ? (
                <img alt={name} src={logo} />
              ) : (
                name
              )
            )}
          </Typography>
          <Typography
            color={'textSecondary'}
            component={'p'}
            gutterBottom
            variant={'body1'}>
            {loaded && description }
          </Typography>
          {loaded && (
            opening_hours && (
              <OpeningHour
                exceptionally_closed={closed}
                opening_hours={opening_hours}
              />
            )
          )}
          {allergens && (
            <Typography component={'p'} variant={'body1'}>
              Entnehmen Sie die Allergene aus unserer{' '}
              <Link href={allergens}>Karte</Link>
            </Typography>
          )}
        </CardContent>
        <CardActions>
          {contact_wa && (
            <Button
              color={'primary'}
              href={contact_wa}
              startIcon={<WhatsAppIcon />}>
              WhatsApp
            </Button>
          )}
          {contact_mail && (
            <Button
              color={'primary'}
              href={contact_mail}
              startIcon={<DraftsIcon />}>
              E-Mail
            </Button>
          )}
          {contact_tel && (
            <Button
              color={'primary'}
              href={contact_tel}
              startIcon={<PhoneIcon />}>
              Anrufen
            </Button>
          )}
          {contact_bug && (
            <Button
              color={'primary'}
              href={contact_bug}
              startIcon={<SmsFailedIcon />}>
              Bugs
            </Button>
          )}
          {loaded && (
            <Button
              color={'primary'}
              onClick={handleOpen}
              startIcon={<InfoOutlined />}>
              Info
            </Button>
          )}
        </CardActions>
      </Container>
      {loaded && (
        <InformationDialog
          onClose={handleClose}
          open={open}
          {...informations}
        />
      )}
    </>
  );
};

export default Header;
