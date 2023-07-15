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
import Home from './pages/Home'; 
import Cart from './pages/Cart'; 
import Product from './pages/Product'; 
import Success from './pages/Success'; 
import Register from './pages/Register'; 
import ProductList from './pages/ProductList';

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
          <Switch>
            <Route exact path="/">
              <Home darkMode={darkMode} setDarkMode={handleDarkModeToggle} />
              {/* Página de inicio con soporte para modo oscuro */}
            </Route>
            <Route path="/products/:category">
              <ProductList
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
            <Route path="/success">
              <Success /> {/*Página de éxito después de realizar la orden */}
            </Route>
            <Route path="/auth">
              {user ? <Redirect to="/" /> : <Register />}
              {/* Redirige a la página de inicio si el usuario ya ha iniciado sesión, de lo contrario, muestra el formulario de registro */}
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
