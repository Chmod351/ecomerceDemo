import { publicRequest } from '../requestMethods';
import { handleError, handleSuccess } from './toast';
import { loginFailure, loginStart, loginSuccess } from '../redux/userRedux';

// validate format and data

export const validateUsername = (username, setError, setUsername) => {
  if (username.length === 0 || username.length < 3) {
    setError('username');
  } else {
    setError('');
    setUsername(username);
  }
};

export const validatePassword = (
  password,
  setError,
  setPassword,
  setStore,
  login,
  setOff,
) => {
  if (password.length === 1 || password.length < 8) {
    setError('password');
    login ? setOff(false) : '';
  } else {
    setError('');
    setPassword(password);
    setStore(password);
  }
};

export const matchPasswords = (confirmPassword, setError, setOff, store) => {
  if (store !== confirmPassword) {
    setError('confirmPassword');
    setOff(true);
  } else {
    setError('');
    setOff(false);
  }
};

export const verifyEmail = (email, setError, setEmail) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError('email');
  } else {
    setError('');
    setEmail(email);
  }
};

// functionals functions

// register
export const handleRegistration = async (email, password, username, setMsg) => {
  try {
    await publicRequest.post('/users/signUp', {
      email,
      password,
      username,
    });
    handleSuccess('created');
    setMsg('created');
  } catch (error) {
    setMsg(error.message);
    handleError(error);
    setMsg('');
  }
};

// LOGIN
export const login = async (dispatch, email, password, setMsg) => {
  setMsg('login');
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/users/signIn', { email, password });
    dispatch(loginSuccess(res.data));
    handleSuccess('welcome');
  } catch (error) {
    setMsg(error.message);
    handleError(error);
    dispatch(loginFailure());
  }
};

//payments 

export const payment = async (tokenId, amount, history, userCart) => {
  try {
    const res = await publicRequest.post('/purchases/payment', {
      tokenId,
      amount,
    });
    history.push('/success', {
      stripeData: res.data,
      cartId: userCart,
    });
  } catch (error) {
    handleError(error);
    console.log(error);
  }
};

// add to cart

export const addToCart = async (cart, setUserCart) => {
  try {
    const response = await publicRequest.post('/cart', {
      products: cart.products,
    });
    setUserCart(response.data._id);
  } catch (error) {
    handleError(error);
  }
};

// create order 

export const makeOrder = async (amount, address, userId, cartId) => {
  try {
    const res = await publicRequest.post('/purchases/create', {
      userId,
      cartId,
      amount,
      address,
    });
    return res;
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

