import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Category";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Home = ({darkMode,setDarkMode}) => {
  return (
    <div>
      <Announcement />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />      <Slider />
      <Categories />
      <Products/>
      <Newsletter/>
    </div>
  );
};

export default Home;