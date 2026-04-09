// ============================
// PRODUCTS
// ============================

const products = [
  {
    id: 1,
    name: "Smart Watch",
    price: 1999,
    image: "images/watch.jpg",
    category: "electronics",
    rating: 0,
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 2999,
    image: "images/headphones.jpg",
    category: "electronics",
    rating: 0,
  },
  {
    id: 3,
    name: "Laptop",
    price: 49999,
    image: "images/laptop.jpg",
    category: "electronics",
    rating: 0,
  },
  {
    id: 4,
    name: "Smartphone",
    price: 15999,
    image: "images/phone.jpg",
    category: "electronics",
    rating: 0,
  },
  {
    id: 5,
    name: "Running Shoes",
    price: 2499,
    image: "images/shoes.jpg",
    category: "fashion",
    rating: 0,
  },
  {
    id: 6,
    name: "T-Shirt",
    price: 799,
    image: "images/tshirt.jpg",
    category: "fashion",
    rating: 0,
  },
  {
    id: 7,
    name: "Jeans",
    price: 1799,
    image: "images/jeans.jpg",
    category: "fashion",
    rating: 0,
  },
  {
    id: 8,
    name: "Backpack",
    price: 1299,
    image: "images/bag.jpg",
    category: "fashion",
    rating: 0,
  },
];

// ============================
// STORAGE
// ============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let selectedProduct = null;
let modalQty = 1;

// ============================
// DISPLAY PRODUCTS (FAST)
// ============================

function displayProducts(list = products) {
  let container = document.getElementById("product-container");

  if (!container) return;

  let html = "";

  list.forEach((product) => {
    let inWishlist = wishlist.some((p) => p.id === product.id);

    html += `

<div class="product-card">

<div class="product-image-wrapper">

<img src="${product.image}"
onclick="openModal(${product.id})">

<span
class="wishlist-heart
${inWishlist ? "active" : ""}"
onclick="toggleWishlist(${product.id},this)">
♥
</span>

</div>

<h3>${product.name}</h3>

<p>₹${product.price}</p>

<div class="rating">

${[1, 2, 3, 4, 5]
  .map(
    (star) => `

<span
class="star
${star <= product.rating ? "active" : ""}"
onclick="rateProduct(${product.id},${star})">
★
</span>

`,
  )
  .join("")}

</div>

<button onclick="addToCart(${product.id})">
Add to Cart
</button>

</div>

`;
  });

  container.innerHTML = html;
}

// ============================
// MODAL
// ============================

function openModal(id) {
  selectedProduct = products.find((p) => p.id === id);

  modalQty = 1;

  document.getElementById("modal-image").src = selectedProduct.image;

  document.getElementById("modal-name").innerText = selectedProduct.name;

  document.getElementById("modal-price").innerText =
    "₹" + selectedProduct.price;

  document.getElementById("modal-qty").innerText = modalQty;

  document.getElementById("product-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("product-modal").style.display = "none";
}

// ============================
// MODAL QTY
// ============================

function increaseQty() {
  modalQty++;

  document.getElementById("modal-qty").innerText = modalQty;
}

function decreaseQty() {
  if (modalQty > 1) {
    modalQty--;

    document.getElementById("modal-qty").innerText = modalQty;
  }
}

document.getElementById("modal-add-cart").onclick = () => {
  if (selectedProduct) {
    addToCart(selectedProduct.id, modalQty);

    closeModal();
  }
};

// ============================
// CART
// ============================

function addToCart(id, qty = 1) {
  let item = cart.find((p) => p.id === id);

  if (item) {
    item.quantity += qty;
  } else {
    let product = products.find((p) => p.id === id);

    cart.push({
      ...product,
      quantity: qty,
    });
  }

  saveCart();

  renderCart();
}

// ============================
// CART QTY
// ============================

function increaseCartQty(id) {
  let item = cart.find((p) => p.id === id);

  item.quantity++;

  saveCart();

  renderCart();
}

function decreaseCartQty(id) {
  let item = cart.find((p) => p.id === id);

  if (item.quantity > 1) {
    item.quantity--;
  } else {
    removeFromCart(id);
    return;
  }

  saveCart();

  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter((p) => p.id !== id);

  saveCart();

  renderCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ============================
// RENDER CART (FAST)
// ============================

function renderCart() {
  let cartItems = document.getElementById("cart-items");

  if (!cartItems) return;

  let total = 0;
  let html = "";

  cart.forEach((item) => {
    total += item.price * item.quantity;

    html += `

<div class="cart-item">

<img src="${item.image}">

<div>

<h4>${item.name}</h4>

<p>₹${item.price}</p>

<div class="qty-box">

<button onclick="decreaseCartQty(${item.id})">-</button>

<span>${item.quantity}</span>

<button onclick="increaseCartQty(${item.id})">+</button>

</div>

<button onclick="removeFromCart(${item.id})">
Remove
</button>

</div>

</div>

`;
  });

  cartItems.innerHTML = html;

  document.getElementById("cart-total").innerText = "₹" + total;

  document.getElementById("cart-count").innerText = cart.length;
}

// ============================
// ❤️ WISHLIST (FAST)
// ============================

function toggleWishlist(id, element) {
  let exists = wishlist.find((p) => p.id === id);

  if (exists) {
    wishlist = wishlist.filter((p) => p.id !== id);

    element.classList.remove("active");
  } else {
    let product = products.find((p) => p.id === id);

    wishlist.push(product);

    element.classList.add("active");
  }

  saveWishlist();

  renderWishlist();

  updateWishlistCount();
}

function removeFromWishlist(id) {
  wishlist = wishlist.filter((p) => p.id !== id);

  saveWishlist();

  renderWishlist();

  updateWishlistCount();
}

function saveWishlist() {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function renderWishlist() {
  let container = document.getElementById("wishlist-items");

  if (!container) return;

  let html = "";

  wishlist.forEach((item) => {
    html += `

<div class="cart-item">

<img src="${item.image}">

<div>

<h4>${item.name}</h4>

<p>₹${item.price}</p>

<button onclick="addToCart(${item.id})">
Move to Cart
</button>

<button onclick="removeFromWishlist(${item.id})">
Remove
</button>

</div>

</div>

`;
  });

  container.innerHTML = html;
}

function updateWishlistCount() {
  document.getElementById("wishlist-count").innerText = wishlist.length;
}

// ============================
// ⭐ RATING
// ============================

function rateProduct(id, rating) {
  let product = products.find((p) => p.id === id);

  product.rating = rating;

  displayProducts(products);
}

// ============================
// SEARCH
// ============================

function searchProducts() {
  let keyword = document.getElementById("search-input").value.toLowerCase();

  let filtered = products.filter((p) => p.name.toLowerCase().includes(keyword));

  displayProducts(filtered);
}

// ============================
// FILTER
// ============================

function filterProducts() {
  let category = document.getElementById("category-filter").value;

  if (category === "all") {
    displayProducts(products);
    return;
  }

  let filtered = products.filter((p) => p.category === category);

  displayProducts(filtered);
}

// ============================
// SORT
// ============================

function sortProducts() {
  let type = document.getElementById("sort-filter").value;

  let sorted = [...products];

  if (type === "low-high") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (type === "high-low") {
    sorted.sort((a, b) => b.price - a.price);
  }

  displayProducts(sorted);
}

// ============================
// CHECKOUT
// ============================

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  window.location.href = "checkout.html";
}

// ============================
// DARK MODE
// ============================

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// ============================
// SIDEBARS
// ============================

document.getElementById("cart-toggle").addEventListener("click", () => {
  document.getElementById("cart-sidebar").classList.toggle("active");
});

document.getElementById("wishlist-toggle").addEventListener("click", () => {
  document.getElementById("wishlist-sidebar").classList.toggle("active");
});

// ============================
// CLOSE SIDEBARS
// ============================

function closeCart() {
  document.getElementById("cart-sidebar").classList.remove("active");
}

function closeWishlist() {
  document.getElementById("wishlist-sidebar").classList.remove("active");
}

// ============================
// INITIAL LOAD
// ============================

displayProducts();
renderCart();
renderWishlist();
updateWishlistCount();
