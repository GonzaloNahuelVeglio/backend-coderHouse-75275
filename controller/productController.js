import Product from '../models/products.js';
import * as productManager from '../managers/productManager.js';

const getProducts = async (req, res) => {
  try {
    const { limit = 8, page = 1, sort, query } = req.query;
    const result = await productManager.getProducts({ limit, page, sort, query });
    const { products, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = result;
    res.json({
      status: 'success',
      payload: products,
      totalPages,
      page: Number(page),
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      prevLink: hasPrevPage ? `/api/products?page=${prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null,
      nextLink: hasNextPage ? `/api/products?page=${nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al obtener productos', error: error.message });
  }
};

const getProductById = async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManager.getProductById(pid);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto', error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar producto', error: error.message });
  }
};

const modProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const updatedProduct = await productManager.modProduct(pid, req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al modificar producto', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManager.deleteProduct(pid);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
  }
};

export default { getProducts, getProductById, addProduct, modProduct, deleteProduct };
