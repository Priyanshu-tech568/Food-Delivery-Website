// --- script.js (full working cart logic) ---

// global cart array (keeps in memory and uses localStorage)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add-to-cart buttons (works on menu.html)
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".add-cart").forEach(btn => {
        btn.addEventListener("click", () => {
            const food = btn.closest(".food");
            // read values from DOM (safe fallback if data- attributes missing)
            const name = food.dataset.name || food.querySelector("h3").innerText;
            const price = Number(food.dataset.price || food.querySelector("p").innerText.replace("₹", ""));
            const img = food.dataset.img || "";

            const item = { name, price, img, qty: 1 };
            addToCart(item);
        });
    });
});

// add item to cart (in-memory + localStorage)
function addToCart(item) {
    const idx = cart.findIndex(x => x.name === item.name);
    if (idx > -1) cart[idx].qty++;
    else cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(item.name + " added to cart 🛒");
}

// ------------- cart page functions -------------
function loadCart() {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("total");

    if (!container) {
        // not on cart page — nothing to render
        return;
    }

    if (cart.length === 0) {
        container.innerHTML = "<h3>Your cart is empty 😢</h3>";
        if (totalEl) totalEl.innerText = "";
        return;
    }

    container.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="left">
        <span class="item-name">${item.name}</span>
      </div>

      <div class="middle">
        <span class="item-price">₹${item.price}</span>
      </div>

      <div class="qty-box">
        <button onclick="updateQty(${i}, -1)">-</button>
        <span class="qty">${item.qty}</span>
        <button onclick="updateQty(${i}, 1)">+</button>
      </div>

      <div class="right">
        <button class="remove" onclick="removeItem(${i})">Remove</button>
      </div>
    </div>
  `).join("");

    updateTotal();
}

function updateQty(i, delta) {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[i].qty += delta;
    if (cart[i].qty < 1) cart[i].qty = 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(i) {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function updateTotal() {
    const totalEl = document.getElementById("total");
    const cartNow = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cartNow.reduce((s, it) => s + it.qty * it.price, 0);
    if (totalEl) totalEl.innerText = "Total: ₹" + total;
}

function checkout() {
    alert("Payment system coming soon!");
}
