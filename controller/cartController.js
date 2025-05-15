import Cart from '../models/carts.js';  // Asegúrate de importar el modelo Cart

// Crear un carrito vacío
const createCart = async (req, res) => {
  try {
    const newCart = new Cart();
    await newCart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el carrito', error: error.message });
  }
};

// Ver carrito por ID
const getCartById = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await Cart.findById(cid).populate('products.productId'); // populate para obtener los detalles del producto
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el carrito', error: error.message });
  }
};

const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;  // Obtener el ID del carrito y el ID del producto
  const { quantity } = req.body;  // Obtener la cantidad del producto

  try {
    // Buscar el carrito por ID
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    // Verificar si el producto ya existe en el carrito
    const productIndex = cart.products.findIndex(item => item.productId.toString() === pid);

    if (productIndex === -1) {
      // Si el producto no está en el carrito, lo agregamos
      cart.products.push({ productId: pid, quantity });
    } else {
      // Si el producto ya está en el carrito, se actualiza la cantidad
      cart.products[productIndex].quantity += quantity;
    }

    // Guardar los cambios en el carrito
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar producto al carrito', error: error.message });
  }
};

const removeProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    // Eliminar el producto del carrito
    cart.products = cart.products.filter(item => item.productId.toString() !== pid);
    await cart.save();  // Guardar el carrito actualizado
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto del carrito', error: error.message });
  }
};

// Modificar la cantidad de un producto en el carrito
const updateProductQuantityInCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const productIndex = cart.products.findIndex(item => item.productId.toString() === pid);
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }

    cart.products[productIndex].quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al modificar la cantidad del producto en el carrito', error: error.message });
  }
};

const clearCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    // Vaciar el carrito
    cart.products = [];
    await cart.save();  // Guardar el carrito vacío
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al limpiar el carrito', error: error.message });
  }
};

// Actualizar todos los productos del carrito
const updateAllProductsInCart = async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body; // [{ productId, quantity }, ...]
  try {
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    cart.products = products;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar productos del carrito', error: error.message });
  }
};

export default { createCart, getCartById, addProductToCart, removeProductFromCart, updateProductQuantityInCart, clearCart, updateAllProductsInCart };
