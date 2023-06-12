import Product from './pages/Product';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import 'normalize.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { darkTheme, lightTheme } from './utils/theme.js';
import Success from './pages/Success';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { useState } from 'react';

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const getDarkModePreference = () => {
    const preference = localStorage.getItem('darkMode');
    return preference !== null ? JSON.parse(preference) : false;
  };
  const [darkMode, setDarkMode] = useState(getDarkModePreference());

  const setDarkModePreference = (preference) => {
    localStorage.setItem('darkMode', JSON.stringify(preference));
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    setDarkModePreference(newDarkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home darkMode={darkMode} setDarkMode={handleDarkModeToggle} />
          </Route>
          <Route path="/products/:category">
            <ProductList
              darkMode={darkMode}
              setDarkMode={handleDarkModeToggle}
            />
          </Route>
          <Route path="/product/:id">
            <Product darkMode={darkMode} setDarkMode={handleDarkModeToggle} />
          </Route>
          <Route path="/cart">
            <Cart darkMode={darkMode} setDarkMode={handleDarkModeToggle} />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
