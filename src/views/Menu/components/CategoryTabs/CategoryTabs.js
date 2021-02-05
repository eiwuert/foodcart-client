import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Tabs, Tab } from '@material-ui/core';
import { useMenu } from 'context';

const useStyles = makeStyles((theme) => ({
  root: {
    top: 0,
    backgroundColor: `${theme.palette.background.default}fa`,
    position: 'sticky',
    zIndex: 100
  }
}));

const CategoryTabs = () => {
  const [state, setState] = React.useState(false);
  const classes = useStyles();
  const { categories, loaded } = useMenu();

  const handleChange = (event, newValue) => {
    setState(newValue);
    const anchor =
      document.querySelector(`#category-${newValue}`).getBoundingClientRect()
        .y +
      window.pageYOffset -
      parseInt(process.env.REACT_APP_IMAGE_HEIGHT) / 2;
    if (anchor) {
      window.scrollTo(0, anchor);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const item = [...categories]
        .reverse()
        .find(
          (item) =>
            document
              .querySelector(`#category-${item.id}`)
              .getBoundingClientRect().y -
              80 <=
            0
        );
      item ? setState(item.id) : setState(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

  return (
    <div className={classes.root}>
      {loaded && (
        <Tabs
          indicatorColor={'primary'}
          onChange={handleChange}
          scrollButtons={'auto'}
          value={state}
          variant={'scrollable'}>
          {categories.map((category) => (
            <Tab key={category.id} label={category.name} value={category.id} />
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default CategoryTabs;
