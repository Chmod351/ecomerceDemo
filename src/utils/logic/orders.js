import { publicRequest } from '../../requestMethods';
import { handleError, handleSuccess } from '../toast';
// crear orden

export const makeOrder = async (address, cartId, amount) => {
  try {
    const response = await publicRequest.post('/purchases/create', {
      shippingAddress: address,
      cartId,
      amount,
    });
    const { data } = response; // Accede directamente a la propiedad 'data' en el objeto de respuesta
    return data;
  } catch (error) {
    console.log(error);
    handleError(error);
    
  }
};

// obtener ordenes

export const getOrders = async (userId, setOrdersLoad) => {
  try {
    const res = await publicRequest.get(`/purchases/${userId}`);
    setOrdersLoad(true);
    return res;
  } catch (error) {
    handleError(error);
    console.log(error);
  }
};

// ---- --DELETE ORDER -- ----
export const deleteOrder = async (orderId) => {
  console.log(orderId);
  try {
    const res = await publicRequest.delete(`/purchases/${orderId}`);
    handleSuccess('removedOrder');
    return res;
  } catch (error) {
    handleError(error);
    console.log(error);
    
  }
};

// FUNCION DE FORMATEO DE FECHAS

export const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return formattedDate;
};
