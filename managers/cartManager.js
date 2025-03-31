import fs from 'fs'; 
const path = './data/carts.json'; 
import productManager from './productManager.js';

class CartManager {
  constructor() {
    this.carts = this.load();
  }

  
  load() {
    try {
      if (fs.existsSync(path)) {
        const data = fs.readFileSync(path, 'utf-8');
        return JSON.parse(data);
      }
      return []; 
    } catch (error) {
      console.error('Error al cargar los carritos:', error);
      return [];
    }
  }

  
  save() {
    try {
      fs.writeFileSync(path, JSON.stringify(this.carts, null, 2));
    } catch (error) {
      console.error('Error al guardar los carritos:', error);
    }
  }

  
  createCart() {
    const newCart = { id: this.carts.length + 1, products: [] };
    this.carts.push(newCart);
    this.save();
    return newCart;
  }

  
  getCartById(id) {
    return this.carts.find(cart => cart.id === id);
  }

  
  addProductToCart(cartId, productId) {
    const cart = this.getCartById(cartId);
    if (!cart) return null;

    const productExists = productManager.getProductById(productId);
    if (!productExists) {
      throw new Error(`El producto con ID ${productId} no existe.`);
    }
    
    const productIndex = cart.products.findIndex(p => p.product === productId);
    if (productIndex === -1) {
      cart.products.push({ product: productId, quantity: 1 });
    } else {
      cart.products[productIndex].quantity += 1;
    }

    this.save();
    return cart;
  }
}

export default new CartManager();
