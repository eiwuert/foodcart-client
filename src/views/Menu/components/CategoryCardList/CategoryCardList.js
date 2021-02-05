import React from 'react';
import { CategoryCard } from './components';
import { useMenu } from 'context';
import { Container } from '@material-ui/core';

const CategoryCardList = () => {
  const { categories } = useMenu();

  return (
    <Container maxWidth={'md'}>
      {categories.map((item) => (
        <CategoryCard key={item.id} {...item} />
      ))}
    </Container>
  );
};
export default CategoryCardList;
