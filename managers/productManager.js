import Product from '../models/products.js'; // Importar el modelo de MongoDB

// Agregar un nuevo producto
const addProduct = async (product) => {
  try {
    const newProduct = new Product(product); // Crear un nuevo producto con Mongoose
    await newProduct.save(); // Guardar en MongoDB
    console.log('Producto agregado:', newProduct);
    return newProduct;
  } catch (error) {
    throw new Error('Error al agregar el producto');
  }
};

const getProducts = async (queryParams) => {
  try {
    const { limit = 8, page = 1, sort = 'asc', query = '' } = queryParams; // Desestructurando query params

    // Filtrar por categoría o disponibilidad (si se pasa)
    const queryFilter = query ? { category: query } : {};

    const products = await Product.find(queryFilter)
      .limit(parseInt(limit)) // Limitar el número de resultados
      .skip((parseInt(page) - 1) * parseInt(limit)) // Paginación
      .sort({ price: sort === 'desc' ? -1 : 1 }) // Ordenamiento por precio (asc/desc)
      .lean(); // Convertir a objeto plano

    return products;
  } catch (error) {
    throw new Error('Error al obtener los productos');
  }
};


// Obtener un producto por ID
const getProductById = async (id) => {
  try {
    const product = await Product.findById(id).lean(); // Buscar por ID
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  } catch (error) {
    throw new Error('Error al obtener el producto');
  }
};

// Actualizar un producto por ID
const modProduct = async (id, updatedProduct) => {
  try {
    const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true }); // Actualizar producto en MongoDB
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  } catch (error) {
    throw new Error('Error al actualizar el producto');
  }
};

// Eliminar un producto por ID
const deleteProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id); // Eliminar producto
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    console.log('Producto eliminado:', product);
    return product;
  } catch (error) {
    throw new Error('Error al eliminar el producto');
  }
};

export { addProduct, getProducts, getProductById, modProduct, deleteProduct };
