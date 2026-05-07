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

    // Update dropdown items
    updateCartDropdown(cart);
}

function updateCartDropdown(cart) {
    const cartItemsElement = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-button');

    if (!cartItemsElement) return;

    cartItemsElement.innerHTML = '';

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p>Your cart is empty</p>';
        if (checkoutButton) checkoutButton.style.display = 'none';
    } else {
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span class="item-name">${item.name}</span>
                <span class="item-quantity">Qty: ${item.quantity}</span>
                <span class="item-price">${item.price}</span>
                <button class="remove-item" onclick="removeFromCart(${index})" aria-label="Remove ${item.name} from cart">×</button>
            `;
            cartItemsElement.appendChild(itemElement);
        });
        if (checkoutButton) checkoutButton.style.display = 'block';
    }
}

function toggleCartDropdown() {
    const dropdown = document.getElementById('cart-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

function goToCheckout() {
    // Redirect to checkout page
    window.location.href = 'checkout.html';
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

function removeFromCart(index) {
    const cart = getCart();
    if (index >= 0 && index < cart.length) {
        const removedItem = cart[index];
        cart.splice(index, 1);
        saveCart(cart);
        updateCartDisplay();
        alert(removedItem.name + ' removed from cart!');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const cartWidget = document.querySelector('.cart-widget');
    const dropdown = document.getElementById('cart-dropdown');
    
    if (cartWidget && dropdown && !cartWidget.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

document.addEventListener('DOMContentLoaded', updateCartDisplay);
