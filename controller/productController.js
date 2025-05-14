import Product from '../models/products.js';

const getProducts = async (req, res) => {
  try {
    const { limit = 8, page = 1 , sort, query } = req.query;
    const products = await productManager.getProducts({ limit, page, sort, query });

    // Obtener el total de productos para calcular la cantidad de páginas
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    res.json({
      status: 'success',
      payload: products,
      totalPages,
      page: page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/api/products?page=${page - 1}` : null,
      nextLink: page < totalPages ? `/api/products?page=${page + 1}` : null,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
};


const getProductById = async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManager.getProductById(pid); // Obtener producto por ID
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto', error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body); // Agregar producto
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar producto', error: error.message });
  }
};

const modProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const updatedProduct = await productManager.modProduct(pid, req.body); // Modificar producto
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al modificar producto', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManager.deleteProduct(pid); // Eliminar producto
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
  }
};

export default { getProducts, getProductById, addProduct, modProduct, deleteProduct };
