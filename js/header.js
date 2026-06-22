// header
function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");

    console.log(document.querySelector(".nav-links").classList);
}

const navAuthText = document.getElementById("navAuthText");
const authBtn = document.getElementById("authBtn");

window.addEventListener("DOMContentLoaded", () => {

    const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

    if(currentUser && navAuthText){
        navAuthText.textContent = "Logout";
    }

});

if(authBtn){

    authBtn.addEventListener("click", function(e){

        const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

        if(currentUser){

            e.preventDefault();

            localStorage.removeItem("currentUser");

            alert("Logged Out Successfully");

            window.location.href = "./login.html";
        }
    });

}

// dark light mode
// Dark Mode

const themeBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
    themeIcon.src = "../images/sun.png";
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme","dark");
        themeIcon.src = "../images/sun.png";
    }
    else{
        localStorage.setItem("theme","light");
        themeIcon.src = "../images/moon.png";
    }
});