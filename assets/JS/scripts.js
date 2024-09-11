// Función para mostrar el carrito
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carritoContainer');
    carritoContainer.innerHTML = ''; // Limpiar contenido anterior

    if (carrito.length === 0) {
        carritoContainer.textContent = 'No hay productos en el carrito.';
    } else {
        carrito.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('producto'); // Clase para estilo

            // Crear el contenido del producto con el botón de eliminar
            div.innerHTML = `
                <p>${item.title} - $${item.price} (Cantidad: ${item.cantidad})</p>
                <button class="eliminar-btn" data-id="${item.id}">Eliminar 1 Unidad</button>
            `;

            // Añadir el producto al contenedor
            carritoContainer.appendChild(div);
        });

        // Agregar evento a los botones de eliminar
        const botonesEliminar = document.querySelectorAll('.eliminar-btn');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', eliminarProductoDelCarrito);
        });
    }
}

// Función para eliminar una unidad de un producto del carrito
function eliminarProductoDelCarrito(event) {
    const productoId = event.target.getAttribute('data-id');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Encontrar el producto en el carrito
    const productoEnCarrito = carrito.find(item => item.id === productoId);

    if (productoEnCarrito) {
        // Reducir la cantidad del producto
        if (productoEnCarrito.cantidad > 1) {
            productoEnCarrito.cantidad -= 1;
        } else {
            // Si la cantidad es 1, eliminar el producto del carrito
            carrito = carrito.filter(item => item.id !== productoId);
        }

        // Guardar los cambios en el localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Volver a mostrar el carrito
        mostrarCarrito();

        // Mostrar SweetAlert para el producto eliminado
        Swal.fire({
            title: 'Producto eliminado',
            text: `Una unidad del producto ha sido eliminada del carrito.`,
            imageUrl: './../../assets/images/nocat.png',
            imageWidth: 200,
            imageAlt: 'Un lindo gatito',
            timer: 1500,
            confirmButtonText: 'Cerrar',
        });
    }
}

// Llama a esta función cuando la página cargue
document.addEventListener('DOMContentLoaded', mostrarCarrito);
