// File: app.js
import express from 'express';
import { engine } from 'express-handlebars';
import { createServer } from 'http';
import { Server } from 'socket.io';
import productManager from './managers/productManager.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

const app = express();
const http = createServer(app);
const io = new Server(http);

app.use(express.static('public'));


app.engine('handlebars', engine({
  defaultLayout: 'main' 
}));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.get('/', (req, res) => {
  const products = productManager.getProducts();
  res.render('home', { title: 'Productos', products }); 
});

app.get('/realtimeproducts', (req, res) => {
  const products = productManager.getProducts();
  res.render('realTimeProducts', { products });
});

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.emit('updateProducts', productManager.getProducts());

  socket.on('addProduct', (product) => {
    productManager.addProduct(product);
    io.emit('updateProducts', productManager.getProducts());
  });

  socket.on('deleteProduct', (id) => {
    productManager.deleteProduct(id);
    io.emit('updateProducts', productManager.getProducts());
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

http.listen(8080, () => {
  console.log('Servidor corriendo en el puerto 8080');
});
