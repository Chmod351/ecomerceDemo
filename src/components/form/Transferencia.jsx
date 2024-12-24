import { createOrder } from "../../utils/logic/orders";
import { useState } from "react";
import Prompt, {ButtonsPack} from "../ui/Prompt";
import Button from "../ui/Button";
import {handleError} from "../../utils/toast";
import {userData} from '../../components/redux/userRedux'
import {cart} from '../../components/redux/cartRedux'
import {useSelector} from "react-redux";

function TransferPayment({
  total,
  setTransferencia
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState(null);
  const [orderId, setOrderId] = useState(null);
 const cart = useSelector((state) => state.cart);
  const userData = useSelector((state) => state.orders.userData);

  const handlePayment = async () => {
    try {
      setIsErr(null);
      const id= await createOrder(total,userData,carl);
      setOrderId(id);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      handleError(error.error ?? "Error al procesar el pago");
      setIsErr("Error al procesar el pago");
    }
  };


  return (
    <Prompt >
      {isLoading && (
        <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
          Cargando...
          <div className="w-10 h-10 bg-gray-400 animate-spin  "></div>
        </div>
      )}
      <div id="transfer_container">
        {!isLoading && !isErr && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-center m-auto items-center gap-4"></div>
            <p>
              Luego de generar el numero de orden,
              <strong> tendrás dos horas </strong>para enviar por email el
              comprobante de pago.
            </p>
            <div className="flex flex-col gap-4 bg-primary p-4 rounded-lg h-[300px] ">
              <h1>
                <b>ALIAS</b>: LAZY.TRENDY
              </h1>
              <br />
              <a
                href="mailto:lazytrendy@tienda.com.ar"
                target="_blank"
                className="md:text-xl font-bold"
              >
                email:lazytrendy@tienda.com.ar
              </a>

              <br />
              <strong className="md:text-3xl ">
                {!orderId ? (
                  <>TOTAL A PAGAR : $ {total}</>
                ) : (
                  <>
                    ESTE ES TU NUMERO DE ORDEN : {orderId}
                    <br />
                    TOTAL A PAGAR : $ {total}
                  </>
                )}
              </strong>

              <Button
              text={`CHECKOUT:  $ ${total}`}
                // @ts-ignore
                onClick={() => handlePayment()}
                type="button"
                disabled={isLoading || orderId ? true : false}
              />
            </div>
            <br />
            <p className="text-sm text-gray-400">
              las transferencias no son reembolsables Tenes que enviar el
              comprobante en un plazo de 2hs o el pedido se cancela
              automaticamente Gracias por tu compra!
            </p>
          </div>
        )}
      </div>
    <ButtonsPack setShowPrompt={() => setTransferencia(false)} />
    </Prompt>
  );
}

export default TransferPayment;
