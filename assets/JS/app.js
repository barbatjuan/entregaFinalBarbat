document.addEventListener('DOMContentLoaded', function () {

    let titulo = document.getElementById("titulo");
    titulo.innerHTML = "Raciones Caninas Uruguay";

    let footerP = document.getElementById("footer");
    const actualYear = new Date().getFullYear();
    footerP.innerHTML = "Todos los derechos reservados ;) " + actualYear;

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

    const sonidoCatFact = new Audio('./../../assets/sounds/Cat_1.wav');

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

    function updateCartCount() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let totalItems = 0;

        carrito.forEach(item => {
            totalItems += item.cantidad;
        });

        const cartCountElement = document.getElementById('cart-count');
        cartCountElement.textContent = totalItems;
    }

    function handleAgregarProducto(productoId) {
        let productoItem = productos.find(p => p.id === productoId);

        if (productoItem) {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            let productoEnCarrito = carrito.find(p => p.id === productoId);

            if (productoEnCarrito) {
                productoEnCarrito.cantidad += 1;
            } else {
                carrito.push({ ...productoItem, cantidad: 1 });
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
                customClass: {
                    popup: 'swal3-popup'
                }
            });

            updateCartCount();
        }
    }

    function handleEliminarProducto(productoId) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let productoEnCarrito = carrito.find(p => p.id === productoId);

        if (productoEnCarrito) {
            if (productoEnCarrito.cantidad > 1) {
                productoEnCarrito.cantidad -= 1;
            } else {
                carrito = carrito.filter(p => p.id !== productoId);
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
                customClass: {
                    popup: 'swal2-popup'
                }
            });

            updateCartCount();
        }
    }

    function showCart() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let carritoText = carrito.length === 0 ? 'No hay productos en el carrito.' : '';
        let total = 0;

        carrito.forEach(item => {
            carritoText += `<p>${item.title} - $${item.price} (Cantidad: ${item.cantidad})</p>`;
            total += item.price * item.cantidad;
        });

        carritoText += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
        Swal.fire({
            title: 'Carrito',
            imageUrl: './../../assets/images/animal (1).png',
            imageWidth: 150,
            html: carritoText,
            confirmButtonText: 'Cerrar',
            customClass: {
                popup: 'swal3-popup'
            }
        });
    }

    document.getElementById('productContainer').addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('agregar-btn')) {
            handleAgregarProducto(event.target.getAttribute('data-id'));
        }

        if (event.target && event.target.classList.contains('eliminar-btn')) {
            handleEliminarProducto(event.target.getAttribute('data-id'));
        }
    });

    document.querySelector('.cart-widget').addEventListener('click', showCart);

    updateCartCount();

    renderizarProductos();

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

    const catFactBtn = document.getElementById('catFactBtn');
    if (catFactBtn) {
        catFactBtn.addEventListener('click', async () => {
            try {
                const response = await fetch('https://meowfacts.herokuapp.com/');
                const data = await response.json();

                sonidoCatFact.play();

                Swal.fire({
                    title: 'Fact de Gato',
                    text: data.data[0],
                    confirmButtonText: 'Cerrar',
                    imageUrl: './../../assets/images/cat.png',
                    imageWidth: 200,
                    imageAlt: 'Un lindo gatito',
                    customClass: {
                        popup: 'swal4-popup'
                    }
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
