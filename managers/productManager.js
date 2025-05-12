import fs from 'fs';
const path = './data/products.json';
import Product from '../models/products.js';

class productManager {
  constructor() {
    this.products = this.load();
  }

  load() {
    try {
      if (fs.existsSync(path)) {
        const data = fs.readFileSync(path, 'utf-8');
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      console.error('Error al cargar los productos:', error);
      return [];
    }
  }

  save() {
    try {
      fs.writeFileSync(path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.error('Error al guardar los productos:', error);
    }
  }

   getProducts =   (limit = 10, page = 1, query = {}, sort = 'asc') => {
    try {
      const filter = {}; // Filtro de búsqueda (por ejemplo, categoría o disponibilidad)
      if (query.category) {
        filter.category = query.category;
      }
      if (query.available) {
        filter.stock = { $gt: 0 }; // Filtrar solo productos disponibles
      }
  
      const products =   Product.find(filter)
        .skip((page - 1) * limit) // Paginación
        .limit(Number(limit))     // Límite de productos por página
        .sort({ price: sort === 'desc' ? -1 : 1 }); // Ordenar por precio
  
      const totalProducts =   Product.countDocuments(filter); // Obtener el total de productos
      const totalPages = Math.ceil(totalProducts / limit); // Calcular el número total de páginas
  
      return {
        status: 'success',
        payload: products,
        totalPages,
        page,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
        prevLink: page > 1 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
        nextLink: page < totalPages ? `/api/products?page=${page + 1}&limit=${limit}` : null,
      };
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  };
  

  getProductById(id) {
    const product = this.products.find((p) => p.id === parseInt(id));
    if (!product) {
      return null;
    }
    return product;
  }

 addProduct =  (productData) => {
    try {
      const product = new Product(productData); // Crea una instancia del modelo
        product.save(); // Guarda el producto en la base de datos
      return product; // Devuelve el producto agregado
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      throw error;
    }
  };
  

  modProduct(id, updatedProduct) {
    const productIndex = this.products.findIndex((p) => p.id === parseInt(id));
    if (productIndex === -1) {
      throw new Error(`Producto con ID ${id} no encontrado.`);
    }

    
    const updatedFields = ['title', 'description', 'code', 'price',  'stock', 'category', 'thumbnails'];
    for (const field of updatedFields) {
      if (updatedProduct[field] !== undefined) {
        this.products[productIndex][field] = updatedProduct[field];
      }
    }

    this.save();
    console.log(`Producto con ID ${id} modificado:`, this.products[productIndex]);
    return this.products[productIndex];
  }

  
    deleteProduct =   (id) => {
    try {
      const result =   Product.findByIdAndDelete(id); // Elimina el producto por su ID
      if (!result) {
        throw new Error('Producto no encontrado');
      }
      return result; // Devuelve el producto eliminado
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw error;
    }
  };
  
 
}

export default new productManager();
