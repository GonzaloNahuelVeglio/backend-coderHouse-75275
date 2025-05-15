import express from 'express';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import { createServer } from 'http';
import { Server } from 'socket.io'; 
import connectDB from './db/connect.js';

import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import viewsRoutes from './routes/viewsRoutes.js';
import socketHandler from './socketHandler.js'; 



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const http = createServer(app);
const io = new Server(http);


app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
 
// Helpers para Handlebars
const hbsHelpers = {
  multiply: (a, b) => a * b,
  sum: (a, b) => a + b,
  totalQuantity: (products) => products.reduce((acc, item) => acc + item.quantity, 0),
  totalPrice: (products) => products.reduce((acc, item) => acc + (item.quantity * (item.productId?.price || 0)), 0)
};

app.engine('handlebars', engine({
  defaultLayout: 'main',
  helpers: hbsHelpers
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
app.post('/uploadImage', multer({ storage }).single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se ha subido ninguna imagen' }); // Cambié a una respuesta JSON
  }
  res.json({ imagePath: `/images/${req.file.filename}` });
});

 
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewsRoutes);

// Conectar a la base de datos
connectDB();

 
socketHandler(io);

http.listen(8080, () => {
  console.log('Servidor corriendo en el puerto 8080');
});
