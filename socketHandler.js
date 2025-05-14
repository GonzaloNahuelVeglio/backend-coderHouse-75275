import { getProducts } from './managers/productManager.js'; // Agrega esta línea

export default function socketHandler(io) {
  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    const products = getProducts({});

    socket.on('addProduct', (product) => {
      try {
        productManager.addProduct(product);
        io.emit('updateProducts', productManager.getProducts());
      } catch (error) {
        console.error('Error al agregar producto:', error.message);
      }
    });

    socket.on('deleteProduct', (id) => {
      try {
        productManager.deleteProduct(id);
        io.emit('updateProducts', productManager.getProducts());
      } catch (error) {
        console.error('Error al eliminar producto:', error.message);
      }
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
}
