// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Add event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        // Get the item details from the data attributes
        const item = {
            id: event.target.getAttribute('data-id'),
            name: event.target.getAttribute('data-name'),
            price: event.target.getAttribute('data-price')
        };

        // Get the existing cart from localStorage (or initialize an empty cart)
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Add the new item to the cart
        cart.push(item);

        // Store the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${item.name} added to cart!`);
    }
});

// Function to add items to the cart
function addToCart(itemId, name, price, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === itemId);
    
    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ id: itemId, name: name, price: price, quantity: quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart item count displayed on the menu page
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = `Cart: ${cartCount}`;
}

// Display cart items on the cart page
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemHTML = `
                <div class="cart-item">
                    <p>${item.name}</p>
                    <p>RM ${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <button onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
            `;
            cartItemsContainer.innerHTML += itemHTML;
        });
    }
}

// Remove item from the cart
function removeFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Refresh cart display
}

// Display cart items and total on the payment page
function displayPayment() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const paymentItemsContainer = document.getElementById('payment-items');
    let totalPrice = 0;

    paymentItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        paymentItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemHTML = `
                <div class="payment-item">
                    <p>${item.name}</p>
                    <p>RM ${item.price.toFixed(2)} x ${item.quantity}</p>
                    <p>Total: RM ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `;
            paymentItemsContainer.innerHTML += itemHTML;
            totalPrice += item.price * item.quantity;
        });
        document.getElementById('total-price').textContent = `Total: RM ${totalPrice.toFixed(2)}`;
    }
}

// Call displayPayment on payment page load
document.addEventListener('DOMContentLoaded', displayPayment);

// Proceed to payment process
function proceedToPayment() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to your cart before proceeding.');
    } else {
        alert('Proceeding to payment...');
        // Add payment gateway logic here (e.g., PayPal, Stripe)
    }
}

// Add event listeners to handle actions when the page loads
document.addEventListener('DOMContentLoaded', function () {
    if (document.body.id === 'menu-page') {
        updateCartCount(); // Update cart count on the menu page
    }

    if (document.body.id === 'cart-page') {
        displayCart(); // Display cart items on the cart page
    }

    if (document.body.id === 'payment-page') {
        displayPayment(); // Display cart items and total on the payment page
    }
});
