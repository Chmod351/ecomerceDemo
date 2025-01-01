import 'normalize.css'; // Normaliza los estilos CSS en diferentes navegadores
import './app.css';
import { useSelector } from 'react-redux'; // Hook de React Redux para acceder al estado global
import { ThemeProvider } from 'styled-components';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { darkTheme, lightTheme } from './utils/theme.js';
import { useState } from 'react';
// pages
import Dashboard from './pages/Admin/Dashboard/Home';
import NewProduct from './pages/Admin/newProduct/NewProduct';
import EditProduct from './pages/Admin/editProduct/EditProduct';
import { default as AdminProductList } from './pages/Admin/productList/ProductList';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Public/Home';
import ProductSearchList from './pages/Public/ProductSearchList';
import Product from './pages/Public/Product';
import Cart from './pages/Public/Cart';
import PrivacyPage from './pages/Public/Privacy';
import Register from './pages/Public/Register';

const REACT_APP_GOOGLEID = process.env.REACT_APP_GOOGLEID;

const App = () => {
	const user = useSelector((state) => state.user.currentUser); // Obtiene el usuario actual del estado global
	const getDarkModePreference = () => {
		const preference = localStorage.getItem('darkMode'); // Obtiene la preferencia de modo oscuro almacenada en el almacenamiento local
		return preference !== null ? JSON.parse(preference) : false;
	};
	const [darkMode, setDarkMode] = useState(getDarkModePreference());

	const setDarkModePreference = (preference) => {
		localStorage.setItem('darkMode', JSON.stringify(preference)); // Almacena la preferencia de modo oscuro en el almacenamiento local
	};

	const handleDarkModeToggle = () => {
		const newDarkMode = !darkMode; // Cambia el estado del modo oscuro
		setDarkMode(newDarkMode);
		setDarkModePreference(newDarkMode);
	};

	return (
		<GoogleOAuthProvider clientId={REACT_APP_GOOGLEID}>
			{' '}
			<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
				<Router>
					<Navbar darkMode={darkMode} setDarkMode={handleDarkModeToggle} />
					<Switch>
						<Route exact path="/">
							<Home darkMode={darkMode} setDarkMode={handleDarkModeToggle} />
							{/* Página de inicio con soporte para modo oscuro */}
						</Route>
						<Route path="/products/:category">
							<ProductSearchList
								darkMode={darkMode}
								setDarkMode={handleDarkModeToggle}
							/>
							{/* Lista de productos de una categoría con soporte para modo oscuro */}
						</Route>
						<Route path="/product/:id">
							<Product darkMode={darkMode} setDarkMode={handleDarkModeToggle} />
							{/* Página de un producto individual con soporte para modo oscuro */}
						</Route>
						<Route path="/cart">
							<Cart darkMode={darkMode} setDarkMode={handleDarkModeToggle} />
						</Route>

						<Route path="/privacy">
							<PrivacyPage />{' '}
							{/*Página de éxito después de realizar la orden */}
						</Route>

						<Route path="/auth">
							{user?.currentUser ? <Redirect to="/" /> : <Register />}
						</Route>
						{user?.type === 'admin' ? (
							<>
								<div className="container">
									<Route path="/admin/dashboard">
										<Dashboard />
									</Route>
									<Route path="/admin/get/products">
										<AdminProductList />
									</Route>
									<Route path="/admin/update/product/:productId">
										<EditProduct />
									</Route>
									<Route path="/admin/create/product">
										<NewProduct />
									</Route>
								</div>
							</>
						) : (
							<Redirect to="/" />
						)}
					</Switch>
					<Footer />
				</Router>
			</ThemeProvider>
		</GoogleOAuthProvider>
	);
};

export default App;
