document.addEventListener('DOMContentLoaded', function () {
  // Configuración inicial
  let titulo = document.getElementById("titulo");
  titulo.innerHTML = "Raciones Caninas Uruguay";
  let footerP = document.getElementById("footer");
  const actualYear = new Date().getFullYear();
  footerP.innerHTML = "Todos los derechos reservados ;) " + actualYear;

  // Datos de productos
  const producto = [
    { id: 1, nombreProducto: "Equilibrio TR", tipoMascota: "Perro", etapaVida: "Adulto", precio: 3490 },
    { id: 2, nombreProducto: "Equilibrio CH", tipoMascota: "Perro", etapaVida: "Cachorro", precio: 3790 },
    { id: 3, nombreProducto: "Natural Choice", tipoMascota: "Gato", etapaVida: "Adulto", precio: 1490 },
    { id: 4, nombreProducto: "Full Nutrition", tipoMascota: "Perro", etapaVida: "Adulto", precio: 2190 },
    { id: 5, nombreProducto: "Equilibrio CH", tipoMascota: "Perro", etapaVida: "Cachorro", precio: 3790 },
    { id: 6, nombreProducto: "Equilibrio Raza Grande", tipoMascota: "Perro", etapaVida: "Adulto", precio: 3590 },
    { id: 7, nombreProducto: "Equilibrio CH Raza Grande", tipoMascota: "Perro", etapaVida: "Cachorro", precio: 3890 },
    { id: 8, nombreProducto: "Natural Choice", tipoMascota: "Perro", etapaVida: "Adulto", precio: 2490 },
    { id: 9, nombreProducto: "Full Nutrition", tipoMascota: "Perro", etapaVida: "Cachorro", precio: 2090 },
    { id: 10, nombreProducto: "Frost", tipoMascota: "Gato", etapaVida: "Cachorro", precio: 1890 },
    { id: 11, nombreProducto: "Frost", tipoMascota: "Gato", etapaVida: "Adulto", precio: 1790 },
    { id: 12, nombreProducto: "Frost", tipoMascota: "Perro", etapaVida: "Adulto", precio: 2790 }
  ];

  // buscar productos
  const buscadorInput = document.createElement('input');
  buscadorInput.type = 'text';
  buscadorInput.id = 'buscador-input';
  buscadorInput.placeholder = 'Busca tu producto...';

  const mainElement = document.querySelector('main');
  const productosContainer = document.getElementById('productContainer');
  mainElement.insertBefore(buscadorInput, productosContainer);

  function renderizarProductos(productosFiltrados = producto) {
    productosContainer.innerHTML = '';
    productosFiltrados.forEach(prod => {
      let productoDiv = document.createElement("div");
      productoDiv.className = "productoItem";
      productoDiv.innerHTML = `
        <h3>${prod.nombreProducto}</h3>
        <p>Tipo de Mascota: ${prod.tipoMascota}</p>
        <p>Etapa de Vida: ${prod.etapaVida}</p>
        <p>Precio: $${prod.precio}</p>
        <button class="agregar-btn" data-id="${prod.id}">Agregar</button>
        <button class="eliminar-btn" data-id="${prod.id}">Eliminar</button>
      `;
      productosContainer.appendChild(productoDiv);
    });
  }
  renderizarProductos();

  // evento busqueda
  buscadorInput.addEventListener('input', function () {
    const textoBusqueda = buscadorInput.value.toLowerCase();
    const productosFiltrados = producto.filter(prod =>
      prod.nombreProducto.toLowerCase().includes(textoBusqueda)
    );
    renderizarProductos(productosFiltrados);
  });

  // agregar productos al carrito
  productosContainer.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('agregar-btn')) {
      let productoId = parseInt(event.target.getAttribute('data-id'), 10);
      let productoItem = producto.find(p => p.id === productoId);

      if (productoItem) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(productoItem);
        localStorage.setItem('carrito', JSON.stringify(carrito));
      }
    }

    // eliminar producto del carrito de a uno
    if (event.target && event.target.classList.contains('eliminar-btn')) {
      let productoId = parseInt(event.target.getAttribute('data-id'), 10);
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

      // Encuentra el índice del primer producto con el id correspondiente
      let index = carrito.findIndex(prod => prod.id === productoId);

      if (index !== -1) {
        // Elimina solo el producto en el índice encontrado
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
      }
    }
  });
});