import React, { useState } from 'react';
import { CurrencyNumberFormat } from 'components';
import { ExtraBox } from './components';
import {
  CardMedia,
  MenuItem,
  Button,
  Select,
  InputLabel,
  Typography,
  FormControl,
  Dialog,
  DialogContent
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useCart } from 'context';

const VariationDialog = (props) => {
  const {
    image,
    variation_groups,
    name,
    description,
    onClose,
    variants,
    open
  } = props;
  const initialSelectedVariant = variants.find(
    (variant) => variant.default === true
  );

  const [extras, setExtras] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(
    initialSelectedVariant
  );
  const { addCartPosition } = useCart();

  const findVariant = (id, value) => {
    return variants.find((variant) =>
      variant.variations.every((variation) =>
        selectedVariant.variations
          .map((item) =>
            item.variation_group_id === parseInt(id) ? value : item.id
          )
          .includes(variation.id)
      )
    );
  };

  const handleChange = (event) => {
    setSelectedVariant(findVariant(event.target.name, event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addCartPosition({
      food: props,
      variant_id: selectedVariant.id,
      extras: extras,
      price: selectedVariant.price
    });
    onClose();
  };

  const handleOnExited = () => {
    setSelectedVariant(initialSelectedVariant);
    setExtras([]);
  };

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      onExited={handleOnExited}
      open={open}
      scroll={'body'}>
      {image && <CardMedia image={image} />}
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Typography component={'h5'} gutterBottom variant={'h5'}>
            {name}
          </Typography>
          <Typography color={'textSecondary'} variant={'body1'}>
            {description}
          </Typography>
          {variation_groups.map((group) => {
            return (
              <FormControl
                fullWidth
                key={group.id}
                margin={'normal'}
                variant={'filled'}>
                <InputLabel>{group.name}</InputLabel>
                <Select
                  label={group.name}
                  name={group.id.toString()}
                  onChange={handleChange}
                  value={
                    selectedVariant.variations.find(
                      (variation) => variation.variation_group_id === group.id
                    ).id
                  }>
                  {group.variations.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}{' '}
                      <CurrencyNumberFormat
                        difference
                        value={
                          findVariant(group.id, option.id).price -
                          selectedVariant.price
                        }
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          })}
          {selectedVariant.extra_group_id && (
            <ExtraBox
              extra_group_id={selectedVariant.extra_group_id}
              extras={extras}
              setExtras={setExtras}
            />
          )}
          <Button
            className={'box-t'}
            color={'primary'}
            fullWidth
            size={'large'}
            type={'submit'}
            variant={'contained'}>
            Hinzufügen (
            <CurrencyNumberFormat
              value={
                selectedVariant.price +
                extras.map((extra) => extra.price).reduce((a, b) => a + b, 0)
              }
            />
            )
          </Button>
          <Button
            className={'box-t'}
            fullWidth
            onClick={onClose}
            size={'large'}
            variant={'outlined'}>
            Zurück
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

VariationDialog.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  variants: PropTypes.array.isRequired,
  variation_groups: PropTypes.array.isRequired
};

export default VariationDialog;
