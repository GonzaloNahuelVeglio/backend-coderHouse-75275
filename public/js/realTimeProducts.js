 
const socket = io();

function createProduct() {
  const title = document.getElementById('title').value;
  const price = document.getElementById('price').value;
  const code = document.getElementById('code').value;
  if (!title || !price || !code) {
    Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
    return;
  }
  socket.emit('addProduct', { title, price, code });
  Swal.fire('Éxito', 'Producto agregado correctamente', 'success');
}

function deleteProduct(id) {  
  socket.emit('deleteProduct', id);
}

function limpiarFormulario() {
  document.getElementById('title').value = '';
  document.getElementById('price').value = '';
  document.getElementById('code').value = '';
}
window.deleteProduct = deleteProduct;
socket.on('updateProducts', (products) => {
  const productList = document.getElementById('product-list');
  productList.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Título</th>
        <th>Precio</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  `;

  const tbody = productList.querySelector('tbody');
  products.forEach(product => {
    tbody.innerHTML += `
      <tr>
        <td>${product.id}</td>
        <td>${product.title}</td>
        <td>$${product.price}</td>
        <td>
          <button onclick="deleteProduct(${product.id})">Eliminar</button>
        </td>
      </tr>
    `;
  });

  limpiarFormulario();
});
 