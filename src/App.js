import Product from './pages/Product'; // Componente para mostrar la página de un producto individual
import Home from './pages/Home'; // Componente para mostrar la página de inicio
import ProductList from './pages/ProductList'; // Componente para mostrar la lista de productos de una categoría
import Register from './pages/Register'; // Componente para mostrar el formulario de registro e inicio de session
import Cart from './pages/Cart'; // Componente para mostrar la vista  del compras
import 'normalize.css'; // Normaliza los estilos CSS en diferentes navegadores
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'; // Importación de componentes de React Router para el enrutamiento
import { darkTheme, lightTheme } from './utils/theme.js'; // Importación de temas (estilos) para la aplicación
import Success from './pages/Success'; // Componente para mostrar la página de éxito después de una acción
import { useSelector } from 'react-redux'; // Hook de React Redux para acceder al estado global
import { ThemeProvider } from 'styled-components'; // Proveedor de estilos para el tema actual
import { useState } from 'react';

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
  );
};

export default App;
