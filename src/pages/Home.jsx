import React from 'react';
import Categories from '../components/Category';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import Slider from '../components/Slider';
import Footer from '../components/Footer';
import Videos from '../components/videos';

const Home = ({ darkMode, setDarkMode }) => {
  return (
    <div>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Videos />
      <Categories />
      <Slider />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
