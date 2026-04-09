// ============================
// LOAD CART
// ============================

const checkoutItems = document.getElementById("checkout-items");

const checkoutTotal = document.getElementById("checkout-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ============================
// DISPLAY CHECKOUT ITEMS
// ============================

function displayCheckoutItems() {
  if (!checkoutItems) return;

  checkoutItems.innerHTML = "";

  let total = 0;

  // If cart empty

  if (cart.length === 0) {
    checkoutItems.innerHTML = `

<p>Your cart is empty.</p>

`;

    checkoutTotal.textContent = "0";

    return;
  }

  // Render items

  cart.forEach((item) => {
    total += item.price * item.quantity;

    let div = document.createElement("div");

    div.classList.add("checkout-item");

    div.innerHTML = `

<img src="${item.image}">

<div>

<h4>${item.name}</h4>

<p>

₹${item.price} × ${item.quantity}

</p>

<p>

Subtotal: ₹${item.price * item.quantity}

</p>

</div>

`;

    checkoutItems.appendChild(div);
  });

  // Update total

  checkoutTotal.textContent = total;
}

// ============================
// PLACE ORDER
// ============================

function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");

    return;
  }

  // Clear cart

  localStorage.removeItem("cart");

  // Redirect

  window.location.href = "success.html";
}

// ============================
// INITIAL LOAD
// ============================

displayCheckoutItems();
