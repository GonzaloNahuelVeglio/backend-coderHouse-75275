const path = './data/products.json';
import fs from 'fs';

class ProductManager {
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


  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === parseInt(id));
    if (!product) {
      return null;
    }
    return product;
  }

  modProduct(id, updatedProduct) {
    const productIndex = this.products.findIndex((p) => p.id === parseInt(id));
    if (productIndex === -1) {
      throw new Error(`Producto con ID ${id} no encontrado.`);
    }

    // Actualizar el producto
    const updatedFields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails'];
    for (const field of updatedFields) {
      if (updatedProduct[field] !== undefined) {
        this.products[productIndex][field] = updatedProduct[field];
      }
    }

    this.save();
    console.log(`Producto con ID ${id} modificado:`, this.products[productIndex]);
    return this.products[productIndex];
  }

  // Método para eliminar un producto por ID
  deleteProduct(id) {
    const productIndex = this.products.findIndex((p) => p.id === parseInt(id));
    if (productIndex === -1) {
      throw new Error(`Producto con ID ${id} no encontrado.`);
    }

    // Eliminar el producto
    this.products.splice(productIndex, 1);
    console.log(`Producto con ID ${id} eliminado`);
    this.save();
  }

  
  // Método para agregar un nuevo producto
  addProduct(product) {
    const requiredFields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails'];

    // Verificar que todos los campos requeridos estén presentes
    for (const field of requiredFields) {
      if (!product[field]) {
        throw new Error(`El campo "${field}" es obligatorio.`);
      }
    }

    // Verificar que el código sea único
    const existingProduct = this.products.find(p => p.code === product.code);
    if (existingProduct) {
      throw new Error(`El código "${product.code}" ya está en uso.`);
    }

    // Crear el nuevo producto
    const newId = this.products.length ? this.products[this.products.length - 1].id + 1 : 1;
    const newProduct = { id: newId, ...product };
    this.products.push(newProduct);
    this.save();
    console.log(`Producto agregado:`, newProduct);
    return newProduct;
  }
}

export default new ProductManager();
