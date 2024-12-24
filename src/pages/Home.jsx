import { useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import Slider from '../components/Slider';
import Title from '../components/common/Title';
import Footer from '../components/common/Footer';
import Products from '../components/Products';
import SearchBar from '../components/ui/searchBar';
{/* import Categories from '../components/Category'; */}
{/* import Newsletter from '../components/Newsletter'; */}


const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
`;
const Home = ({ darkMode, setDarkMode }) => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Container>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
     {/*  <Slider /> */}
  {/*     <Title text={'Collections'} /> */}
     {/*  <Categories /> */}
      <Title text={'Products'} />
      <SearchBar />
      <Products />
     {/*   <Newsletter /> */}
      <Footer />
    </Container>
  );
};

export default Home;
