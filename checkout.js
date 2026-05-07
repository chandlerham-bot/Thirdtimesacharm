// Function to display cart items on checkout page
function displayCheckoutCart() {
    const cart = getCart();
    const checkoutCartElement = document.getElementById('checkout-cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    if (!checkoutCartElement || !cartTotalElement) return;

    checkoutCartElement.innerHTML = '';

    if (cart.length === 0) {
        checkoutCartElement.innerHTML = '<p>Your cart is empty</p>';
        cartTotalElement.textContent = '';
    } else {
        let total = 0;
        cart.forEach((item) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'checkout-cart-item';
            const price = parseFloat(item.price.replace('$', ''));
            const itemTotal = price * item.quantity;
            total += itemTotal;
            itemElement.innerHTML = `
                <span class="item-name">${item.name}</span>
                <span class="item-quantity">Qty: ${item.quantity}</span>
                <span class="item-price">${item.price} each</span>
                <span class="item-total">$${itemTotal.toFixed(2)}</span>
            `;
            checkoutCartElement.appendChild(itemElement);
        });
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
}

// Handle form submission
document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const orderData = Object.fromEntries(formData.entries());

    // For now, just alert the order details
    alert('Order placed successfully!\n\n' + JSON.stringify(orderData, null, 2));

    // Clear the cart
    saveCart([]);
    updateCartDisplay();

    // Redirect back to shop or home
    window.location.href = 'shop.html';
});

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    displayCheckoutCart();
});