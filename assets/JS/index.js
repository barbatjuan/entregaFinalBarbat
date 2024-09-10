document.addEventListener('DOMContentLoaded', function () {
  let titulo = document.getElementById("titulo");
  titulo.innerHTML = "Raciones Caninas Uruguay";

  let footerP = document.getElementById("footer");
  const actualYear = new Date().getFullYear();
  footerP.innerHTML = "Todos los derechos reservados ;) " + actualYear;

  // Elementos del DOM
  const buscadorInput = document.createElement('input');
  buscadorInput.type = 'text';
  buscadorInput.id = 'buscador-input';
  buscadorInput.placeholder = 'Busca tu producto...';

  const mainElement = document.querySelector('main');
  const productosContainer = document.getElementById('productContainer');
  mainElement.insertBefore(buscadorInput, productosContainer);

  let productos = [];

  async function obtenerProductos() {
    try {
      const response = await fetch('https://api.mercadolibre.com/sites/MLU/search?q=alimentomascotas');
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      return [];
    }
  }

  async function renderizarProductos() {
    productos = await obtenerProductos();
    productosContainer.innerHTML = '';
    productos.forEach(prod => {
      let productoDiv = document.createElement("div");
      productoDiv.className = "productoItem";
      productoDiv.innerHTML = `
              <img src="${prod.thumbnail}" alt="${prod.title}" class="producto-img" />
              <h3>${prod.title}</h3>
              <p>Tipo de Mascota: ${prod.category_name || 'Desconocido'}</p>
              <p>Etapa de Vida: ${prod.condition === 'new' ? 'Nuevo' : 'Usado'}</p>
              <p>Precio: $${prod.price}</p>
              <button class="agregar-btn" data-id="${prod.id}">Agregar</button>
              <button class="eliminar-btn" data-id="${prod.id}">Eliminar</button>
          `;
      productosContainer.appendChild(productoDiv);
    });
  }

  renderizarProductos();

  buscadorInput.addEventListener('input', async function () {
    const textoBusqueda = buscadorInput.value.toLowerCase();
    const productosFiltrados = productos.filter(prod =>
      prod.title.toLowerCase().includes(textoBusqueda)
    );
    productosContainer.innerHTML = '';
    productosFiltrados.forEach(prod => {
      let productoDiv = document.createElement("div");
      productoDiv.className = "productoItem";
      productoDiv.innerHTML = `
              <img src="${prod.thumbnail}" alt="${prod.title}" class="producto-img" />
              <h3>${prod.title}</h3>
              <p>Tipo de Mascota: ${prod.category_name || 'Desconocido'}</p>
              <p>Etapa de Vida: ${prod.condition === 'new' ? 'Nuevo' : 'Usado'}</p>
              <p>Precio: $${prod.price}</p>
              <button class="agregar-btn" data-id="${prod.id}">Agregar</button>
              <button class="eliminar-btn" data-id="${prod.id}">Eliminar</button>
          `;
      productosContainer.appendChild(productoDiv);
    });
  });

  productosContainer.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('agregar-btn')) {
      let productoId = event.target.getAttribute('data-id');
      let productoItem = productos.find(p => p.id === productoId);

      if (productoItem) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let productoEnCarrito = carrito.find(p => p.id === productoId);

        if (productoEnCarrito) {
          productoEnCarrito.cantidad = (productoEnCarrito.cantidad || 1) + 1;
        } else {
          carrito.push({ ...productoItem, cantidad: 1 });
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
      }
    }

    if (event.target && event.target.classList.contains('eliminar-btn')) {
      let productoId = event.target.getAttribute('data-id');
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      let productoEnCarrito = carrito.find(p => p.id === productoId);

      if (productoEnCarrito) {
        if (productoEnCarrito.cantidad > 1) {
          productoEnCarrito.cantidad -= 1;
        } else {
          carrito = carrito.filter(p => p.id !== productoId);
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
      }
    }
  });
});
