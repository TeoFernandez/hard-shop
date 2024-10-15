// Script para mostrar los productos seleccionados en el checkout
function displayCheckoutCart() {
    const checkoutCart = document.getElementById('checkout-cart');
    const totalPriceElement = document.getElementById('total-price');
    fetch('/cart')  // Suponiendo que hay un endpoint /cart que retorna los productos
        .then(response => response.json())
        .then(data => {
            if (data.cart.length === 0) {
                checkoutCart.innerHTML = '<p>Tu carrito está vacío</p>';
            } else {
                let cartHTML = '<ul>';
                let total = 0;
                data.cart.forEach(item => {
                    cartHTML += `<li>${item.product} - $${item.price.toFixed(2)}</li>`;
                    total += item.price;
                });
                cartHTML += '</ul>';
                totalPriceElement.textContent = total.toFixed(2);
                checkoutCart.innerHTML = cartHTML;
            }
        });
}

// Llamamos a la función cuando se cargue la página
document.addEventListener('DOMContentLoaded', displayCheckoutCart);

