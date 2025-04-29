 import express from 'express';
import productManager from '../managers/productManager.js';

const router = express.Router();

router.get('/', (req, res) => {
  const products = productManager.getProducts();
  res.render('home', { title: 'Productos', products });
});

router.get('/product/:id', (req, res) => {
  const product = productManager.getProductById(req.params.id);
  if (!product) return res.status(404).send('Producto no encontrado');
  res.render('productPage', { product });
});

router.get('/realtimeproducts', (req, res) => {
  const products = productManager.getProducts();
  res.render('realTimeProducts', { products });
});

export default router;
