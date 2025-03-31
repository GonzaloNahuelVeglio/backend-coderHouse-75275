import productManager from '../managers/productManager.js';

const getProducts = (req, res) => {
  try {
    const products = productManager.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
};

const getProductById = (req, res) => {
  const { pid } = req.params;
  try {
    const product = productManager.getProductById(parseInt(pid));
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto', error: error.message });
  }
};

const addProduct = (req, res) => {
  try {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || !price || status === undefined || !stock || !category || !thumbnails) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }
    const newProduct = productManager.addProduct({ title, description, code, price, status, stock, category, thumbnails });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar producto', error: error.message });
  }
};

const modProduct = (req, res) => {
  const { pid } = req.params;
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  try {
    const updatedProduct = productManager.modProduct(parseInt(pid), { title, description, code, price, status, stock, category, thumbnails });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al modificar producto', error: error.message });
  }
};

const deleteProduct = (req, res) => {
  const { pid } = req.params;
  try {
    productManager.deleteProduct(parseInt(pid));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
  }
};

export default { getProducts, getProductById, addProduct, modProduct, deleteProduct };