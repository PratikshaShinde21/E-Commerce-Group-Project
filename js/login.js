const navAuthText = document.getElementById("navAuthText");

function showRegister() {
    loginForm.style.display = "none";
    registerForm.style.display = "block";

    navAuthText.textContent = "Register";
}

function showLogin() {
    registerForm.style.display = "none";
    loginForm.style.display = "block";

    navAuthText.textContent = "Login";
}

// forgot
function forgotPassword(){

    let mobile = prompt("Enter your registered mobile number");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.mobile === mobile);

    if(user){
        alert("Your password is: " + user.password);
    }else{
        alert("Mobile number not found!");
    }
}

// Register
registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("registerEmail").value;
    const mobile = document.getElementById("registerMobile").value;
    const password = document.getElementById("registerPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if mobile already exists
    let existingUser = users.find(
        user => user.mobile === mobile
    );

    if (existingUser) {
        alert("Mobile number already registered!");
        return;
    }

    const user = {
        name,
        email,
        mobile,
        password
    };

    users.push(user);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Registration Successful!");

    registerForm.reset();

    showLogin();
});

// Login
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const mobile = document.getElementById("loginMobile").value;
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(
        u =>
        u.mobile === mobile &&
        u.password === password
    );

    if (user) {

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        alert("Login Successful!");

        // Redirect to products page
        window.location.href = "./../pages/product.html";

    } else {

        alert("Invalid Mobile Number or Password");

    }
});
function toggleLoginPassword(){

    let password = document.getElementById("loginPassword");
    let eye = document.getElementById("loginEye");

    if(password.type === "password"){

        password.type = "text";
        eye.src = "./../images/view.png";

    }else{

        password.type = "password";
        eye.src = "./../images/hide.png";
    }
}

function toggleRegisterPassword(){

    let password = document.getElementById("registerPassword");
    let eye = document.getElementById("registerEye");

    if(password.type === "password"){

        password.type = "text";
        eye.src = "./../images/view.png";

    }else{

        password.type = "password";
        eye.src = "./../images/hide.png";
    }
}

// dark light mode
// Dark Mode

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Page reload नंतर theme कायम ठेवण्यासाठी
if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark-mode");

    themeIcon.src = "../images/sun.png";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");

        themeIcon.src = "../images/sun.png";

    }else{

        localStorage.setItem("theme","light");

        themeIcon.src = "../images/moon.png";
    }
});

