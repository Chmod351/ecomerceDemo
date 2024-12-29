import { z } from 'zod';

// Esquema de validación general para la orden
const checkoutFormSchema = z.object({
	commentaries: z.string().optional(),
	deliveryMode: z
		.string({ required_error: 'El modo de entrega es requerido' })
		.min(1, { message: 'El modo de entrega es requerido' })
		.max(50, { message: 'El modo de entrega es demasiado extenso' }),
	shippingAddress1: z
		.string({ required_error: 'La dirección es requerida' })
		.min(1, { message: 'La dirección  es requerida' })
		.max(80, { message: 'La dirección es demasiado extensa' }),
	city: z
		.string({ required_error: 'La ciudad es requerida' })
		.min(1, { message: 'La ciudad es requerida' })
		.max(50, { message: 'La ciudad es demasiado extensa' }),
	country: z
		.string({ required_error: 'El país es requerido' })
		.min(1, { message: 'El país es requerido' })
		.max(50, { message: 'El país es demasiado extenso' }),
	state: z
		.string({ required_error: 'El estado/provincia es requerido' })
		.min(1, { message: 'El estado/provincia es requerido' })
		.max(50, {
			message: 'El estado/provincia es demasiado extenso',
		}),
	email: z
		.string({ required_error: 'El email es requerido' })
		.email({ message: 'Debe ser un email válido' })
		.min(1, { message: 'El email es requerido' })
		.max(100, { message: 'El email es demasiado extenso' }),
	firstName: z
		.string({ required_error: 'El nombre es requerido' })
		.min(1, { message: 'El nombre es requerido' })
		.max(50, { message: 'El nombre es demasiado extenso' }),
	lastName: z
		.string({ required_error: 'El apellido es requerido' })
		.min(1, { message: 'El apellido es requerido' })
		.max(50, {
			message: 'El apellido es demasiado extenso',
		}),
	floor: z
		.string()
		.max(10, { message: 'El piso es demasiado extenso' })
		.optional(),
	phoneNumber: z
		.string({ required_error: 'El telfono es requerido' })
		.min(1, { message: 'El teléfono es requerido' })
		.max(11, {
			message: 'El telfono es demasiado extenso',
		}),
	userIdCard: z
		.string({ required_error: 'El DNI es requerido' })
		.min(1, { message: 'El DNI es requerido' })
		.max(20, {
			message: 'El DNI es demasiado extenso',
		}),
	zip: z
		.string({ required_error: 'El código postal es requerido' })
		.min(1, { message: 'El código postal es requerido' })
		.max(10, { message: 'El código postal es demasiado extenso' }),
});

export default checkoutFormSchema;

export const productCreationSchema = z.object({
	category: z
		.string({ required_error: 'Categorias requeridas' })
		.min(1, { message: 'Categorias requeridas' }),
	seasson: z
		.string({ required_error: 'Temporada requerida' })
		.min(1, { message: 'Temporada requerida' }),
	description_en: z
		.string({ required_error: 'Descripicion en ingles requerida' })
		.min(100, { message: 'Debe de ser un minimo de 100 caracteres' })
		.max(500, { message: 'Debe de ser un maximo de 500 caracteres' }),
	description_es: z
		.string({ required_error: 'Descripicion en Español requerida' })
		.min(100, { message: 'Debe de ser un minimo de 100 caracteres' })
		.max(500, { message: 'Debe de ser un maximo de 500 caracteres' }),
	name_en: z
		.string({ required_error: 'Nombre en ingles requerido' })
		.min(10, {
			message: 'Nombre en ingles debe ser un minimo de 10 caracteres',
		})
		.max(50, {
			message: 'Nombre en Español debe ser un maximo de 50 caracteres',
		}),
	name_es: z
		.string({ required_error: 'Nombre en Español requerido' })
		.min(10, { message: 'Nombre en Español requerido' })
		.max(50, {
			message: 'Nombre en Español debe ser un maximo de 50 caracteres',
		}),
	price_en: z
		.string({ required_error: 'Precio en dolares requerido' })
		.min(1, { message: 'Precio en dolares requerido' })
		.max(999999999, { message: 'Debe de ser un maximo de 999999999' }),
	price_es: z
		.string({ required_error: 'Precio en pesos requerido' })
		.min(1, { message: 'Precio en pesos requerido' })
		.max(999999999, { message: 'Debe de ser un maximo de 999999999' }),
	image0: z
		.string({ required_error: 'Imagen requerida' })
		.min(1, { message: 'Imagen requerida' })
		.max(2000, { message: 'Debe de ser un maximo de 500 caracteres' }),
	image1: z
		.string({ required_error: 'Imagen requerida' })
		.min(1, { message: 'Imagen requerida' })
		.max(2000, { message: 'Debe de ser un maximo de 500 caracteres' }),
	image2: z
		.string({ required_error: 'Imagen requerida' })
		.min(1, { message: 'Imagen requerida' })
		.max(2000, { message: 'Debe de ser un maximo de 500 caracteres' }),
	image3: z
		.string({ required_error: 'Imagen requerida' })
		.min(1, { message: 'Imagen requerida' })
		.max(2000, { message: 'Debe de ser un maximo de 500 caracteres' }),
	weight: z
		.string({ required_error: 'Peso requerido' })
		.min(1, { message: 'Peso requerido' })
		.max(9999999999, { message: 'Debe de ser un maximo de 9999999999' }),
	stock: z.array(
		z.object({
			provider: z
				.string({ required_error: 'Provider requerido' })
				.min(1, { message: 'Provider requerido' }),
			provider_cost: z
				.string({ required_error: 'Provider Coste requerido' })
				.min(1, { message: 'Provider Coste requerido' }),
			color: z
				.string({ required_error: 'Color requerido' })
				.min(1, { message: 'Color requerido' }),
			size: z
				.string({ required_error: 'Talla requerida' })
				.min(1, { message: 'Talla requerida' }),
			quantity: z
				.string({ required_error: 'Stock requerido' })
				.min(1, { message: 'Stock requerido' }),
		})
	),
});

export const productEditionSchema = z.object({
	category: z.string({ required_error: 'Categorias requeridas' }).optional(),
	seasson: z.string({ required_error: 'Temporada requerida' }).optional(),

	description_en: z
		.string({ required_error: 'Descripicion en ingles requerida' })
		.optional(),
	description_es: z
		.string({ required_error: 'Descripicion en Español requerida' })
		.optional(),
	name_en: z
		.string({ required_error: 'Nombre en ingles requerido' })
		.optional(),
	name_es: z
		.string({ required_error: 'Nombre en Español requerido' })
		.optional(),
	price_en: z
		.string({ required_error: 'Precio en dolares requerido' })
		.optional(),
	price_es: z
		.string({ required_error: 'Precio en pesos requerido' })
		.optional(),
	image0: z.string({ required_error: 'Imagen requerida' }).optional(),
	image1: z.string({ required_error: 'Imagen requerida' }).optional(),
	image2: z.string({ required_error: 'Imagen requerida' }).optional(),
	image3: z.string({ required_error: 'Imagen requerida' }).optional(),
	weight: z.string({ required_error: 'Peso requerido' }).optional(),
	stock: z.array(
		z.object({
			provider: z.string().optional(),
			provider_cost: z.string().optional(),
			color: z.string().optional(),

			size: z.string().optional(),

			quantity: z.string().optional(),
		})
	),
});
