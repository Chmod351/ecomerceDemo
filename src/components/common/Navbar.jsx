import React, { useEffect } from 'react';
import { Badge } from '@material-ui/core';
import {
	ShoppingCartOutlined,
	ShoppingCart,
	Brightness7,
	Brightness2,
	MenuRounded,
} from '@material-ui/icons';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { mobile, pc } from '../../responsive';
import { e } from '../../utils/data/navbarData';
import { logoutUser } from '../../utils/logic/users.js';
// ui
// import Prompt from './ui/Prompt';
import Announcement from './Announcement';
import SearchBar from '../ui/searchBar';
import Prompt from '../ui/Prompt';

const Container = styled.nav`
	color: ${({ theme }) => theme.text};
	background-color: ${({ theme }) => theme.bg};
	height: 6rem;
	display: flex;
	align-items: center;
	text-align: center;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	${mobile({
		top: '0',
		position: 'fixed',
		zIndex: '999',
		width: '100vw',
	})}
	${pc({
		maxWidth: '100vw',
	})}
`;

const Wrapper = styled.section`
	max-width: 1200px;
	width: 100%;
	margin: auto;
	padding: 0rem 1.25rem;
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: space-between;
	${mobile({ margin: 'auto' })}
`;

const Left = styled.div`
	display: flex;
	align-items: center;
	${mobile({ justifyContent: 'center', maxWidth: '100vw', width: '100%' })}
`;

const MenuIconMobile = styled.div`
	display: none;
	${mobile({ display: 'flex' })}
`;

const DarkLabel = styled.label`
	${mobile({ display: 'none' })}
`;

const Item = styled.div`
	font-size: 1rem;
	margin: 1rem;
	cursor: pointer;
	${mobile({ fontSize: '1.4rem', marginLeft: '1rem' })}
`;

const Right = styled.div`
	flex: 3;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	color: ${({ theme }) => theme.text};
	background-color: ${({ theme }) => theme.bg};
	${mobile({
		position: 'absolute',
		zIndex: '999',
		transition: '1s ease-in-out',
		width: '100vw',
		left: '0',
		top: '100%',
	})}
`;

const DropdownMenu = styled.div`
	${mobile({
		display: 'flex',
		margin: 'auto',
		fontWeight: 'bold',
		justifyContent: 'spaceEvenly',
		textTransform: 'uppercase',
		flexDirection: 'column',
		height: '100vh',
		overflowY: 'auto',
	})}
`;
const MenuItem = styled.div`
	font-size: 1rem;
	color: ${({ theme }) => theme.text};
	cursor: pointer;
	position: relative;
	display: inline-block;
	cursor: pointer;
	margin-left: 1.5rem;
	&:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 2px;
		background-color: ${({ theme }) => theme.hover};
		transition: width 0.3s ease-in-out;
	}
	${mobile({
		marginRight: '1rem',
		fontSize: '1rem',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '6vh auto',
	})}
	&:hover:after {
		width: 100%;
	}
`;

const MenuItemCart = styled.div`
	${mobile({ marginRight: '1rem', fontSize: '1rem' })}
	font-size: 1rem;
	color: ${({ theme }) => theme.text};
	cursor: pointer;
	position: relative;
	display: inline-block;
	cursor: pointer;
	margin-left: 25px;
	&:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 2px;
		background-color: ${({ theme }) => theme.hover};
		transition: width 0.3s ease-in-out;
	}
	&:hover:after {
		width: 100%;
	}
`;

const Navbar = React.memo(({ darkMode, setDarkMode }) => {
	const [showPrompt, setShowPrompt] = useState(false);
	const quantity = useSelector((state) => state.cart.quantity);
	const username = useSelector((state) => state.user.username);
	const [isMenuOpen, setIsMenuOpen] = useState(true);
	const dispatch = useDispatch();

	// Maneja el evento de clic en el botón de cierre de sesión
	const handleClick = () => {
		logoutUser(dispatch);
		setShowPrompt(!showPrompt);
	};
	useEffect(() => {
		// Cambia el estado de isMenuOpen al cambiar el tamaño de la ventana
		const handleResize = () => {
			if (window.innerWidth < 820) {
				setIsMenuOpen(false);
			} else {
				setIsMenuOpen(true);
			}
		};

		handleResize();

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<>
			<Container role="navigation">
				<Wrapper>
					<Left>
						{/* Icono del menú para dispositivos móviles */}
						<MenuIconMobile>
							<MenuRounded
								role="menubar"
								aria-label="Dropdown Menu"
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								style={{ cursor: 'pointer' }}
							/>
						</MenuIconMobile>
						{/* Etiqueta y botón de cambio de modo oscuro/claro */}
						{/*       <DarkLabel */}
						{/*   role="menuitem" */}
						{/*   title={darkMode ? 'Dark' : 'Light'} */}
						{/*   aria-label={darkMode ? 'Dark' : 'Light'} */}
						{/*   onClick={() => setDarkMode(!darkMode)} */}
						{/*   tabIndex="0" */}
						{/*   onKeyUp={(e) => { */}
						{/*     if (e.key === 'Enter') { */}
						{/*       setDarkMode(!darkMode); */}
						{/*     } */}
						{/*   }} */}
						{/* > */}
						{/*   {darkMode ? 'Dark' : 'Light'} */}
						{/* </DarkLabel> */}
						{/*       <Item */}
						{/*   role="menuitem" */}
						{/*   title={darkMode ? 'Dark' : 'Light'} */}
						{/*   aria-label={darkMode ? 'Dark' : 'Light'} */}
						{/*   name="theme" */}
						{/*   value={darkMode} */}
						{/*   onClick={() => setDarkMode(!darkMode)} */}
						{/*   tabIndex="0" */}
						{/*   onKeyUp={(e) => { */}
						{/*     if (e.key === 'Enter') { */}
						{/*       setDarkMode(!darkMode); */}
						{/*     } */}
						{/*   }} */}
						{/* > */}
						{/*   {darkMode ? <Brightness7 /> : <Brightness2 />} */}
						{/* </Item> */}
						{/* Barra de búsqueda */}
						<SearchBar />
					</Left>
					<Right role="menu">
						{/* Menú desplegable para dispositivos móviles */}
						{isMenuOpen && (
							<DropdownMenu aria-hidden={!isMenuOpen}>
								{/* USER EXISTS? */}
								<>
									{e.map((i) => {
										const { id, route, name } = i;
										return (
											<Link
												role="link"
												aria-label={`go to ${name}`}
												title={name}
												key={id}
												to={route}
												style={{ textDecoration: 'none' }}
												tabIndex="0"
											>
												<MenuItem>{name}</MenuItem>
											</Link>
										);
									})}
									{username ?? (
										<MenuItem
											role="link"
											title="Log Out"
											tabIndex="0"
											onClick={() => setShowPrompt(!showPrompt)}
										>
											{username}
										</MenuItem>
									)}

									{/*       ( */}
									{/* <Link */}
									{/*   role="link" */}
									{/*   aria-label="go to auth" */}
									{/*   to="/auth" */}
									{/*   style={{ textDecoration: 'none' }} */}
									{/*   title="Login / Create Account" */}
									{/*   tabIndex="0" */}
									{/* > */}
									{/*   <MenuItem>Login</MenuItem> */}
									{/* </Link> */}
									{/* ) */}
								</>
							</DropdownMenu>
						)}
					</Right>
					{/* Elemento del carrito */}
					<Link
						to="/cart"
						style={{ textDecoration: 'none' }}
						tabIndex="0"
						role="link"
					>
						<MenuItemCart>
							{/* Icono del carrito con número de productos */}
							<Badge
								role="figure"
								aria-label="shopping cart"
								title={`${quantity} products in cart`}
								badgeContent={quantity}
								color="primary"
								overlap="rectangular"
							>
								{quantity > 0 ? <ShoppingCart /> : <ShoppingCartOutlined />}
							</Badge>
						</MenuItemCart>
					</Link>
				</Wrapper>
				{showPrompt && (
					<Prompt
						text={'Do you want to logout?'}
						onClick={handleClick}
						setShowPrompt={() => setShowPrompt(!showPrompt)}
					/>
				)}
			</Container>
			<Announcement text="Free shipping on orders over $50!" />
		</>
	);
});

export default Navbar;
