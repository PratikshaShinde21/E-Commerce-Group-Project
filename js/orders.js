/*const ordersContainer =
document.getElementById(
"ordersContainer"
);

let currentUser =
JSON.parse(
localStorage.getItem(
"currentUser"
)
);

let orders = [];

if(currentUser){

    let orderKey =
    "orders_" +
    currentUser.mobile;

    orders =
    JSON.parse(
    localStorage.getItem(
    orderKey
    )
    ) || [];

}

function displayOrders(){

    if(orders.length === 0){

        ordersContainer.innerHTML =

        `<h2>No Orders Yet</h2>`;

        return;

    }

    ordersContainer.innerHTML =
    "";

    orders.forEach(order=>{

        ordersContainer.innerHTML += `

        <div class="order-card">

            <img
            src="${order.image}"
            alt="${order.name}">

            <h3>
            ${order.name}
            </h3>

            <p>
            ₹${order.price}
            </p>

            <p>
            ${order.status}
            </p>

            <button
            onclick="cancelOrder(${order.id})">

            Cancel Order

            </button>

        </div>

        `;

    });

}

function cancelOrder(id){

    let orderKey =
    "orders_" +
    currentUser.mobile;

    orders =
    orders.filter(

    order =>

    order.id !== id

    );

    localStorage.setItem(

        orderKey,

        JSON.stringify(
        orders
        )

    );

    alert(
    "Order Cancelled ❌"
    );

    displayOrders();

}

displayOrders();*/

const ordersContainer =
document.getElementById(
"ordersContainer"
);

let currentUser =
JSON.parse(
localStorage.getItem(
"currentUser"
)
);

let orders = [];

if(currentUser){

    let orderKey =
    "orders_" +
    currentUser.mobile;

    orders =
    JSON.parse(
    localStorage.getItem(
    orderKey
    )
    ) || [];

}

function displayOrders(){

    if(orders.length === 0){

        ordersContainer.innerHTML =
        `<h2>No Orders Yet</h2>`;

        return;

    }

    ordersContainer.innerHTML = "";

    orders.forEach(order=>{

        ordersContainer.innerHTML += `

        <div class="order-card">

            <img
            src="${order.image || ''}"
            alt="${order.name}">

            <h3>${order.name}</h3>

            <p>₹${order.price}</p>

            <p>${order.status || "Order Placed"}</p>

            <button
            onclick="cancelOrder(${order.id})">

            Cancel Order

            </button>

        </div>

        `;

    });

}

function cancelOrder(id){

    let orderKey =
    "orders_" +
    currentUser.mobile;

    orders =
    orders.filter(
    order => order.id !== id
    );

    localStorage.setItem(
    orderKey,
    JSON.stringify(orders)
    );

    alert(
    "Order Cancelled ❌"
    );

    displayOrders();

}

displayOrders();