import Product from '../models/products.js'; 


const addProduct = async (product) => {
  try {
    const newProduct = new Product(product); 
    await newProduct.save(); 
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
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ];
    } 

    let sortOption = {};
    if (sort === 'asc') sortOption.price = 1;  
    else if (sort === 'desc') sortOption.price = -1; 
    else if (sort === 'category') sortOption.category = 1; 
    else if (sort === 'name') sortOption.title = 1; 

    
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
    console.error('Error real:', error);
    throw new Error('Error al obtener los productos');
  }
};



const getProductById = async (id) => {
  try {
    const product = await Product.findById(id).lean(); 
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  } catch (error) {
    throw new Error('Error al obtener el producto');
  }
};


const modProduct = async (id, updatedProduct) => {
  try {
    const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true }); 
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  } catch (error) {
    throw new Error('Error al actualizar el producto');
  }
};


const deleteProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id); 
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
