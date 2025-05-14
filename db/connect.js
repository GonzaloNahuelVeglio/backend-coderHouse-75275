import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_USER = process.env.MONGO_DB_USER;
const MONGO_PASSWORD = process.env.MONGO_DB_PASS;
const MONGO_HOST = process.env.MONGO_DB_HOST;

console.log('MONGO_USER:', process.env.MONGO_DB_USER);
console.log('MONGO_PASSWORD:', process.env.MONGO_DB_PASS);
console.log('MONGO_HOST:', process.env.MONGO_DB_HOST);

// const uri = `mongodb+srv://gveglio:Coder75275@cluster0.9gsqupz.mongodb.net/tienda_online?retryWrites=true&w=majority&appName=Cluster0`;
const uri = MONGO_HOST;
 
 
async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1); // Finaliza la aplicación si no se puede conectar
  }
}

export default connectDB;
