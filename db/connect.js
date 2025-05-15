import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_USER = process.env.MONGO_DB_USER;
const MONGO_PASSWORD = process.env.MONGO_DB_PASS;
const MONGO_HOST = process.env.MONGO_DB_HOST; 

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
