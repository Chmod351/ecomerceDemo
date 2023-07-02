import { publicRequest } from '../requestMethods';
import { handleError, handleSuccess } from './toast';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
} from '../redux/userRedux';
import { addProduct } from '../redux/cartRedux';

// validate format and data

export const validateUsername = (username, setError, setUsername) => {
  // Comprueba la validez del nombre de usuario y actualiza los estados de error y nombre de usuario
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
  // Comprueba la validez de la contraseña y realiza las acciones correspondientes
  if (password.length === 1 || password.length < 8) {
    setError('password');
    login ? setOff(false) : ''; // enciende el boton
  } else {
    setError('');
    setPassword(password);
    setStore(password);
  }
};

export const matchPasswords = (confirmPassword, setError, setOff, store) => {
  // Comprueba si las contraseñas coinciden
  if (store !== confirmPassword) {
    setError('confirmPassword'); // arroja un error en el formulario
    setOff(true); // apaga el boton de envio
  } else {
    setError('');
    setOff(false); // enciende el boton de envio
  }
};

export const verifyEmail = (email, setError, setEmail) => {
  // Verifica la validez del correo electrónico y realiza las acciones correspondientes
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError('email');
  } else {
    setError('');
    setEmail(email);
  }
};

// functionals functions

// ----------> POST REQUESTS <--------------

// Registrar un usuario
export const handleRegistration = async (email, password, username, setMsg) => {
  // Realiza la solicitud de registro y maneja las respuestas.
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
    console.log(error);
    handleError(error);
    setMsg('');
  }
};

// Iniciar sesión
export const login = async (dispatch, email, password, setMsg) => {
  // Realiza la solicitud de inicio de sesión y maneja las respuestas y errores correspondientes
  setMsg('login');
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/users/signIn', { email, password });
    dispatch(loginSuccess(res.data)); // usa redux para logear al usuario
    handleSuccess('welcome');
  } catch (error) {
    setMsg(error.message);
    console.log(error);
    handleError(error);
    dispatch(loginFailure()); // cancela la accion
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

// crear orden

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

// obtener ordenes

export const getOrders = async (userId) => {
  try {
    const res = await publicRequest.get(`/purchases/${userId}`);
    return res;
  } catch (error) {
    handleError(error);
    console.log(error);
  }
};

// ---- --GET PRODUCTS -- ----

// get product by ID

export const productById = async (id, setProduct, setColor, setSize) => {
  try {
    const res = await publicRequest.get(`/products/${id}`);
    const productResponse = { productId: res.data._id, ...res.data };
    setProduct(productResponse); // establece el estado products en la respuesta
    setColor(productResponse.color[0]); // establece el color al primer color devuelto
    setSize(productResponse.size[0]); // establece el tamaño al primer tamaño devuelto
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

// Search products

export const SearchProducts = async (query) => {
  try {
    const response = await publicRequest.get(`/products/search?q=${query}`);
    return response;
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

// product by tag

export const getProductByTags = async (tag, currentPage, pageSize) => {
  // obtiene los productos relacinados y le pide al backend la paginacion necesaria
  try {
    const response = await publicRequest.get(
      `/products/tag?tag=${tag}&page=${currentPage}&size=${pageSize}`,
    );
    return response;
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};
// GET ALL PRODUCTS

export const getAllProducts = async (currentPage, pageSize) => {
  // obtiene todos los productos y le pide al backend la paginacion necesaria
  try {
    const response = await publicRequest.get(
      `/products?page=${currentPage}&size=${pageSize}`,
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

// productJsx function
export const getProductsFunction = async (
  currentPage,
  pageSize,
  tag,
  query,
) => {
  if (tag) {
    const res = await getProductByTags(tag, currentPage, pageSize);
    return res;
  } else if (query) {
    const res = await SearchProducts(query);
    return res;
  } else {
    const res = await getAllProducts(currentPage, pageSize);
    return res;
  }
};
//--------------------------------------------------------------------------------

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

export const logoutUser = (dispatch) => {
  // Cierra la sesión del usuario
  try {
    dispatch(logout());
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};
