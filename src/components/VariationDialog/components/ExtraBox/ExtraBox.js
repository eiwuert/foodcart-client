import React from 'react';
import {
  FormControl,
  Checkbox,
  FormControlLabel,
  /*Button, */
  FormGroup
} from '@material-ui/core';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useMenu } from 'context';
import PropTypes from 'prop-types';
import CurrencyNumberFormat from 'components/CurrencyNumberFormat';

const ExtraBox = (props) => {
  const { extras, setExtras } = props;
  const { extra_groups } = useMenu();
  const { extra_group_id } = props;
  const extra_group = extra_groups.find((group) => group.id === extra_group_id);
  const handleChange = (event) => {
    event.persist();
    const id = parseInt(event.target.name);
    event.target.checked
      ? setExtras(
          extras.concat(extra_group.extras.find((extra) => extra.id === id))
        )
      : setExtras([...extras.filter((extra) => extra.id !== id)]);
  };

  //const classes = useStyles();
  return (
    extra_group && (
      <FormControl fullWidth margin={'normal'}>
        <FormGroup>
          {extra_group.extras.map((extra) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={extras.map((extra) => extra.id).includes(extra.id)}
                  name={String(extra.id)}
                  onChange={handleChange}
                />
              }
              key={extra.id}
              label={
                <>
                  {extra.name}{' '}
                  <CurrencyNumberFormat difference value={extra.price} />
                </>
              }
            />
          ))}
        </FormGroup>
        {/*<Button
                    color="primary"
                    startIcon={<ExpandMoreIcon />}
                >
                    Weitere 23 anzeigen
                </Button>*/}
      </FormControl>
    )
  );
};

ExtraBox.propTypes = {
  extra_group_id: PropTypes.number.isRequired,
  extras: PropTypes.array.isRequired,
  setExtras: PropTypes.func.isRequired
};

export default ExtraBox;
