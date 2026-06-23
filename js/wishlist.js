const wishlistGrid =
document.getElementById(
"wishlistGrid"
);

const emptyState =
document.getElementById(
"emptyState"
);

let wishlist = [];

function loadWishlist(){

    let currentUser =
    JSON.parse(
    localStorage.getItem(
    "currentUser"
    )
    );

    if(!currentUser){

        wishlist = [];

        return;

    }

    let wishlistKey =
    "wishlist_" +
    currentUser.mobile;

    wishlist =
    JSON.parse(
    localStorage.getItem(
    wishlistKey
    )
    ) || [];

}

function saveWishlist(){

    let currentUser =
    JSON.parse(
    localStorage.getItem(
    "currentUser"
    )
    );

    if(!currentUser){

        return;

    }

    let wishlistKey =
    "wishlist_" +
    currentUser.mobile;

    localStorage.setItem(

        wishlistKey,

        JSON.stringify(
        wishlist
        )

    );

}

function showToast(message){

    const toast =
    document.getElementById(
    "toast"
    );

    toast.textContent =
    message;

    toast.classList.add(
    "show"
    );

    setTimeout(()=>{

        toast.classList.remove(
        "show"
        );

    },2500);

}

function updateSummary(){

    document
    .getElementById(
    "totalItems"
    )
    .textContent =
    wishlist.length;

    const selected =
    wishlist.filter(
    item => item.selected
    );

    document
    .getElementById(
    "selectedItems"
    )
    .textContent =
    selected.length;

    const totalValue =
    wishlist.reduce(

    (sum,item)=>

    sum +
    Number(
    item.price || 0
    )

    ,0);

    document
    .getElementById(
    "totalValue"
    )
    .textContent =
    "₹" +
    totalValue;

}function toggleSelect(index){

    wishlist[index].selected =
    !wishlist[index].selected;

    saveWishlist();

    updateSummary();

}

function selectAllProducts(isChecked){

    wishlist.forEach(item=>{

        item.selected =
        isChecked;

    });

    saveWishlist();

    renderWishlist();

}
function renderWishlist(
products = wishlist
){

    document
    .querySelector(
    ".bulk-actions"
    )
    .style.display =
    wishlist.length === 0
    ? "none"
    : "flex";

    wishlistGrid.innerHTML =
    "";

    updateSummary();

    if(wishlist.length === 0){

        wishlistGrid.style.display =
        "none";

        emptyState.style.display =
        "block";

        return;

    }

    wishlistGrid.style.display =
    "grid";

    emptyState.style.display =
    "none";
const selectAllToggle =
document.getElementById(
"selectAllToggle"
);

if(selectAllToggle){

    selectAllToggle.checked =

    wishlist.length > 0 &&

    wishlist.every(
    item => item.selected
    );

}
    products.forEach(
    (item,index)=>{

        const actualIndex =
        wishlist.findIndex(

        p =>

        p.name === item.name &&

        p.price === item.price

        );

        const card =
        document.createElement(
        "div"
        );

        card.className =
        "product-card";

        card.innerHTML = `

        <div class="image-wrapper">

           <input
type="checkbox"
class="select-product"
${item.selected ? "checked" : ""}
onchange="toggleSelect(${actualIndex})">

            <button
            class="share-product"
            onclick="shareProduct(${actualIndex})">

            <i class="fa-solid fa-share-nodes"></i>

            </button>

            <img
            src="${item.image || item.images?.[0] || ''}"
            alt="${item.name}"
            class="product-image">

        </div>

        <div class="card-content">

            <h3>${item.name}</h3>

            <div class="price">

                ₹${item.price}

            </div>

            <div class="card-actions">

               <button
class="cart-btn"
onclick="moveToCart(${actualIndex})">

Add To Cart

</button>

<button
class="delete-btn"
onclick="deleteItem(${actualIndex})">

Delete

</button>

            </div>

        </div>
        `;

        wishlistGrid.appendChild(
        card
        );

    });

}
function deleteItem(index){

    wishlist.splice(
        index,
        1
    );

    saveWishlist();

    renderWishlist();

    showToast(
        "Product Removed"
    );

}
function moveToCart(index){

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

    let cartKey =
    "cart_" +
    currentUser.mobile;

    let cart =
    JSON.parse(
    localStorage.getItem(
    cartKey
    )
    ) || [];

    let product =
    wishlist[index];

    let alreadyExists =
    cart.find(
    item => item.id === product.id
    );

    if(alreadyExists){
 alert(
    "Product Already In Cart"
    );

        return;

    }

    cart.push(
    product
    );

    localStorage.setItem(

        cartKey,

        JSON.stringify(
        cart
        )

    );

    wishlist.splice(
    index,
    1
    );

    saveWishlist();

    renderWishlist();

    showToast(
    "Moved To Cart 🛒"
    );

}
loadWishlist();
renderWishlist();

document
.getElementById(
"selectAllToggle"
)
.addEventListener(
"change",
function(){

    selectAllProducts(
    this.checked
    );

});function deleteSelectedProducts(){

    let selectedItems =
    wishlist.filter(
    item => item.selected
    );

    if(selectedItems.length === 0){

        alert(
        "Select Products First"
        );

        return;

    }

    wishlist =
    wishlist.filter(
    item => !item.selected
    );

    saveWishlist();

    renderWishlist();

    showToast(
    "Selected Products Deleted"
    );

}function moveSelectedToCart(){

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

    let selectedItems =
    wishlist.filter(
    item => item.selected
    );

    if(selectedItems.length === 0){

        alert(
        "Select Products First"
        );

        return;

    }

    let cartKey =
    "cart_" +
    currentUser.mobile;

    let cart =
    JSON.parse(
    localStorage.getItem(
    cartKey
    )
    ) || [];

    selectedItems.forEach(product=>{

        let exists =
        cart.find(
        item => item.id === product.id
        );

        if(!exists){

            cart.push(
            product
            );

        }

    });

    localStorage.setItem(

        cartKey,

        JSON.stringify(
        cart
        )

    );

    wishlist =
    wishlist.filter(
    item => !item.selected
    );

    saveWishlist();

    renderWishlist();

    showToast(
    "Selected Products Moved To Cart 🛒"
    );

}document
.getElementById(
"deleteSelectedBtn"
)
.addEventListener(
"click",
deleteSelectedProducts
);

document
.getElementById(
"moveSelectedBtn"
)
.addEventListener(
"click",
moveSelectedToCart
);