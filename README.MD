# Documentación de la API Backend
![Status](https://img.shields.io/badge/estado-en%20desarrollo-green)
![Version](https://img.shields.io/badge/versión-1.0.0-blue)
![Node](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen)

Este proyecto es una API backend para gestionar productos y carritos de compras. Está construido utilizando Node.js y Express, con una estructura modular para escalabilidad y mantenibilidad.

## 📋 Tabla de Contenidos 

- [✨ Características principales](#-características-principales)
- [🛠️ Instalación](#-instalación)
- [🚀 Scripts](#-scripts)
- [📦 Dependencias](#-dependencias)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🌐 Endpoints de la API](#-endpoints-de-la-api)
  - [Cómo usar `test.js`](#cómo-usar-testjs)
  - [📦 Rutas de Productos](#rutas-de-productos)
  - [🛒 Rutas de Carritos](#rutas-de-carritos)
- [📝 Notas](#-notas)

---

## ✨ Características principales

- Gestión completa de productos (CRUD)
- Administración de carritos de compra
- Persistencia de datos en archivos JSON
- Arquitectura modular para fácil extensión



## 🛠️ Instalación

1. Instalar las dependencias:
     ```bash
     npm install
     ```

---

## 🚀 Scripts

- Iniciar el servidor de desarrollo con recarga automática:
    ```bash
    npm run dev
    ```

---

## 📦 Dependencias

- **express**: Framework web para construir APIs.
- **nodemon**: Herramienta de desarrollo para reiniciar automáticamente el servidor al cambiar archivos.

Para la lista completa de dependencias, consulta el archivo `package.json`.

---

## 📁 Estructura del Proyecto

```
Backend/
├── controller/
│   ├── cartController.js
│   └── productController.js
├── data/
│   ├── carts.json
│   └── products.json
├── managers/
│   ├── CartManager.js
│   └── ProductManager.js
├── routes/
│   ├── cartRoutes.js
│   └── productRoutes.js
├── app.js
├── package.json
└── README.md
```

---

## 🌐 Endpoints de la API
Para realizar un testeo rápido del funcionamiento de los endpoints, se incluye un archivo llamado `test.js`. Este archivo ejecuta pruebas automatizadas que interactúan con las rutas de la API, verificando la creación, consulta, actualización y eliminación de productos y carritos. 

### Cómo usar `test.js`
1. Asegúrate de que el servidor esté corriendo en `http://localhost:8080`.
2. Ejecuta el archivo con el siguiente comando:
   ```bash
   node test.js

### 📦 Rutas de Productos

Base URL: `/api/products`

| Method | Endpoint         | Description                     |
|--------|------------------|---------------------------------|
| GET    | `/`              | Obtener todos los productos    |
| GET    | `/:pid`          | Obtener producto por ID        |
| POST   | `/`              | Agregar nuevo producto         |
| PUT    | `/:pid`          | Actualizar producto por ID     |
| DELETE | `/:pid`          | Eliminar producto por ID       |

# Pruebas de Rutas

### **Rutas de Productos (`/api/products`)**

1. **GET `/api/products`**
   - **Descripción**: Obtener todos los productos.
   - **Método**: GET
   - **URL**: `http://localhost:8080/api/products`
   - **Resultado esperado**: Un arreglo con los productos (vacío si no has agregado ninguno).

2. **POST `/api/products`**
   - **Descripción**: Crear un nuevo producto.
   - **Método**: POST
   - **URL**: `http://localhost:8080/api/products`
   - **Cuerpo de la solicitud (Body)**:
     ```json
     {
       "title": "Producto 3",
       "description": "Descripción 3",
       "price": 300,
       "stock": 15
     }
     ```
   - **Resultado esperado**: Un objeto JSON con el producto creado y un ID autogenerado:
     ```json
     {
       "id": 3,
       "title": "Producto 3",
       "description": "Descripción 3",
       "price": 300,
       "stock": 15
     }
     ```

3. **GET `/api/products/:pid`**
   - **Descripción**: Obtener un producto por su ID.
   - **Método**: GET
   - **URL**: `http://localhost:8080/api/products/3` (reemplazar `3` con el ID del producto que quieres consultar).
   - **Resultado esperado**: El producto con el ID especificado:
     ```json
     {
       "id": 3,
       "title": "Producto 3",
       "description": "Descripción 3",
       "price": 300,
       "stock": 15
     }
     ```

4. **PUT `/api/products/:pid`**
   - **Descripción**: Actualizar un producto por su ID.
   - **Método**: PUT
   - **URL**: `http://localhost:8080/api/products/3` (reemplazar `3` con el ID del producto que deseas actualizar).
   - **Cuerpo de la solicitud (Body)**:
     ```json
     {
       "price": 350,
       "stock": 20
     }
     ```
   - **Resultado esperado**: El producto actualizado con los nuevos datos:
     ```json
     {
       "id": 3,
       "title": "Producto 3",
       "description": "Descripción 3",
       "price": 350,
       "stock": 20
     }
     ```

5. **DELETE `/api/products/:pid`**
   - **Descripción**: Eliminar un producto por su ID.
   - **Método**: DELETE
   - **URL**: `http://localhost:8080/api/products/3` (reemplazar `3` con el ID del producto que deseas eliminar).
   - **Resultado esperado**: Un mensaje de éxito o el producto eliminado.

---


### 🛒 Rutas de Carritos

Base URL: `/api/carts`

| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| POST   | `/`                          | Crear un nuevo carrito                   |
| GET    | `/:cid`                      | Obtener carrito por ID                   |
| POST   | `/:cid/product/:pid`         | Agregar producto a un carrito            |

### **Rutas de Carritos (`/api/carts`)**

1. **POST `/api/carts`**
   - **Descripción**: Crear un nuevo carrito.
   - **Método**: POST
   - **URL**: `http://localhost:8080/api/carts`
   - **Resultado esperado**: Un objeto JSON con el carrito creado, por ejemplo:
     ```json
     {
       "id": 1,
       "products": []
     }
     ```

2. **GET `/api/carts/:cid`**
   - **Descripción**: Obtener un carrito por su ID.
   - **Método**: GET
   - **URL**: `http://localhost:8080/api/carts/1` (reemplazar `1` con el ID del carrito que quieres consultar).
   - **Resultado esperado**: El carrito con el ID especificado. Si es nuevo, estará vacío:
     ```json
     {
       "id": 1,
       "products": []
     }
     ```

3. **POST `/api/carts/:cid/product/:pid`**
   - **Descripción**: Agregar un producto a un carrito existente.
   - **Método**: POST
   - **URL**: `http://localhost:8080/api/carts/1/product/3` (reemplazar `1` con el ID del carrito y `3` con el ID del producto que deseas agregar).
   - **Resultado esperado**: El carrito actualizado con el producto agregado:
     ```json
     {
       "id": 1,
       "products": [
         {
           "id": 3,
           "quantity": 1
         }
       ]
     }
     ```

---

## 📝 Notas
El proyecto utiliza archivos JSON (products.json y carts.json) para persistir los datos.

Asegurarse de que la carpeta data/ exista y tenga permisos de escritura para que funcione correctamente.

---  