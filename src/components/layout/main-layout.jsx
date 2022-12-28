import React from 'react';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

const MainLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default MainLayout;
