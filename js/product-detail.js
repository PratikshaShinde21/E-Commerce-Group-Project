const productId =
localStorage.getItem(
"selectedProduct"
);

const product =
products.find(
p => p.id == productId
);

if(!product){

    alert(
    "Product Not Found"
    );

    window.location.href =
    "product.html";

}

/* Product Details */

document.getElementById(
"productName"
).innerText =
product.name;

document.getElementById(
"originalPrice"
).innerText =
"₹" +
product.originalPrice.toLocaleString();

document.getElementById(
"productPrice"
).innerText =
"₹" +
product.price.toLocaleString();

const discount =
Math.round(

(
product.originalPrice -
product.price

)

/

product.originalPrice

* 100

);

document.getElementById(
"discount"
).innerText =
discount + "% OFF";

document.getElementById(
"description"
).innerText =
product.description;

/* Main Image */

document.getElementById(
"mainImage"
).src =
product.images[0];

/* Thumbnails */

const thumbnails =
document.getElementById(
"thumbnails"
);

product.images.forEach(image => {

    thumbnails.innerHTML += `

    <img
    src="${image}"
    onclick="changeImage('${image}')">

    `;

});

/* Change Image */

function changeImage(image){

    document.getElementById(
    "mainImage"
    ).src = image;

}

/* Highlights */

const highlights =
document.getElementById(
"highlights"
);

product.highlights.forEach(item => {

    highlights.innerHTML += `

    <li>
        ${item}
    </li>

    `;

});

/* Quantity */

let quantity = 1;

function increaseQty(){

    quantity++;

    document.getElementById(
    "qty"
    ).innerText =
    quantity;

}

function decreaseQty(){

    if(quantity > 1){

        quantity--;

        document.getElementById(
        "qty"
        ).innerText =
        quantity;

    }

}

/* Buy Now */

function buyNow(){

    let currentUser =
    JSON.parse(
    localStorage.getItem(
    "currentUser"
    )
    );

    if(!currentUser){

        alert(
        "Please Login First"
        );

        return;
    }

    let orderKey =
    "orders_" +
    currentUser.mobile;

    let orders =
    JSON.parse(
    localStorage.getItem(
    orderKey
    )
    ) || [];

    orders.push({

        id: product.id,

        name: product.name,

        price: product.price,

        image: product.images[0],

        quantity: quantity

    });

    localStorage.setItem(

        orderKey,

        JSON.stringify(
        orders
        )

    );

    alert(
    "Order Placed Successfully"
    );

    window.location.href =
    "orders.html";

}

/* Wishlist */

function addToWishlist(){

    let currentUser =
    JSON.parse(
    localStorage.getItem(
    "currentUser"
    )
    );

    if(!currentUser){

        alert(
        "Please Login First"
        );

        return;
    }

    let wishlistKey =
    "wishlist_" +
    currentUser.mobile;

    let wishlist =
    JSON.parse(
    localStorage.getItem(
    wishlistKey
    )
    ) || [];

    let alreadyExists =
    wishlist.find(

    item =>

    item.id ===
    product.id

    );

    if(alreadyExists){

        alert(
        "Product Already In Wishlist ❤️"
        );

        window.location.href =
        "wishlist.html";

        return;

    }

    wishlist.push(
    product
    );

    localStorage.setItem(

        wishlistKey,

        JSON.stringify(
        wishlist
        )

    );

    alert(
    "Added To Wishlist ❤️"
    );

    window.location.href =
    "wishlist.html";

}

/* Rating */

function rateProduct(rating){

    const stars =
    document.querySelectorAll(
    ".star"
    );

    stars.forEach(

    (star,index)=>{

        if(index < rating){

            star.classList.remove(
            "fa-regular"
            );

            star.classList.add(
            "fa-solid",
            "active"
            );

        }

        else{

            star.classList.remove(
            "fa-solid",
            "active"
            );

            star.classList.add(
            "fa-regular"
            );

        }

    });

    document.getElementById(
    "ratingText"
    ).innerText =
    "You Rated " +
    rating +
    " ⭐";

}

/* Review */

function submitReview(){

    let review =

    document.getElementById(
    "reviewText"
    ).value.trim();

    if(review === ""){

        alert(
        "Please Write A Review"
        );

        return;

    }

    alert(
    "Review Submitted Successfully"
    );

    document.getElementById(
    "reviewText"
    ).value = "";

}