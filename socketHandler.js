 import productManager from './managers/productManager.js';

export default function socketHandler(io) {
  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    socket.emit('updateProducts', productManager.getProducts());

    socket.on('addProduct', (product) => {
      try { 
        productManager.addProduct(product);
        io.emit('updateProducts', productManager.getProducts());
      } catch (error) {
        console.error('Error al agregar producto:', error.message);
      }
    });

    socket.on('deleteProduct', (id) => {
      productManager.deleteProduct(id);
      io.emit('updateProducts', productManager.getProducts());
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
}
