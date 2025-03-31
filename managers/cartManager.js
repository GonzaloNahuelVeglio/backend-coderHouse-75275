import fs from 'fs'; // Módulo para manejar archivos
const path = './data/carts.json'; // Ruta del archivo de carritos

class CartManager {
  constructor() {
    this.carts = this.load();
  }

  // Método para cargar los carritos desde el archivo JSON
  load() {
    try {
      if (fs.existsSync(path)) {
        const data = fs.readFileSync(path, 'utf-8');
        return JSON.parse(data);
      }
      return []; // Si el archivo no existe, devolvemos un arreglo vacío
    } catch (error) {
      console.error('Error al cargar los carritos:', error);
      return [];
    }
  }

  // Método para guardar los carritos en el archivo JSON
  save() {
    try {
      fs.writeFileSync(path, JSON.stringify(this.carts, null, 2));
    } catch (error) {
      console.error('Error al guardar los carritos:', error);
    }
  }

  // Método para crear un nuevo carrito
  createCart() {
    const newCart = { id: this.carts.length + 1, products: [] };
    this.carts.push(newCart);
    this.save();
    return newCart;
  }

  // Método para obtener un carrito por ID
  getCartById(id) {
    return this.carts.find(cart => cart.id === id);
  }

  // Método para agregar un producto al carrito
  addProductToCart(cartId, productId) {
    const cart = this.getCartById(cartId);
    if (!cart) return null;
    
    const productIndex = cart.products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
      cart.products.push({ id: productId, quantity: 1 });
    } else {
      cart.products[productIndex].quantity += 1;
    }

    this.save();
    return cart;
  }
}

export default new CartManager();
