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
    let { limit = 8, page = 1, sort, query } = queryParams;
    limit = parseInt(limit);
    page = parseInt(page);
    const filter = {};
    // Permitir buscar por categoría o disponibilidad
    if (query) {
      if (query === 'disponibles') {
        filter.stock = { $gt: 0 };
      } else {
        filter.category = query;
      }
    }
    let sortOption = {};
    if (sort === 'asc') sortOption.price = 1;
    else if (sort === 'desc') sortOption.price = -1;
    // Contar total de productos según filtro
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    const products = await Product.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sortOption)
      .lean();
    return {
      products,
      totalPages,
      page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      totalProducts
    };
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
