import { loginFailure, loginStart, loginSuccess } from './userRedux';
import { publicRequest } from '../requestMethods';
import { handleError, handleSuccess } from '../utils/toast';
import { addProduct } from './cartRedux';

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
export const payment = async (tokenId, amount, history) => {
  try {
    const res = await publicRequest.post('/purchase/payment', {
      tokenId,
      amount,
    });
    history.push('/success', {
      stripeData: res.data,
      products: cart,
    });
  } catch (error) {
    handleError(error);
    console.log(error);
  }
};

export const addToCart = async (cart) => {
  try {
    await publicRequest.post('/cart', { products: cart });
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};
