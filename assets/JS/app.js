document.addEventListener('DOMContentLoaded', function () {
    let titulo = document.getElementById("titulo");
    titulo.innerHTML = "Raciones Caninas Uruguay";

    let footerP = document.getElementById("footer");
    const actualYear = new Date().getFullYear();
    footerP.innerHTML = "Todos los derechos reservados ;) " + actualYear;

    // Crear buscador si no existe
    if (!document.getElementById('buscador-input')) {
        const buscadorInput = document.createElement('input');
        buscadorInput.type = 'text';
        buscadorInput.id = 'buscador-input';
        buscadorInput.placeholder = 'Busca tu producto...';

        const mainElement = document.querySelector('main');
        const productosContainer = document.getElementById('productContainer');
        mainElement.insertBefore(buscadorInput, productosContainer);
    }

    let productos = [];

    // Obtener productos desde la API
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

    // Renderizar productos en el DOM
    async function renderizarProductos() {
        productos = await obtenerProductos();
        const productosContainer = document.getElementById('productContainer');
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

    // Filtrar productos al buscar
    document.getElementById('buscador-input').addEventListener('input', async function () {
        const textoBusqueda = this.value.toLowerCase();
        const productosFiltrados = productos.filter(prod =>
            prod.title.toLowerCase().includes(textoBusqueda)
        );
        const productosContainer = document.getElementById('productContainer');
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

    // Manejar clic en botones de agregar y eliminar
    document.getElementById('productContainer').addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('agregar-btn')) {
            handleAgregarProducto(event.target.getAttribute('data-id'));
        }

        if (event.target && event.target.classList.contains('eliminar-btn')) {
            handleEliminarProducto(event.target.getAttribute('data-id'));
        }
    });

    // Función para manejar agregar producto
    function handleAgregarProducto(productoId) {
        let productoItem = productos.find(p => p.id === productoId);

        if (productoItem) {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            let productoEnCarrito = carrito.find(p => p.id === productoId);

            if (productoEnCarrito) {
                productoEnCarrito.cantidad += 1; // Incrementar cantidad
            } else {
                carrito.push({ ...productoItem, cantidad: 1 }); // Agregar producto con cantidad 1
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));

            Swal.fire({
                title: 'Producto agregado',
                text: `El producto ${productoItem.title} ha sido agregado al carrito.`,
                imageUrl: './../../assets/images/okcat.png',
                imageWidth: 200,
                imageAlt: 'Un lindo gatito',
                timer: 1500,
                confirmButtonText: 'Cerrar',
            });
        }
    }

    // Función para manejar eliminar producto
    function handleEliminarProducto(productoId) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let productoEnCarrito = carrito.find(p => p.id === productoId);

        if (productoEnCarrito) {
            if (productoEnCarrito.cantidad > 1) {
                productoEnCarrito.cantidad -= 1; // Reducir la cantidad
            } else {
                carrito = carrito.filter(p => p.id !== productoId); // Eliminar el producto si la cantidad es 1
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));

            Swal.fire({
                title: 'Producto eliminado',
                text: `Una unidad del producto ${productoEnCarrito.title} ha sido eliminada del carrito.`,
                imageUrl: './../../assets/images/nocat.png',
                imageWidth: 200,
                imageAlt: 'Un lindo gatito',
                timer: 1500,
                confirmButtonText: 'Cerrar',
            });
        }
    }

    // Manejar clic en botón de hecho de gato
    const catFactBtn = document.getElementById('catFactBtn');
    if (catFactBtn) {
        catFactBtn.addEventListener('click', async () => {
            try {
                const response = await fetch('https://meowfacts.herokuapp.com/');
                const data = await response.json();
                Swal.fire({
                    title: 'Fact de Gato',
                    text: data.data[0],
                    confirmButtonText: 'Cerrar',
                    imageUrl: './../../assets/images/cat.png',
                    imageWidth: 200,
                    imageAlt: 'Un lindo gatito',
                });
            } catch (error) {
                console.error('Error al obtener datos de Cat Facts:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo obtener un hecho sobre gatos.',
                    icon: 'error',
                    confirmButtonText: 'Cerrar',
                    imageUrl: 'http://127.0.0.1:5500/assets/images/cat_17392690.png',
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Un lindo gatito',
                });
            }
        });
    }
});
