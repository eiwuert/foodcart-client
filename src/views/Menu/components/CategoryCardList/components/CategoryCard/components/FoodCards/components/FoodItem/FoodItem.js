import React, { useState } from 'react';
import {
  CurrencyNumberFormat,
  VariationDialog,
  ClickableCard
} from 'components';
import PropTypes from 'prop-types';
import { CardContent, Grid, Typography, CardMedia } from '@material-ui/core';
import LazyLoad from 'react-lazyload';
import { useCart } from 'context';

const FoodItem = (props) => {
  const { addCartPosition } = useCart();
  const [drawerVisible, setDrawerVisible] = useState(false);

  return React.useMemo(() => {
    const {
      number,
      image,
      name,
      description,
      variants,
      variation_groups
    } = props; // id
    const showNumber = process.env.REACT_APP_SHOW_NUMBER === 'TRUE';
    const hasVariants = variation_groups.length > 0;
    const hasExtras = variants.some(
      (variant) => variant.extra_group_id != null
    );
    const has = hasVariants || hasExtras;

    const handleClick = () => {
      if (has) {
        setDrawerVisible(true);
      } else {
        addCartPosition({
          food: props,
          variant_id: variants[0].id,
          extras: [],
          price: variants[0].price
        });
      }
    };

    const handleClose = () => {
      setDrawerVisible(false);
    };

    return (
      <>
        <Grid item lg={4} sm={6} xs={12}>
          <ClickableCard onClick={handleClick}>
            {image && (
              <LazyLoad
                height={parseInt(process.env.REACT_APP_IMAGE_HEIGHT)}
                offset={parseInt(process.env.REACT_APP_IMAGE_HEIGHT) * 2}
                once>
                <CardMedia image={image} title={name} />
              </LazyLoad>
            )}
            <CardContent>
              <Typography component={'p'} variant={'h5'}>
                {showNumber && number ? number + '. ' + name : name}
              </Typography>
              {description && (
                <Typography component={'span'} variant={'body2'}>
                  {description}
                </Typography>
              )}
              {has && (
                <Typography component={'p'} variant={'caption'}>
                  Wahl aus:{' '}
                  {variation_groups
                    .map((group) => group.name)
                    .concat(hasExtras ? 'Extras' : [])
                    .join(', ')}
                </Typography>
              )}
              <Typography
                color={'primary'}
                component={'p'}
                noWrap
                variant={'body1'}>
                <CurrencyNumberFormat
                  value={variants.find((variant) => variant.default).price}
                />
              </Typography>
            </CardContent>
          </ClickableCard>
        </Grid>
        {has && (
          <VariationDialog
            addCartPosition={addCartPosition}
            onClose={handleClose}
            open={drawerVisible}
            {...props}
          />
        )}
      </>
    );
  }, [props, drawerVisible]);
};

FoodItem.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  number: PropTypes.string,
  variants: PropTypes.array.isRequired,
  variation_groups: PropTypes.array.isRequired
};

export default FoodItem;
