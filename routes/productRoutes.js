import express from 'express';
import productController from '../controller/productController.js';

const router = express.Router();

router.get('/', productController.getProducts);

router.get('/:pid', productController.getProductById);

router.post('/', productController.addProduct);

router.put('/:pid', productController.modProduct);

router.delete('/:pid', productController.deleteProduct);

export default router;