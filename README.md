# proyecto-cine-backend
Trabajo conjunto, con Front de otro repositorio complementario. 
Este proyecto es la API backend para un sistema de reserva de butacas en cines. Permite gestionar cines, películas, horarios y reservas a través de operaciones CRUD (Crear, Leer, Actualizar y Eliminar). El backend está construido con Node.js y Express, y utiliza MongoDB como base de datos.
--

Estructura del Proyecto
El proyecto está organizado en varias carpetas y archivos, cada uno con una función específica:
Estructura de Carpetas
/models: Contiene los modelos de datos de Mongoose que representan las colecciones en la base de datos.
/routes: Define las rutas de la API para manejar las solicitudes HTTP.
/controllers: Contiene la lógica de negocio que maneja las operaciones de las rutas.
/config: Incluye la configuración de la conexión a la base de datos y otras configuraciones necesarias.
/middleware: Contiene middlewares personalizados para manejar errores y validar solicitudes.
--

Modelos de Datos:
a. Cinema.js:
Representa un cine en la base de datos.
Incluye campos como nombre, ubicación, y salas.
Define las relaciones con las películas y horarios.
b. Movie.js:
Representa una película.
Incluye campos como título, duración, y tráiler.
Permite asociar múltiples horarios.
c. Showtime.js:
Representa un horario de una película en un cine específico.
Incluye campos como fecha, cine, película, y disponibilidad.
d. Reservation.js:
Representa una reserva de butacas.
Incluye información sobre el usuario, las butacas seleccionadas y el horario reservado.

Rutas
a. Cines:
Rutas para manejar las operaciones sobre los cines:
GET /cines: Obtener la lista de cines.
POST /cines: Crear un nuevo cine.
PUT /cines/:id: Actualizar un cine existente.
DELETE /cines/:id: Eliminar un cine.
b. Películas:
Rutas para manejar las operaciones sobre las películas:
GET /peliculas: Obtener la lista de películas.
POST /peliculas: Crear una nueva película.
PUT /peliculas/:id: Actualizar una película existente.
DELETE /peliculas/:id: Eliminar una película.
c. Horarios:
Rutas para manejar las operaciones sobre los horarios:
GET /horarios: Obtener la lista de horarios.
POST /horarios: Crear un nuevo horario.
PUT /horarios/:id: Actualizar un horario existente.
DELETE /horarios/:id: Eliminar un horario.
d. Reservas:
Rutas para manejar las operaciones sobre reservas:
GET /reservas: Obtener la lista de reservas.
POST /reservas: Crear una nueva reserva.
DELETE /reservas/:id: Eliminar una reserva.

Middleware:
ErrorHandler.js: Middleware para manejar errores de manera centralizada y enviar respuestas adecuadas al cliente.
Validation.js: Middleware para validar los datos de entrada en las solicitudes.
--
Tecnologías Utilizadas:
Node.js: Entorno de ejecución para JavaScript del lado del servidor.
Express.js: Framework para construir aplicaciones web en Node.js.
MongoDB: Base de datos NoSQL utilizada para almacenar datos de manera flexible.
Mongoose: Biblioteca de modelado de objetos MongoDB para Node.js.
cors: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
---
Explicación del Flujo
Gestión de Cines: El administrador puede agregar, editar o eliminar cines a través de las rutas definidas.
Gestión de Películas: Permite al administrador añadir nuevas películas y asociarlas con horarios.
Gestión de Horarios: Los horarios se pueden crear y modificar según la disponibilidad de las salas y películas.
Reservas de Butacas: Los usuarios pueden realizar reservas de butacas a través de la API, asegurando que solo se puedan reservar asientos disponibles.
--
