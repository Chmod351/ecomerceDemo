import { publicRequest } from '../../requestMethods';
import { handleError, handleSuccess } from '../toast';
import { addProduct } from '../../components/redux/cartRedux';
// añadir al carrito

export const addToCart = async (cart, setUserCart) => {
  try {
    const response = await publicRequest.post('/carts/create', {
      products: cart.products,
    });
    setUserCart(response.data._id);
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

// redux functions

export const addToReduxCart = (
  dispatch,
  setQuantity,
  product,
  quantity,
  color,
  size,
) => {
  try {
    // Agrega un producto al carrito de Redux
    dispatch(addProduct({ ...product, quantity, color, size }));
    handleSuccess('added');
    setQuantity(1);
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

// Pagos

export const payment = async (tokenId, amount, history, userCart) => {
  try {
    const res = await publicRequest.post('/purchases/payment', {
      tokenId,
      amount,
    });
    history.push('/success', {
      // redirecciona al componente succes en caso de exito
      stripeData: res.data,
      cartId: userCart,
    });
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};
