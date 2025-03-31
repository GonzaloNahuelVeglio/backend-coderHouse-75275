import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:8080/api';

// PRODUCTOS
async function testProducts() {
  console.log('\n--- PRUEBAS PRODUCTOS ---');
  console.log('\n\nCrear nuevo producto...');
  // POST - Crear producto
  const newProduct = {
    title: "Producto de prueba",
    description: "Este es un producto de test",
    code: "TEST-001",
    price: 999,
    status: true,
    stock: 10,
    category: "Test",
    thumbnails: ["img/test.jpg"]
  };

  const created = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct)
  });
  const product = await created.json();
  console.log('Producto creado:', product);

  console.log('\n\nObtener todos los productos...');

  // GET - Obtener todos
  const all = await fetch(`${BASE_URL}/products`);
  console.log('Todos los productos:', await all.json());

  console.log('\n\nObtener producto por ID...');
  const productID = await fetch(`${BASE_URL}/products/${product.id}`);
  console.log('Producto por ID:', await productID.json());


  console.log('\n\nModificar un producto por ID')
  // PUT - Modificar
  const updated = await fetch(`${BASE_URL}/products/${product.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ price: 1234 })
  });
  console.log('Producto actualizado:', await updated.json());

  console.log('\n\nEliminar un producto por ID...')
  // DELETE
  const deleted = await fetch(`${BASE_URL}/products/${product.id}`, {
    method: 'DELETE'
  });
  console.log('Producto eliminado, status:', deleted.status);
}

// CARRITOS
async function testCarts() {
  console.log('\n--- PRUEBAS CARRITOS ---');

  console.log('\n\nCrear nuevo carrito...');
  // Crear carrito
  const cartRes = await fetch(`${BASE_URL}/carts`, { method: 'POST' });
  const cart = await cartRes.json();
  console.log('Carrito creado:', cart);

  console.log('\n\nAgregar producto al carrito...');
  // Agregar producto al carrito
  const add = await fetch(`${BASE_URL}/carts/${cart.id}/product/1`, {
    method: 'POST'
  });
  console.log('Producto agregado al carrito:', await add.json());

  console.log('\n\nVer un carrito...');
  // Ver carrito
  const view = await fetch(`${BASE_URL}/carts/${cart.id}`);
  console.log('Contenido del carrito:', await view.json());
}

// Ejecutar pruebas
(async () => {
  await testProducts();
  await testCarts();
})();
