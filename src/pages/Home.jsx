import React, { useEffect } from 'react';

import Navbar from '../components/Navbar';
import Title from '../components/Title';
import Slider from '../components/Slider';
import Categories from '../components/Category';
import SearchBar from '../components/ui/searchBar';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Home = ({ darkMode, setDarkMode }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Slider />
        <Title text={'Collections'} />
        <Categories />
        <Title text={'Products'} />
        <SearchBar />
        <Products />
        <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
