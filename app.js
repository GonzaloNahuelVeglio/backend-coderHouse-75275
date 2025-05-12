import express from 'express';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';  

dotenv.config();
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import viewsRoutes from './routes/viewsRoutes.js';
import socketHandler from './socketHandler.js';

const MONGO_USER = process.env.MONGO_DB_PASS;
const MONGO_PASSWORD = process.env.MONGO_DB_USER;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const http = createServer(app);
const io = new Server(http);

  
app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.9gsqupz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(uri)
.then(() => {
  console.log('Conectado a la base de datos');
}).catch(err => {
  console.error('Error al conectar a la base de datos', err);
});


app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
app.post('/uploadImage', multer({ storage }).single('image'), (req, res) => {
  if (!req.file) return res.status(400).send('No se ha subido ninguna imagen');
  res.json({ imagePath: `/images/${req.file.filename}` });
});

 
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewsRoutes);

 
socketHandler(io);

http.listen(8080, () => {
  console.log('Servidor corriendo en el puerto 8080');
});
