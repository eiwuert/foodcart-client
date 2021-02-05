import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FoodList, FoodCards } from './components';
import LazyLoad from 'react-lazyload';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: 16
  }
}));

const CategoryCards = (props) => {
  const { id, type, name, description, food, image, ...rest } = props;
  const classes = useStyles();
  return (
    <>
      <Card
        className={classes.root}
        elevation={0}
        {...rest}
        id={`category-${id}`}>
        {image && (
          <LazyLoad
            height={parseInt(process.env.REACT_APP_IMAGE_HEIGHT)}
            offset={parseInt(process.env.REACT_APP_IMAGE_HEIGHT) * 2}
            once>
            <CardMedia image={image} title={name} />
          </LazyLoad>
        )}
      </Card>
      {name && (
        <Typography
          className={'box-lr'}
          color={'primary'}
          component={'h2'}
          gutterBottom={!description}
          variant={'h2'}>
          {name}
        </Typography>
      )}
      {description && (
        <Typography className={'box-lr'} color={'primary'} gutterBottom>
          {description}
        </Typography>
      )}
      {type === 'LIST' ? <FoodList food={food} /> : <FoodCards food={food} />}
    </>
  );
};

CategoryCards.propTypes = {
  description: PropTypes.string,
  food: PropTypes.array,
  id: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string
};

export default CategoryCards;
