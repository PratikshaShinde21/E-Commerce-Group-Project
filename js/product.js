let product;

function setWishlistProduct(id){

    product =
    products.find(
    item => item.id === id
    );

    addToWishlist();

}
function toggleWishlist(id){

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

    let product =
    products.find(
    item => item.id === id
    );

    let heart =
    document.getElementById(
    `heart-${id}`
    );

    let exists =
    wishlist.find(
    item => item.id === id
    );

    if(exists){

        wishlist =
        wishlist.filter(
        item => item.id !== id
        );

        heart.className =
        "fa-regular fa-heart";

        alert(
        "Removed From Wishlist 💔"
        );

    }
    else{

        wishlist.push(
        product
        );

        heart.className =
        "fa-solid fa-heart";

        alert(
        "Added To Wishlist ❤️"
        );

    }

    localStorage.setItem(
        wishlistKey,
        JSON.stringify(wishlist)
    );

    setTimeout(()=>{

        window.location.href =
        "wishlist.html";

    },500);

}




const container =
document.getElementById("productsContainer");

const search =
document.getElementById("search");

function displayProducts(data){

    container.innerHTML = "";

    data.forEach(product => {

        const discount = Math.round(
            ((product.originalPrice - product.price) /
            product.originalPrice) * 100
        );

        let currentUser =
        JSON.parse(
        localStorage.getItem(
        "currentUser"
        )
        );

        let isWishlisted = false;

        if(currentUser){

            let wishlistKey =
            "wishlist_" +
            currentUser.mobile;

            let wishlist =
            JSON.parse(
            localStorage.getItem(
            wishlistKey
            )
            ) || [];

            isWishlisted =
            wishlist.some(
            item => item.id === product.id
            );

        }

        container.innerHTML += `
        
        <div class="card">

            <button
            class="wishlist-btn"
            onclick="toggleWishlist(${product.id})">

                <i
                id="heart-${product.id}"
                class="${
                isWishlisted
                ? 'fa-solid fa-heart'
                : 'fa-regular fa-heart'
                }">
                </i>

            </button>

            <img src="${product.images[0]}">

            <h3>${product.name}</h3>

            <div class="price-box">
            
                <del>
                    ₹${product.originalPrice.toLocaleString()}
                </del>

                <span class="new-price">
                    ₹${product.price.toLocaleString()}
                </span>

                <span class="discount">
                    ${discount}% OFF
                </span>

            </div>

            <div class="btn-box">

                <button
                onclick="viewDetails(${product.id})">

                    View Details

                </button>

                <button
                onclick="addToCart(${product.id})">

                    Add To Cart

                </button>

            </div>

        </div>

        `;
    });

}

  
/* Category Filter */

function showProducts(category){

    let filteredProducts =
    products.filter(product =>
    product.category === category
    );

    displayProducts(filteredProducts);

}

/* Search Filter */

search.addEventListener(
"keyup",
function(){

    let keyword =
    this.value.toLowerCase();

    let result =
    products.filter(product =>

    product.name
    .toLowerCase()
    .includes(keyword)

    );

    displayProducts(result);

});
function viewDetails(id){

    localStorage.setItem(
    "selectedProduct",
    id
    );

    window.location.href =
    "product-detail.html";

}
function addToCart(id){

    let currentUser =
    JSON.parse(
    localStorage.getItem("currentUser")
    );

    if(!currentUser){

        alert("Please Login First");

        window.location.href =
        "register.html";

        return;
    }

    let cartKey =
    "cart_" + currentUser.mobile;

    let cart =
    JSON.parse(
    localStorage.getItem(cartKey)
    ) || [];

    let product =
    products.find(
    p => p.id === id
    );

    cart.push(product);

    localStorage.setItem(
    cartKey,
    JSON.stringify(cart)
    );

    alert(
    product.name +
    " Added To Cart"
    );

    window.location.href =
    "cart.html";

}

const category =
localStorage.getItem(
    "selectedCategory"
);

if(category){

    showProducts(category);

    localStorage.removeItem(
        "selectedCategory"
    );

}else{

    showProducts("electronics");

}

function addToWishlist()
 { let currentUser = JSON.parse(localStorage.getItem("currentUser")); 
    if (!currentUser) {
         alert("Please Login First");
          return; } 
          let wishlistKey = "wishlist_" + currentUser.mobile; 
          let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || []; 
          let alreadyExists = wishlist.find(item => item.id === product.id); 
          if (alreadyExists) { alert("Product Already In Wishlist ❤️"); 
            window.location.href = "wishlist.html";
             return; } 
            wishlist.push(product); 
            localStorage.setItem(wishlistKey, 
                JSON.stringify(wishlist)); 
                alert("Added To Wishlist ❤️"); 
                window.location.href = "wishlist.html"; 
            }
