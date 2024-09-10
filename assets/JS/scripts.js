document.addEventListener('DOMContentLoaded', () => {
    const cartItemsString = localStorage.getItem('cart');
    console.log('Cart Items String:', cartItemsString);

    let cartItems = [];
    try {
        cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];
    } catch (e) {
        console.error('Error parsing cart items:', e);
    }
    console.log('Cart Items:', cartItems);

    const productList = document.getElementById('product-list');

    function displayProducts() {
        productList.innerHTML = '';

        if (cartItems.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No hay productos en el carrito.';
            productList.appendChild(li);
            return;
        }

        cartItems.forEach(item => {
            if (item.nombreProducto && item.precio) {
                const li = document.createElement('li');
                li.textContent = `${item.nombreProducto} - ${item.precio} USD`;
                productList.appendChild(li);
            } else {
                console.error('Item malformado:', item);
            }
        });
    }

    displayProducts();
});

