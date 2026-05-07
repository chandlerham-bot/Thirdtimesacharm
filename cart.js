function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + (item.quantity || 0), 0);
    const countElement = document.getElementById('cart-count');
    const statusElement = document.getElementById('cart-status');

    if (countElement) {
        countElement.textContent = count;
    }

    if (statusElement) {
        statusElement.textContent = count === 0 ? 'Cart is empty' : `${count} item${count === 1 ? '' : 's'} in cart`;
    }
}

function addToCart(productName, productPrice) {
    const cart = getCart();
    const existingItem = cart.find((item) => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartDisplay();
    alert(productName + ' added to cart!');
}

document.addEventListener('DOMContentLoaded', updateCartDisplay);
