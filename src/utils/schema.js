import { z } from "zod";

// Esquema de validación general para la orden
const checkoutFormSchema = z.object({
  commentaries: z.string().optional(),
  deliveryMode: z
    .string({ required_error: "El modo de entrega es requerido" })
    .min(1, { message: "El modo de entrega es requerido" })
    .max(50, { message: "El modo de entrega es demasiado extenso" }),
  shippingAddress1: z
    .string({ required_error: "La dirección es requerida" })
    .min(1, { message: "La dirección  es requerida" })
    .max(80, { message: "La dirección es demasiado extensa" }),
  city: z
    .string({ required_error: "La ciudad es requerida" })
    .min(1, { message: "La ciudad es requerida" })
    .max(50, { message: "La ciudad es demasiado extensa" }),
  country: z
    .string({ required_error: "El país es requerido" })
    .min(1, { message: "El país es requerido" })
    .max(50, { message: "El país es demasiado extenso" }),
  state: z
    .string({ required_error: "El estado/provincia es requerido" })
    .min(1, { message: "El estado/provincia es requerido" })
    .max(50, {
      message: "El estado/provincia es demasiado extenso",
    }),
  email: z
    .string({ required_error: "El email es requerido" })
    .email({ message: "Debe ser un email válido" })
    .min(1, { message: "El email es requerido" })
    .max(100, { message: "El email es demasiado extenso" }),
  firstName: z
    .string({ required_error: "El nombre es requerido" })
    .min(1, { message: "El nombre es requerido" })
    .max(50, { message: "El nombre es demasiado extenso" }),
  lastName: z
    .string({ required_error: "El apellido es requerido" })
    .min(1, { message: "El apellido es requerido" })
    .max(50, {
      message: "El apellido es demasiado extenso",
    }),
  floor: z
    .string()
    .max(10, { message: "El piso es demasiado extenso" })
    .optional(),
  phoneNumber: z
    .string({ required_error: "El telfono es requerido" })
    .min(1, { message: "El teléfono es requerido" })
    .max(11, {
      message: "El telfono es demasiado extenso",
    }),
  userIdCard: z
    .string({ required_error: "El DNI es requerido" })
    .min(1, { message: "El DNI es requerido" })
    .max(20, {
      message: "El DNI es demasiado extenso",
    }),
  zip: z
    .string({ required_error: "El código postal es requerido" })
    .min(1, { message: "El código postal es requerido" })
    .max(10, { message: "El código postal es demasiado extenso" }),
});

export default checkoutFormSchema;
