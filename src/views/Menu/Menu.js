import React from 'react';
import { Header, CategoryCardList, Footer, CategoryTabs } from './components';
const Menu = () => {
  return (
    <>
      <Header />
      <CategoryTabs />
      <CategoryCardList />
      <Footer />
    </>
  );
};

export default Menu;
