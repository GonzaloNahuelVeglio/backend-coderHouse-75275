import * as productManager from './managers/productManager.js';
import Cart from './models/carts.js';  
import Product from './models/products.js';

export default function socketHandler(io) {
  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('addProduct', async (product) => {
      try {
        await productManager.addProduct(product);
        const { products } = await productManager.getProducts({});
        io.emit('updateProducts', products);
      } catch (error) {
        console.error('Error al agregar producto:', error.message);
      }
    });

    socket.on('getProducts', async () => {
      try {
        const { products } = await productManager.getProducts({});
        socket.emit('updateProducts', products);
      } catch (error) {
        console.error('Error al obtener productos:', error.message);
      }
    });

    socket.on('deleteProduct', async (id) => {
      try {
        await productManager.deleteProduct(id);
        const { products } = await productManager.getProducts({});
        io.emit('updateProducts', products);
      } catch (error) {
        console.error('Error al eliminar producto:', error.message);
      }
    });

    socket.on('updateProduct', async ({ productId, updatedProduct }) => {
      try {
        const updated = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
        if (!updated) {
          socket.emit('error', { message: 'Producto no encontrado' });
          return;
        }
        const { products } = await productManager.getProducts({});
        io.emit('updateProducts', products);
        socket.emit('productUpdated', updated);  
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    
    socket.on('createCart', async ({ productId, quantity }) => {
      try {
        const newCart = new Cart();
        newCart.products.push({ productId, quantity });
        await newCart.save();
        socket.emit('cartCreated', newCart);
      } catch (error) {
        console.error('Error al crear el carrito:', error);
        socket.emit('error', { message: error.message });
      }
    });

    
    socket.on('addProductToCart', async ({ cartId, productId, quantity }) => {
      try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
          socket.emit('error', { message: 'Carrito no encontrado' });
          return;
        }

        const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
        if (productIndex === -1) {
          cart.products.push({ productId, quantity });
        } else {
          cart.products[productIndex].quantity += quantity;
        }

        await cart.save();
        socket.emit('updateCart', cart);
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
}
