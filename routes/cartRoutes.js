import express from 'express';
import cartController from '../controller/cartController.js';

const router = express.Router();

router.post('/', cartController.createCart);

router.get('/:cid', cartController.getCartById);

router.post('/:cid/product/:pid', cartController.addProductToCart);

router.delete('/:cid/products/:pid', cartController.removeProductFromCart);

router.put('/:cid', cartController.updateAllProductsInCart);

router.put('/:cid/products/:pid', cartController.updateProductQuantityInCart);

router.delete('/:cid', cartController.clearCart);

export default router;
