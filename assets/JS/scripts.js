
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carritoContainer');
    carritoContainer.innerHTML = '';

    if (carrito.length === 0) {
        carritoContainer.textContent = 'No hay productos en el carrito.';
    } else {
        carrito.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('producto');

            div.innerHTML = `
                <p>${item.title} - $${item.price} (Cantidad: ${item.cantidad})</p>
                <button class="eliminar-btn" data-id="${item.id}">X</button>
            `;

            carritoContainer.appendChild(div);
        });

        const botonesEliminar = document.querySelectorAll('.eliminar-btn');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', eliminarProductoDelCarrito);
        });
    }
}


function eliminarProductoDelCarrito(event) {
    const productoId = event.target.getAttribute('data-id');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoEnCarrito = carrito.find(item => item.id === productoId);

    if (productoEnCarrito) {

        if (productoEnCarrito.cantidad > 1) {
            productoEnCarrito.cantidad -= 1;
        } else {

            carrito = carrito.filter(item => item.id !== productoId);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));

        mostrarCarrito();

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

document.addEventListener('DOMContentLoaded', mostrarCarrito);
