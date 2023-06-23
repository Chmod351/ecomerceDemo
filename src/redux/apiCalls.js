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
export const payment = async (tokenId, amount, history, cart) => {
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
    await publicRequest.post('/cart', {
      products: cart.products,
    });
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

export const makeOrder = async (cart, data, id) => {
  try {
    await publicRequest.post('/purchase/order', {
      userId: id,
      products: cart.products.map((item) => ({
        productId: item._id,
        quantity: item._quantity,
      })),
      amount: cart.total,
      address: data.billing_details.address,
    });
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};
