const socket = io();

async function addToCart(productId) {
  let cartId = localStorage.getItem('cartId');
  
  if (!cartId) {
    const res = await fetch('/api/carts', { method: 'POST' });
    if (!res.ok) {
      Swal.fire('Error', 'No se pudo crear el carrito', 'error');
      return;
    }
    const cart = await res.json();
    cartId = cart._id;
    localStorage.setItem('cartId', cartId);
  }

  
  const res = await fetch(`/api/carts/${cartId}/product/${productId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity: 1 })
  });

  if (res.ok) {
    Swal.fire('Producto agregado', 'El producto se ha agregado a tu carrito', 'success');
  } else {
    Swal.fire('Error', 'No se pudo agregar el producto', 'error');
  }
}

function removeProduct(productId) {
  
  const cartId = localStorage.getItem('cartId');
  if (!cartId) {
    Swal.fire('Error', 'No se encontró el carrito', 'error');
    return;
  }
  fetch(`/api/carts/${cartId}/products/${productId}`, {
    method: 'DELETE'
  }).then(res => {
    if (res.ok) {
      Swal.fire('Producto eliminado', 'El producto ha sido eliminado de tu carrito', 'success').then(() => {
        location.reload();
      });
    } else {
      Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
    }
  });
}

function clearCart() {
  const cartId = localStorage.getItem('cartId');
  if (!cartId) {
    Swal.fire('Error', 'No se encontró el carrito', 'error');
    return;
  }
  fetch(`/api/carts/${cartId}`, {
    method: 'DELETE'
  }).then(res => {
    if (res.ok) {
      Swal.fire('Carrito vacío', 'Todos los productos han sido eliminados del carrito', 'success').then(() => {
        location.reload();
      });
    } else {
      Swal.fire('Error', 'No se pudo vaciar el carrito', 'error');
    }
  });
}

