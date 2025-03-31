import express from 'express';
import cartController from '../controller/cartController.js';

const router = express.Router();


// Ruta POST para crear un nuevo carrito
router.post('/', cartController.createCart);

// Ruta GET para obtener un carrito por ID
router.get('/:cid', cartController.getCartById);

// Ruta POST para agregar un producto a un carrito
router.post('/:cid/product/:pid', cartController.addProductToCart);

export default router;