
// image slider
const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide(index){

    slides.forEach(slide =>{
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");
}

function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);
}

function prevSlide(){

    currentSlide--;

    if(currentSlide < 0){
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
}
// Auto Slide
setInterval(nextSlide, 4000);

// shop new arrival button
function goToProducts() {
    window.location.href = "./pages/products.html";
}

function openProducts(category) {

    localStorage.setItem(
        "selectedCategory",
        category
    );

    window.location.href =
        "./pages/products.html";

}



// click on img
function addToCart(productName) {

    let currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        alert("Please Login First");
                window.location.href =
        "./pages/login.html";
        return;
    }

    let cartKey =
        "cart_" + currentUser.mobile;

    let cart =
        JSON.parse(localStorage.getItem(cartKey)) || [];

    let product = {};

    if (productName === "Laptop") {
        product = {
            id: 101,
            name: "Laptop",
            price: 59999,
            oldPrice: 65000,
            image: "../images/laptop1.jpg"
        };
    }

    else if (productName === "Wireless Headphones") {
        product = {
            id: 102,
            name: "Wireless Headphones",
            price: 2999,
            oldPrice: 3500,
            image: "../images/headphone.jpg"
        };
    }

    else if (productName === "Smart Watch") {
        product = {
            id: 103,
            name: "Smart Watch",
            price: 4999,
            oldPrice: 5500,
            image: "../images/watch.jpg"
        };
    }

    else if (productName === "Sports Shoes") {
        product = {
            id: 104,
            name: "Sports Shoes",
            price: 1999,
            oldPrice: 2500,
            image: "../images/shoes.jpg"
        };
    }

    const alreadyExists =
        cart.find(item => item.id === product.id);

    if (alreadyExists) {
        alert("Product Already In Cart");
        return;
    }

    cart.push(product);

    localStorage.setItem(
        cartKey,
        JSON.stringify(cart)
    );

    alert("Added To Cart");
}

// offer
function shopNow() {
        window.location.href =
        "./pages/products.html";
}

// newsletter
// email validation
function subscribeNewsletter() {

    let email = document.getElementById("email").value;

    if (email === "") {
        alert("Please enter your email address!");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address!");
        return;
    }

    alert("Thank you for subscribing!");

    document.getElementById("email").value = "";
}

// frequently asked questions
function toggleFaq(button) {

    const answer = button.nextElementSibling;

    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
    }
    else {
        answer.style.maxHeight = answer.scrollHeight + "px";
    }

}

