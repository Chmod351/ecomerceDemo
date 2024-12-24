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

 export const createOrderMp = async ({
    mercadoPagoInfo,
  userData,
  cart,
  total
  }) => {
    try {
    console.log("entrando a orders:  ",mercadoPagoInfo , userData, cart, total);
      const requestBody = {
        mercadoPagoInfo: {
          installments: mercadoPagoInfo.installments,
          issuer_id: mercadoPagoInfo.issuer_id,
          payment_method_id: mercadoPagoInfo.payment_method_id,
          payer: {
            email: mercadoPagoInfo.payer.email,
            identification: {
              type: mercadoPagoInfo.payer.identification.type,
              number: mercadoPagoInfo.payer.identification.number,
            },
          },
          token: mercadoPagoInfo.token,
          transaction_amount: mercadoPagoInfo.transaction_amount,
        },
        orderItems: cart.products,
        totalPrice: total,
        deliveryMode: userData.deliveryMode,
        paymentMethod: "Mercado Pago",
        shippingAddress1: userData.shippingAddress1,
        userData: {
          ...userData,
          surname: userData.lastName,
          name: userData.firstName,
          phone: userData.phoneNumber,
          dateOrdered: new Date(),
        },
      };
      const response = await fetch(
        `${process.env.REACT_APP_URL}/orders/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );
    console.log(response)
      if (!response.ok) {
        const { id, error } = await response.json();
      console.log(id, error)
        return { id };
      }
      const order = await response.json();
      // clearCart();

      return order;
    } catch (e) {
      /* handle error */
      // clearCart();
      handleError(error);
      console.log(e);
    }
  };

 export  const createOrder = async (total,userData,cart) => {
    try {
      const requestBody = {
        mercadoPagoInfo: null,
        orderItems: cart.products,
        totalPrice: total,
        deliveryMode: userData.deliveryMode,
        paymentMethod: "Transferencia",
        shippingAddress1: userData.shippingAddress1,
        userData: {
          ...userData,
          surname: userData.lastName,
          name: userData.firstName,
          phone: userData.phoneNumber,
          dateOrdered: new Date(),
        },
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API}/orders/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );
      if (!response.ok) {
        throw new Error("Error creating order");
      }
      const order = await response.json();
      handleSuccess('createdOrder');
      clearCart();
      return order._id;
    } catch (e) {
      /* handle error */
      handleError(error);

      clearCart();
      console.log(e);
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
