
import mongoose from 'mongoose';
import dotenv from 'dotenv';  
/*
Codigo para cargar productos desde un archivo JSON a MongoDB
Este script lee un archivo JSON con datos de productos y los inserta en una colección de MongoDB.
*/
dotenv.config();
import fs from 'fs';
import Product from './models/products.js'; 

const MONGO_USER = process.env.MONGO_DB_PASS;
const MONGO_PASSWORD = process.env.MONGO_DB_USER;
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.9gsqupz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; 

mongoose.connect(uri)
.then(() => {
  console.log('Conectado a la base de datos');
}).catch(err => {
  console.error('Error al conectar a la base de datos', err);
});


const productsData = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));


const insertProducts = async () => {
  try {
    
    await Product.deleteMany({});
    
    
    const result = await Product.insertMany(productsData);
    console.log('Productos insertados:', result);
  } catch (error) {
    console.error('Error al insertar los productos:', error);
  }
};


insertProducts();
