// Shopping Cart Logic
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productName, productPrice) {
    let product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total-price");
    if (!cartItems || !totalPrice) return; // Prevents errors if elements are not on the page
    
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${item.name} - $${item.price} x ${item.quantity} 
            <button onclick="removeFromCart(${index})" class="delete-btn" style="padding: 3px 6px; font-size: 12px; border-radius: 3px;">Delete</button>`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });
    totalPrice.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

document.addEventListener("DOMContentLoaded", updateCart);

function checkout() {
    let loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
        alert("You need to log in before checking out.");
        window.location.href = "login.html";
    } else {
        alert("Thank you for your purchase!");
        cart = [];
        localStorage.removeItem("cart");
        updateCart();
    }
}

// Login and Registration Logic
function toggleForms() {
    let loginForm = document.getElementById("login-form");
    let registerForm = document.getElementById("register-form");
    loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
    registerForm.style.display = registerForm.style.display === "none" ? "block" : "none";
}

function register() {
    let username = document.getElementById("register-username").value;
    let password = document.getElementById("register-password").value;
    if (username && password) {
        localStorage.setItem(username, password);
        alert("Registration successful! You can now log in.");
        toggleForms();
    } else {
        alert("Please fill in all fields.");
    }
}

function login() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;
    if (localStorage.getItem(username) === password) {
        localStorage.setItem("loggedInUser", username);
        alert("Login successful!");
        window.location.href = "home.html";
    } else {
        alert("Invalid username or password.");
    }
}
