import React, { useEffect } from 'react';
import Categories from '../components/Category';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import Slider from '../components/Slider';
import Footer from '../components/Footer';
import Announcement from '../components/Announcement';
import SearchBar from '../components/searchBar';

const Home = ({ darkMode, setDarkMode }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <div>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Announcement />
      <Slider />
      <Categories />
      <SearchBar />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
