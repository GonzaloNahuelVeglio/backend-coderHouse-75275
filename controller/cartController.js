import cartManager from '../managers/CartManager.js';

const createCart = (req, res) => {
  try {
    const newCart = cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el carrito', error: error.message });
  }
};
 
const getCartById = (req, res) => {
  try {
    const cart = cartManager.getCartById(parseInt(req.params.cid));
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el carrito', error: error.message });
  }
};

const addProductToCart = (req, res) => {
  try {
    const cart = cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar producto al carrito', error: error.message });
  }
};

export default { createCart, getCartById, addProductToCart };