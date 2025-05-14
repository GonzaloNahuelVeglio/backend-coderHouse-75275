import express from 'express';
import Cart from '../models/carts.js'; 
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


// Ruta para ver el carrito
router.get('/cart/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await Cart.findById(cid).populate('products.productId');
    if (!cart) {
      return res.status(404).render('error', { message: 'Carrito no encontrado' });
    }
    res.render('cartPage', { cart });  // Renderiza la vista del carrito con los productos
  } catch (error) {
    res.status(500).render('error', { message: 'Error al obtener el carrito' });
  }
});

// Ruta para redirigir al carrito (si no existe, lo creamos)
router.get('/cart', async (req, res) => {
  try {
    let cart = await Cart.findOne({}); // Si deseas un solo carrito para todos los usuarios, usa este
    if (!cart) {
      cart = new Cart();
      await cart.save();  // Si no existe un carrito, lo creamos
    }
    res.redirect(`/cart/${cart._id}`);  // Redirige al carrito creado o existente
  } catch (error) {
    res.status(500).json({ message: 'Error al redirigir al carrito', error: error.message });
  }
});

export default router;
