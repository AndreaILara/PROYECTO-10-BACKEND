# Movies APP 🎞

## Descripción
En este proyecto se han desarrollado dos modelos de datos: usuarios y películas. Las rutas creadas permiten obtener todas las películas de la base de datos. A través de la autenticación, los usuarios con rol de Administrador pueden subir, modificar o eliminar películas. Los usuarios con rol de usuario solo pueden visualizar películas y agregar aquellas que deseen ver a su lista de favoritos. Todos los usuarios pueden iniciar sesión, registrarse y administrar su lista de películas.

## Requisitos previos
Para replicar este proyecto, es necesario tener instalado Node.js y configurar una base de datos en MongoDB. Además, se deben instalar las siguientes dependencias:


```npm i -D nodemon```
```npm i bcrypt```
```npm i cloudinary```
```npm i cors```
```npm i dotenv```
```npm i express```
```npm i jsonwebtoken```
```npm i mongoose```
```npm i multer```
```npm i multer-storage-cloudinary```
```npm i puppeteer```



No olvides configurar los scripts en tu `package.json`:

"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "seed": "node src/seeds/movieSeed.js",
    "delete": "node src/utils/deleteMovies.js"
}

## Uso ⚙
Una vez instalado y configurado todo, ejecuta el siguiente comando para iniciar el servidor en tu entorno local:

```npm run start```

Para ejecutar el modo de observación de Node, utiliza:

```npm run dev```

## Rutas
Se han creado rutas que incluyen los métodos GET, POST, PUT y DELETE. Las rutas disponibles en esta API con sus respectivos endpoints son:

### Endpoints para Usuarios 👩🏻
1. GET /users: Obtiene una lista de todos los usuarios registrados y muestra las películas favoritas de cada uno.
2. GET /users/:id: Permite localizar un usuario por su ID y ver sus películas favoritas.
3. POST /users/register: Permite a nuevos usuarios registrarse en la aplicación. Si el nombre de usuario ya existe, se solicita elegir otro.
4. POST /users/login: Permite a los usuarios iniciar sesión (todas las contraseñas se encuentran encriptadas).
5. PUT /users/:id: Actualiza los detalles de un usuario, como su rol y lista de favoritos, en la base de datos, siempre que el usuario tenga los permisos necesarios.
6. POST /users/remove/:id: Permite a un usuario eliminar una película específica de su lista de favoritos, siempre que tenga los permisos adecuados y proporcione el ID de la película.

### Endpoints para Películas 🎞
1. GET /movies: Devuelve una lista de todas las películas en la base de datos.
2. GET /movies/:id: Devuelve los detalles de una película específica.
3. POST /movies: Crea una nueva entrada de película en la base de datos con los detalles proporcionados en el cuerpo de la solicitud. Puede requerir que el usuario sea un administrador y maneja la carga de archivos mediante Cloudinary.
4. PUT /movies/:id: Actualiza los detalles de una película existente. Se requiere permisos de administrador.
5. DELETE /movies/:id: Elimina una película específica de la base de datos según su ID. El usuario debe ser un administrador.
