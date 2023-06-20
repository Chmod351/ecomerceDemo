import { loginFailure, loginStart, loginSuccess } from './userRedux';
import { publicRequest } from '../requestMethods';
import { handleError, handleSuccess } from '../utils/toast';
import { addProduct } from './cartRedux';

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

export const addToCart = (product) => async (dispatch) => {
  try {
    const res = await publicRequest.post('/cart', product);
    dispatch(addProduct(res.data));
    handleSuccess('added');
  } catch (error) {
    handleError(error);
  }
};
