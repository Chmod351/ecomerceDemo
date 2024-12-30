import { useEffect } from 'react';
import styled from 'styled-components';
import Slider from '../components/Slider';
import Title from '../components/common/Title';
import Footer from '../components/common/Footer';
import Products from '../components/Products';
import SearchBar from '../components/ui/searchBar';
{
	/* import Categories from '../components/Category'; */
}
{
	/* import Newsletter from '../components/Newsletter'; */
}

const Container = styled.div`
	background-color: ${({ theme }) => theme.bg};
`;
const Home = ({ darkMode, setDarkMode }) => {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	return (
		<Container>
			{/*  <Slider /> */}
			{/*     <Title text={'Collections'} /> */}
			{/*  <Categories /> */}
			<Title text={'Products'} />
			{/*    <SearchBar /> */}
			<Products />
			{/*   <Newsletter /> */}
		</Container>
	);
};

export default Home;
