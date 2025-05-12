
import mongoose from 'mongoose';
import dotenv from 'dotenv';  

dotenv.config();
import fs from 'fs';
import Product from './models/products.js'; // Asegúrate de tener el modelo de Product importado

const MONGO_USER = process.env.MONGO_DB_PASS;
const MONGO_PASSWORD = process.env.MONGO_DB_USER;
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.9gsqupz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(uri)
.then(() => {
  console.log('Conectado a la base de datos');
}).catch(err => {
  console.error('Error al conectar a la base de datos', err);
});

// Leer los datos de productos
const productsData = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));

// Insertar los productos en MongoDB
const insertProducts = async () => {
  try {
    // Elimina todos los productos existentes antes de insertar nuevos (si deseas limpiar la base de datos)
    await Product.deleteMany({});
    
    // Inserta los productos desde el archivo JSON
    const result = await Product.insertMany(productsData);
    console.log('Productos insertados:', result);
  } catch (error) {
    console.error('Error al insertar los productos:', error);
  }
};

// Llamar a la función para insertar los productos
insertProducts();
