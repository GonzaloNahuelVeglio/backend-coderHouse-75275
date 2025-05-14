import express from 'express'; 
import * as productManager from '../managers/productManager.js';
import Product from '../models/products.js'; // <-- AGREGA ESTA LÍNEA
const router = express.Router();

router.get('/', async (req, res) => {
const { limit = 8, page = 1, sort = 'asc', query = '' } = req.query;
  const products = await productManager.getProducts({ limit, page, sort, query });

  // Contar total de productos según el filtro
  const totalProducts = await Product.countDocuments(query ? { category: query } : {});
  const totalPages = Math.ceil(totalProducts / limit);

  res.render('home', {
    products,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    prevPage: Number(page) - 1,
    nextPage: Number(page) + 1,
    currentPage: Number(page),
    totalPages,
    limit,
    sort,
    query
  }); 
});

router.get('/product/:id', async (req, res) => {
  const product = await productManager.getProductById(req.params.id);
  if (!product) return res.status(404).send('Producto no encontrado');
  res.render('productPage', { product });
});

router.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts({});
  res.render('realTimeProducts', { products });
});

export default router;
