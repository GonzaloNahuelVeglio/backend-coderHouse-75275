import express from 'express';
import Cart from '../models/carts.js'; 
import * as productManager from '../managers/productManager.js';
import Product from '../models/products.js'; // <-- AGREGA ESTA LÍNEA
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.get('/', async (req, res) => {
  const { limit = 8, page = 1, sort = 'asc', query = '' } = req.query;
  // El manager ahora devuelve un objeto con paginación y productos
  const result = await productManager.getProducts({ limit, page, sort, query });
  const { products, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = result;

  res.render('home', {
    products,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
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

router.get('/realTimeProducts', async (req, res) => {
  const { products } = await productManager.getProducts({ limit: 1000});
  res.render('realTimeProducts', { products });
});


// Ruta para ver el carrito
router.get('/cart/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    console.log('ID del carrito:', cid);  // Log para verificar el ID del carrito
    // Populate robusto para productos
    const cart = await Cart.findById(cid).populate({
      path: 'products.productId',
      model: 'Product'
    }).lean();
    if (!cart) {
      return res.status(404).render('error', { message: 'Carrito no encontrado' });
    }
    console.log('Contenido del carrito:', cart);  // Log para verificar el contenido del carrito
    res.render('cartPage', { cart });  // Renderiza la vista del carrito con los productos
  } catch (error) {
    res.status(500).render('error', { message: 'Error al obtener el carrito' });
  }
});

router.get('/cart', async (req, res) => {
  try {
    let cart = await Cart.findOne({});  // Busca el carrito en la base de datos
    if (!cart) {
      // Si no existe un carrito, lo creamos
      cart = new Cart();
      await cart.save();
    }
    res.redirect(`/cart/${cart._id}`);  // Redirige al carrito creado o existente
  } catch (error) {
    res.status(500).json({ message: 'Error al redirigir al carrito', error: error.message });
  }
});


export default router;
