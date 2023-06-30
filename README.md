# Ecomerce frontend
Este proyecto es un ecomerce desarrollado con React, Redux , y Styled-Components.
Actualmente se encuentra consumiendo [esta Api](). 
Para mayor entendimiento de la Api y sus endpoints , se recomienda leer detenidamente la [Documentacion del proyecto](), cualquier duda, feedback será bienvenida,


## Características

- Tema oscuro y Tema claro
- Manejo se Sesiones
- Carrito de compras implementado
- Paginacion Implementada
- Busqueda de productos
- Productos recomendados
- Accesibilidad
- Full Responsive
- Slider estatico
- Añadir / quitar del carrito 
- Filtro por Color / tamaño y Dia
- Toastify para el manejo de notificaciones
- Pasarela de pago Con stripe

## Enpoints

- obtencion de todos los productos de la db
- obtencion de productos relacionados
- obtencion de un producto por id
- añadir al carrito de compras
- crear orden de compra
- Pagos con Stripe
- Crear usuario / iniciar sesion


## Capturas de Pantalla

![Captura de pantalla 1](ruta/captura1.png)
![Captura de pantalla 2](ruta/captura2.png)

## Requisitos

- Tener instalado nodeJs
- Tener instalado npm
- Conocimientos Basicos de React y de Css
- Tener una Key de Stripe


## Instalación
- Primero se aseguran de tener instalados [nodejs]() y [Npm]()
- Luego le hacen un Fork al proyecto
- Abren la terminal en la carpeta root del proyecto y ejecuntan `npm i` , y por ultimo `npm start`
- En el Crean un archivo .env y ponen su Api de Stripe (ESTO ES SOLO SI SE TIENE QUE TOCAR LA API DE STRIPE)
## Uso
- En la carpeta Components, estan los componentes (materiales reutilizables)
- En la carpeta Pages, estan las Vistas, los lugares en donde se renderizan los componentes.
- En la carpeta data, estan los elementos iterables , (como elementos del footer, navbar, etc)
- En la carpeta Uitls, esta el tema , los mensajes de inicio de sesion, los mensajes a devolver de Toastify, y la logica de las funciones / llamadas a la api
- En requestMethods, se encuentra la configuracion del Axios, usen publicRequests para realizar las llamada a la api, ya que esta configurado para enviar la cookie.
- En la carpeta Redux se encuentra la configuracion de Redux-Toolkit
- En responsive.js Estan los objetos para mantener el proyecto full responsive

## Contribución
- Mantengan los cambios chicos, y limpios (si tu pr es sobre el carrito de compras, que no hayan cambios en otro componente que no tiene relacion con el carrito de compras por ej)
- Sean claros en los Prs y subanlos con Screenshots siempre. Ej Que solucionaste?, Porque se deberia implementar tu Pr?, + Screenshoots o videos. (PR sin evidencia no se acepta)
- Antes de hacer un PR hagan `git pull `, para mantener su proyecto actualizado y evitar conflictos luego
- Los Prs haganlos a la rama Development
- Ser Respetuosos con los demas

## Guía de Estilo

Directrices de estilo de código y convenciones de nomenclatura.
- El componente /vista, tiene sus estilos en la parte superior , por debajo de las importaciones, El elemento padre es el `Container` y el elemento hijo es el `Wrapper`, los demas elementos deben ser descriptivos en base a su respectivo elemento HTML.

## Licencia

Licencia bajo la cual se distribuye el proyecto GNU


## Agradecimientos

Menciones especiales a personas o proyectos que han contribuido o inspirado el proyecto.

## Soporte

- Screenshot del error
- En que navegador obtuviste el error?
- Que version del navegador / software tenes?
- Cuando obtuviste el error?

## Roadmap
- Visualizar carrito de compras de usuario
- visualizar ordenes pendientes
- cancelar ordenes pendientes
- Eliminar carritos
- editar contenido el carrito
- Promptear al usuario cuando se quiera deslogear


Planificación futura y mejoras planeadas para el proyecto.
