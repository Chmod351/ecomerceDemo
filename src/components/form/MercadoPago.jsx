import { useEffect, useState } from "react";
import {
  CardPayment,
  StatusScreen,
} from "@mercadopago/sdk-react";
import useIsMobile from "../../hooks/useIsMobile";
import { createOrderMp } from "../../utils/logic/orders";
import Prompt, {ButtonsPack} from "../ui/Prompt";
import { initMercadoPago } from '@mercadopago/sdk-react';
import {useSelector} from "react-redux";
import {handleError} from "../../utils/toast";
const initialState = {
  deliveryMode: 'PickUp',
  firstName: 'jasd',
  lastName: 'asd',
  shippingAddress1: 'asd',
  floor: 'asd',
  zip: 'asd',
  city: 'asd',
  email: 'asd',
  country: 'asd',
  state: 'asd',
  phoneNumber: 'asd',
  commentaries: 'asd',
  userIdCard: 'asd',
};
function MercadoPago({
  total,setMercadopago
}) {
  const [mercadopagoOrdenId, setMercadopagoOrdenId] = useState(
    null,
  );
const userData = useSelector((state) => state.orders);
const cart = useSelector((state) => state.cart);
  const [isCardPaymentMounted, setIsCardPaymentMounted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setEr] = useState("");
  const {  setIsModalOpen } = useIsMobile();

  const handleClose = () => {
    setMercadopago(false);
    setIsCardPaymentMounted(false); // Desmontar el componente
    setTimeout(() => {
      setIsModalOpen(false); // Cerrar el modal después de desmontar
    }, 1000); // Dar un pequeño margen de tiempo para desmontar
  };
 
useEffect(() => {
  try {
    initMercadoPago(process.env.REACT_APP_PUBLIC_KEY);
    console.log("SDK inicializado correctamente");
  } catch (error) {
    console.error("Error al inicializar el SDK:", error);
  }
}, []);

  useEffect(() => {
    setIsModalOpen(true);
    setIsCardPaymentMounted(true);
  }, [setIsModalOpen, setIsCardPaymentMounted]);


  const handlePayment = async ({ data }) => {
    setEr("");
    setIsLoading(true);
    console.log("enviando la data: ", data);
    try {
      const {  id  } = await createOrderMp({
        mercadoPagoInfo: data,
        userData:initialState,
        cart,
        total
      });
      setMercadopagoOrdenId(id);
     
    } catch (e) {
      /* handle error */
      console.log("e: ", e);
      handleError(e??"Error al crear la orden");
      handleClose()
    }
    setIsLoading(false);
  };

  return (
 
      <Prompt id="errorScreenBrick_container">
      {mercadopagoOrdenId && (
        <div id="statusScreenBrick_container">
          <div className="flex flex-col justify-center items-center">
            <StatusScreen
              initialization={{
                paymentId: mercadopagoOrdenId,
              }}
            />
          </div>
        </div>
      )}
      <div id="cardPaymentBrick_container">
        {!error &&
          !isLoading &&
          isCardPaymentMounted &&
          !mercadopagoOrdenId && (
            <CardPayment
              referenceId={mercadopagoOrdenId}
              locale="es-AR"
              initialization={{
                amount: total,
              }}
              onSubmit={async (data) => {
                handlePayment({ data });
              }}
            />
          )}
      </div>
      <ButtonsPack setShowPrompt={handleClose} />
      </Prompt>
  );
}
export default MercadoPago;
