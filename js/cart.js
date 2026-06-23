const recommendedProducts = [

    {
        id: 1,
        name: "Gaming Headset",
        price: 1899,
        oldPrice: 2200,
        image: "../images/gaminghandset.webp"
    },

    {
        id: 2,
        name: "Smart Watch",
        price: 2999,
        oldPrice: 3500,
        image: "../images/smartwatch.webp"
    },

    {
        id: 3,
        name: "Wireless Earbuds",
        price: 1499,
        oldPrice: 1900,
        image: "../images/wireless earbuds.webp"
    },

    {
        id: 4,
        name: "Denim Jacket",
        price: 2199,
        oldPrice: 2600,
        image: "../images/denim jacket.avif"
    },

    {
        id: 5,
        name: "Sports Shoes",
        price: 2499,
        oldPrice: 3000,
        image: "../images/shoessport.webp"
    },

    {
        id: 6,
        name: "Leather Bag",
        price: 1699,
        oldPrice: 2100,
        image: "../images/leather bag.jpg"
    },

    {
        id: 7,
        name: "Premium Shirt",
        price: 999,
        oldPrice: 1400,
        image: "../images/premiumshirt.jpg"
    },

    {
        id: 8,
        name: "Bluetooth Speaker",
        price: 1999,
        oldPrice: 2500,
        image: "../images/bluetoothe speaker.webp"
    }

];
let cart = [];

let discountAmount = 0;

function loadCart() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    cart = [];

    return;
  }

  let cartKey = "cart_" + currentUser.mobile;

  cart = JSON.parse(localStorage.getItem(cartKey)) || [];
}

function saveCart() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    return;
  }

  let cartKey = "cart_" + currentUser.mobile;

  localStorage.setItem(
    cartKey,

    JSON.stringify(cart),
  );
}
function displayCart() {
  const cartContainer = document.getElementById("cart-container");

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `

        <div class="empty-cart-box">

            <h2>
            🛒 Your Cart is Empty
            </h2>

            <p>
            Add products to continue shopping
            </p>

            <a
            href="../pages/products.html"
            class="continue-btn">

            Continue Shopping

            </a>

        </div>

        `;

    updateSummary();

    return;
  }

  cart.forEach((item) => {
    cartContainer.innerHTML += `

        <div class="cart-item">

            <img
            src="${item.image || item.images?.[0] || ""}"
            alt="${item.name}">

            <div class="product-info">

                <h3>${item.name}</h3>

                <p>
                Premium Quality Product
                </p>

                <div class="price-box">

                    <del>
                    ₹${item.oldPrice || item.originalPrice}
                    </del>

                    <span>
                    ₹${item.price}
                    </span>

                </div>

            </div>

            <div class="cart-actions">

                <button
                class="buy-btn"
                onclick="buyNow(${item.id})">

                Buy Now

                </button>

                <button
                class="remove-btn"
                onclick="removeItem(${item.id})">

                Remove

                </button>

            </div>

        </div>

        `;
  });

  updateSummary();
}
function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);

  saveCart();

  displayCart();
}
const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach((button, index) => {
  button.addEventListener(
    "click",

    () => {
      const product = recommendedProducts[index];

      const alreadyExists = cart.find((item) => item.id === product.id);

      if (alreadyExists) {
        alert("Product Already In Cart");

        return;
      }

      cart.push(product);

      saveCart();

      displayCart();

      button.innerHTML = "Added";

      setTimeout(() => {
        button.innerHTML = "Add To Cart";
      }, 1500);
    },
  );
});
function updateSummary() {
  let subtotal = 0;

  cart.forEach((item) => {
    subtotal += item.price;
  });

  let tax = Math.floor(subtotal * 0.05);

  let total = subtotal + tax - discountAmount;

  if (total < 0) {
    total = 0;
  }

  document.getElementById("subtotal").innerText = `₹${subtotal}`;

  document.getElementById("discount").innerText = `₹${discountAmount}`;

  document.getElementById("tax").innerText = `₹${tax}`;

  document.getElementById("total").innerText = `₹${total}`;
}
document.getElementById("applyCoupon").addEventListener(
  "click",

  () => {
    const code = document
      .getElementById("couponInput")
      .value.trim()
      .toUpperCase();

    let subtotal = 0;

    cart.forEach((item) => {
      subtotal += item.price;
    });

    if (code === "SAVE10") {
      discountAmount = Math.floor(subtotal * 0.1);

      alert("10% Discount Applied");
    } else if (code === "SAVE20") {
      discountAmount = Math.floor(subtotal * 0.2);

      alert("20% Discount Applied");
    } else {
      discountAmount = 0;

      alert("Invalid Coupon Code");
    }

    updateSummary();
  },
);
document.getElementById("checkoutBtn").addEventListener(
  "click",
  () => {

    if (cart.length === 0) {
      alert("Cart Is Empty");
      return;
    }

    let currentUser =
      JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      alert("Please Login First");
      window.location.href = "../pages/login.html";
      return;
    }

    let orderKey =
      "orders_" + currentUser.mobile;

    let orders =
      JSON.parse(localStorage.getItem(orderKey))
      || [];

    cart.forEach(item => {

      orders.push({

        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image || item.images?.[0],
        quantity: 1,
        status: "Order Placed"

      });

    });

    localStorage.setItem(
      orderKey,
      JSON.stringify(orders)
    );

    cart = [];

    saveCart();

    displayCart();

    alert("🎉 Order Placed Successfully");

    window.location.href = "../pages/orders.html";

  }
);

function buyNow(id) {

  let currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {

    alert("Please Login First");

    window.location.href = "../pages/login.html";

    return;

  }

  let product =
    cart.find(item => item.id === id);

  if (!product) {

    alert("Product Not Found");

    return;

  }

  let orderKey =
    "orders_" + currentUser.mobile;

  let orders =
    JSON.parse(localStorage.getItem(orderKey))
    || [];

  orders.push({

    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image || product.images?.[0],
    quantity: 1,
    status: "Order Placed"

  });

  localStorage.setItem(
    orderKey,
    JSON.stringify(orders)
  );

  cart =
    cart.filter(item => item.id !== id);

  saveCart();

  displayCart();

  alert("🎉 Order Placed Successfully");

  window.location.href = "../pages/orders.html";

}

loadCart();

displayCart();
