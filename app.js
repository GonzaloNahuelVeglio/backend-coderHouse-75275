import express from 'express';
import cartRoutes from './routes/cartRoutes.js';
import productRoutes from './routes/productRoutes.js';


const app = express();

app.use(express.json()); // Para leer los cuerpos de las peticiones en JSON

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(8080, () => {
  console.log('Servidor corriendo en el puerto 8080');
});
