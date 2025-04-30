# 🛒 Backend CoderHouse 75275

Este proyecto es una aplicación backend diseñada para gestionar un catálogo de productos y carritos de compras. Incluye funcionalidades como visualización de productos, adición y eliminación en tiempo real mediante **WebSockets**, y un diseño moderno utilizando **TailwindCSS** y **Handlebars** como motor de plantillas.

---

## 🚀 Funcionalidades

### Productos
- **Visualización**: Lista de productos con detalles como título, precio, descripción, categoría y stock.
- **Adición**: Agregar nuevos productos con validación de campos.
- **Eliminación**: Eliminar productos en tiempo real.
- **Edición**: (En construcción) Modificar productos existentes.

### Carrito de Compras
- **Creación de carritos**: Generar nuevos carritos vacíos.
- **Gestión de productos en el carrito**: (En construcción) Añadir productos al carrito.

### Tiempo Real
- **WebSockets**: Implementación de **Socket.IO** para actualizar la lista de productos en tiempo real.

---

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js, Express.js
- **Frontend**: Handlebars, TailwindCSS
- **WebSockets**: Socket.IO
- **Gestión de Archivos**: Multer para subir imágenes.
- **Base de Datos**: Archivos JSON simulando persistencia.

---

## 📂 Estructura del Proyecto

```plaintext
backend-coderHouse-75275/
├── app.js                     # Configuración principal del servidor
├── socketHandler.js           # Gestión de eventos WebSocket
├── controllers/               # Controladores de lógica de negocio
│   ├── cartController.js      # Controlador para carritos
│   └── productController.js   # Controlador para productos
├── managers/                  # Gestión de datos
│   ├── cartManager.js         # Lógica para carritos
│   └── productManager.js      # Lógica para productos
├── routes/                    # Rutas de la API y vistas
│   ├── cartRoutes.js          # Rutas para carritos
│   ├── productRoutes.js       # Rutas para productos
│   └── viewsRoutes.js         # Rutas para vistas
├── views/                     # Plantillas Handlebars
│   ├── layouts/
│   │   └── main.handlebars    # Layout principal
│   ├── home.handlebars        # Página de inicio
│   ├── productPage.handlebars # Detalle de producto
│   └── realTimeProducts.handlebars # Gestión en tiempo real
├── data/                      # Archivos JSON simulando base de datos
│   ├── carts.json             # Datos de carritos
│   └── products.json          # Datos de productos
├── public/                    # Archivos estáticos
│   └── images/                # Imágenes subidas
├── .gitignore                 # Archivos ignorados por Git
├── package.json               # Dependencias y scripts
└── README.MD                  # Documentación del proyecto
```

---

## 🌐 Rutas Principales

### API de Productos
- `GET /api/products`: Obtener todos los productos.
- `GET /api/products/:pid`: Obtener un producto por ID.
- `POST /api/products`: Agregar un nuevo producto.
- `PUT /api/products/:pid`: (En construcción) Modificar un producto.
- `DELETE /api/products/:pid`: Eliminar un producto.

### API de Carritos
- `POST /api/carts`: Crear un nuevo carrito.
- `GET /api/carts/:cid`: Obtener un carrito por ID.
- `POST /api/carts/:cid/product/:pid`: (En construcción) Agregar un producto al carrito.

### Vistas
- `/`: Página principal con lista de productos.
- `/product/:id`: Detalle de un producto.
- `/realtimeproducts`: Gestión de productos en tiempo real.

---

## 🎨 Diseño

- **Frontend**: Utiliza **TailwindCSS** para un diseño moderno y responsivo.
- **Plantillas**: **Handlebars** permite la reutilización de componentes y layouts.
- **Interactividad**: **SweetAlert2** para modales interactivos y alertas.

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

3. Inicia el servidor:
   ```bash
   npm run dev
   ```

4. Accede a la aplicación en [http://localhost:8080](http://localhost:8080).

---

## 🧩 Mejoras Futuras

- Implementar la funcionalidad de edición de productos.
- Añadir productos al carrito y gestionar cantidades.
- Integrar una base de datos real como MongoDB o MySQL.
- Mejorar la validación de datos en el backend.

---

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**. Puedes usarlo, modificarlo y distribuirlo libremente.

---

## ✨ Autor

Desarrollado por [Gonzalo Nahuel Veglio](https://www.linkedin.com/in/gonzalo-nahuel-veglio/). Si tienes alguna pregunta o sugerencia, no dudes en contactarme.
