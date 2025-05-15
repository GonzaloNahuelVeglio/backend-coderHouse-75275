# 🛒 Backend CoderHouse 75275

Este proyecto es una aplicación backend completa para la gestión de un catálogo de productos y carritos de compras, con funcionalidades modernas como búsqueda avanzada, paginación, carga de imágenes, vistas dinámicas y actualización en tiempo real. Utiliza una arquitectura robusta basada en Node.js, Express y MongoDB Atlas, integrando tecnologías de frontend como Handlebars y TailwindCSS para una experiencia visual atractiva.

---

## 🚀 Funcionalidades

### Productos
- **Visualización**: Lista de productos con detalles como título, precio, descripción, categoría, stock e imágenes.
- **Búsqueda avanzada**: Permite buscar productos por nombre o categoría, sin importar mayúsculas/minúsculas o coincidencia exacta.
- **Paginación y ordenamiento**: Navegación por páginas, orden por precio, nombre o categoría.
- **Adición**: Agregar nuevos productos con validación de campos y carga de imágenes (Multer).
- **Eliminación**: Eliminar productos en tiempo real.
- **Edición**: (En construcción) Modificar productos existentes.

### Carrito de Compras
- **Creación de carritos**: Generar nuevos carritos vacíos.
- **Gestión de productos en el carrito**: (En construcción) Añadir productos al carrito y gestionar cantidades.

### Tiempo Real
- **WebSockets**: Implementación de **Socket.IO** para actualizar la lista de productos en tiempo real en la vista de administración.

### Vistas y Experiencia de Usuario
- **Frontend**: Handlebars para renderizado dinámico y TailwindCSS para un diseño moderno y responsivo.
- **Carga de imágenes**: Subida de imágenes de productos con Multer.
- **Alertas y modales**: SweetAlert2 para notificaciones y confirmaciones interactivas.
- **Paginación y búsqueda**: Interfaz amigable para filtrar, buscar y navegar productos.

---

## 🛠️ Tecnologías y Librerías Utilizadas

- **Backend**: Node.js, Express.js
- **Base de Datos**: MongoDB Atlas (cloud) y Mongoose (ODM)
- **Frontend**: Handlebars, TailwindCSS
- **WebSockets**: Socket.IO
- **Carga de Archivos**: Multer
- **Variables de Entorno**: dotenv
- **Alertas**: SweetAlert2
- **Otras**: path, http, express-handlebars, nodemon (dev)

---

## 📂 Estructura del Proyecto

```plaintext
backend-coderHouse-75275/
├── app.js                     # Configuración principal del servidor
├── socketHandler.js           # Gestión de eventos WebSocket
├── db/
│   └── connect.js             # Conexión a MongoDB Atlas
├── controllers/               # Controladores de lógica de negocio
│   ├── cartController.js      # Controlador para carritos
│   └── productController.js   # Controlador para productos
├── managers/                  # Gestión de datos y lógica de negocio
│   ├── cartManager.js         # Lógica para carritos
│   └── productManager.js      # Lógica para productos (búsqueda, paginación, etc)
├── models/                    # Modelos de datos Mongoose
│   ├── carts.js
│   └── products.js
├── routes/                    # Rutas de la API y vistas
│   ├── cartRoutes.js          # Rutas para carritos
│   ├── productRoutes.js       # Rutas para productos
│   └── viewsRoutes.js         # Rutas para vistas
├── views/                     # Plantillas Handlebars
│   ├── layouts/
│   │   └── main.handlebars    # Layout principal
│   ├── home.handlebars        # Página de inicio (listado, búsqueda, paginación)
│   ├── productPage.handlebars # Detalle de producto
│   └── realTimeProducts.handlebars # Gestión en tiempo real
├── data/                      # (Opcional) Archivos JSON simulando base de datos local
│   ├── carts.json
│   └── products.json
├── public/                    # Archivos estáticos
│   ├── images/                # Imágenes subidas
│   └── js/                    # Funciones JS para el frontend
├── .env                       # Variables de entorno (no subir a git)
├── .gitignore                 # Archivos ignorados por Git
├── package.json               # Dependencias y scripts
└── README.MD                  # Documentación del proyecto
```

---

## 🌐 Rutas Principales

### API de Productos
- `GET /api/products`: Obtener todos los productos (con búsqueda, paginación y ordenamiento).
- `GET /api/products/:pid`: Obtener un producto por ID.
- `POST /api/products`: Agregar un nuevo producto (con imagen).
- `PUT /api/products/:pid`: (En construcción) Modificar un producto.
- `DELETE /api/products/:pid`: Eliminar un producto.

### API de Carritos
- `POST /api/carts`: Crear un nuevo carrito.
- `GET /api/carts/:cid`: Obtener un carrito por ID.
- `POST /api/carts/:cid/product/:pid`: (En construcción) Agregar un producto al carrito.

### Vistas
- `/`: Página principal con lista de productos, búsqueda, paginación y ordenamiento.
- `/product/:id`: Detalle de un producto.
- `/realtimeproducts`: Gestión de productos en tiempo real (admin).

---

## 🎨 Diseño y Experiencia

- **Frontend**: TailwindCSS para un diseño moderno y responsivo.
- **Plantillas**: Handlebars permite la reutilización de componentes y layouts.
- **Interactividad**: SweetAlert2 para modales interactivos y alertas.
- **Carga de imágenes**: Multer para subir imágenes de productos.
- **Búsqueda avanzada**: Filtro por nombre o categoría, insensible a mayúsculas/minúsculas y coincidencias parciales.
- **Paginación**: Navegación fácil entre páginas de productos.
- **Actualización en tiempo real**: Socket.IO para vistas de administración.

---

## ⚙️ Instalación y Uso

1. Clona el repositorio:
   ```bash
   git clone https://github.com/GonzaloNahuelVeglio/backend-coderHouse-75275.git
   cd backend-coderHouse-75275
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env`:
   ```env
   MONGO_DB_USER=tu_usuario
   MONGO_DB_PASS=tu_contraseña
   # (Opcional) MONGO_DB_HOST=tu_uri_local
   ```

4. Inicia el servidor:
   ```bash
   npm run dev
   ```

5. Accede a la aplicación en [http://localhost:8080](http://localhost:8080).

---
 

## ✨ Autor

Desarrollado por [Gonzalo Nahuel Veglio](https://www.linkedin.com/in/gonzalo-nahuel-veglio/). Si tienes alguna pregunta o sugerencia, no dudes en contactarme.
