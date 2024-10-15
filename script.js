let cart = [];

function addToCart(product, price) {
    // Agrega el producto al carrito
    cart.push({ product, price });
    displayCart();  // Muestra el carrito actualizado
}

function displayCart() {
    const cartElement = document.getElementById('cart');
    if (cart.length === 0) {
        cartElement.innerHTML = '<p>Tu carrito está vacío</p>';
    } else {
        let cartHTML = '<ul>';
        let total = 0;
        cart.forEach(item => {
            cartHTML += `<li>${item.product} - $${item.price.toFixed(2)}</li>`;
            total += item.price;
        });
        cartHTML += `</ul><p>Total: $${total.toFixed(2)}</p>`;
        cartElement.innerHTML = cartHTML;
    }
}
