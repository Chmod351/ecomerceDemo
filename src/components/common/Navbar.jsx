import React, { useEffect } from 'react';
import { Badge } from '@material-ui/core';
import {
	ShoppingCartOutlined,
	ShoppingCart,
	MenuRounded,
} from '@material-ui/icons';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { mobile, pc } from '../../responsive';
import { adminRoutes, e } from '../../utils/data/navbarData';
import { logoutUser } from '../../utils/logic/users.js';
// ui
// import Prompt from './ui/Prompt';
import Announcement from './Announcement';
import SearchBar from '../ui/searchBar';
import { LogOutPrompt } from '../ui/Prompt';
import useIsMobile from '../../hooks/useIsMobile';

const Container = styled.nav`
	color: ${({ theme }) => theme.text};
	background-color: ${({ theme }) => theme.bgLighter};
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

const Right = styled.div`
	flex: 3;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	color: ${({ theme }) => theme.text};
	background-color: ${({ theme }) => theme.bgLighter};
	${mobile({
		position: 'absolute',
		left: '0',
		zIndex: '2',
		backgroundColor: 'white',
		width: '90%',
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
		minHeight: '100vh',
		height: '100%',
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

const MobileMenu = ({ user, setIsMenuOpen, isMenuOpen }) => {
	return (
		<DropdownMenu aria-hidden={!isMenuOpen}>
			{/* USER EXISTS? */}
			<>
				{!user?.currentUser?.username && (
					<>
						{e.map((i) => {
							const { id, route, name } = i;
							return (
								<Link
									role="link"
									aria-label={`go to ${name}`}
									title={name}
									onClick={() => setIsMenuOpen(false)}
									key={id}
									to={route}
									style={{ textDecoration: 'none' }}
									tabIndex="0"
								>
									<MenuItem>{name}</MenuItem>
								</Link>
							);
						})}
					</>
				)}
				{user?.currentUser?.username && (
					<>
						{adminRoutes.map((i) => {
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
						<MenuItem
							role="link"
							title="Log Out"
							tabIndex="0"
							onClick={() => setShowPrompt(!showPrompt)}
						>
							{user.currentUser.username}
						</MenuItem>
					</>
				)}
			</>
		</DropdownMenu>
	);
};
const Navbar = React.memo(({ darkMode, setDarkMode }) => {
	const [showPrompt, setShowPrompt] = useState(false);
	const quantity = useSelector((state) => state.cart.quantity);
	const user = useSelector((state) => state.user);
	const { isMobile } = useIsMobile();
	const [isMenuOpen, setIsMenuOpen] = useState(true);
	const dispatch = useDispatch();
	// Maneja el evento de clic en el botón de cierre de sesión
	const handleClick = () => {
		logoutUser(dispatch);
		setShowPrompt(!showPrompt);
	};

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
						<SearchBar />
					</Left>
					<Right role="menu">
						{/* Menú desplegable para dispositivos móviles */}
						{isMobile && isMenuOpen && (
							<MobileMenu
								user={user}
								isMobile={isMobile}
								setIsMenuOpen={setIsMenuOpen}
								isMenuOpen={isMenuOpen}
							/>
						)}
						{!isMobile && (
							<>
								{!user?.currentUser?.username && (
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
									</>
								)}
								{user?.currentUser?.username && (
									<>
										{adminRoutes.map((i) => {
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
										<MenuItem
											role="link"
											title="Log Out"
											tabIndex="0"
											onClick={() => setShowPrompt(!showPrompt)}
										>
											{user.currentUser.username}
										</MenuItem>
									</>
								)}
							</>
						)}
					</Right>
					{/* Elemento del carrito */}
					{!user?.currentUser?.username && (
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
					)}
				</Wrapper>
				{showPrompt && (
					<LogOutPrompt
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
