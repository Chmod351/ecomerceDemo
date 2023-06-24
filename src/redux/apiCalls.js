import { loginFailure, loginStart, loginSuccess } from './userRedux';
import { publicRequest } from '../requestMethods';
import { handleError, handleSuccess } from '../utils/toast';

// LOGIN
export const login = async (dispatch, email, password, setMsg) => {
  setMsg('');
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/signin', { email, password });
    handleSuccess('welcome');
    dispatch(loginSuccess(res.data));
  } catch (error) {
    setMsg(error.message);
    handleError(error);
    dispatch(loginFailure());
  }
};

// __________________________________________________________________
export const payment = async (tokenId, amount, history, userCart) => {
  try {
    const res = await publicRequest.post('/purchase/payment', {
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

export const addToCart = async (cart, setUserCart) => {
  try {
    const response = await publicRequest.post('/cart', {
      products: cart.products,
    });
    setUserCart(response.data._id);
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

export const makeOrder = async (amount, address, userId, cartId) => {
  try {
    const res = await publicRequest.post('/purchase/order', {
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
