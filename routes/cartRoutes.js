import express from 'express';
import cartController from '../controller/cartController.js';

const router = express.Router();

router.post('/', cartController.createCart);

router.get('/:cid', cartController.getCartById);

router.post('/:cid/product/:pid', cartController.addProductToCart);

export default router;