document.addEventListener('DOMContentLoaded', function () {
    const productosContainer = document.getElementById("productContainer");

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
    });
});
