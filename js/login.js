function handleEyeClick(){
    const password =
        document.getElementById("loginPassword");
        const viewElement =  document.getElementById("view");

    if(password.type === "password"){
        password.type= "text";
        viewElement.src= "./../images/view.png";
    }
    else{
        password.type="password";
        viewElement.src = "./../images/hide.png";
    }
}

function toggleRegisterPassword(){
    const password =
        document.getElementById("registerPassword");
          const viewwElements =  document.getElementById("vieww");

 if(password.type === "password"){
        password.type= "text";
        viewwElements.src= "./../images/view.png";
    }
    else{
        password.type="password";
        viewwElements.src = "./../images/hide.png";
    }
}


function toggleConfirmPassword(){
    const password =
        document.getElementById("confirmPassword");
          const viewwwElementss =  document.getElementById("viewww");

    if(password.type === "password") {
        password.type="text";
   viewwwElementss.src= "./../images/view.png";
    }
    else{
        password.type="password";
        viewwwElementss.src = "./../images/hide.png";
    }
}
// Remember Me

window.onload=function(){

    let savedEmail=
        localStorage.getItem("savedEmail");

    if(savedEmail){
        document.getElementById("loginEmail").value=savedEmail;
        document.getElementById("rememberMe").checked=true;
    }
};

function loginUser(){

    let email=
        document.getElementById("loginEmail").value;

    let password=
        document.getElementById("loginPassword").value;

    let remember=
        document.getElementById("rememberMe").checked;

    if(email==="" || password===""){
        alert("Please fill all fields");
        return;
    }

    if(!email.includes("@") || !email.includes(".")){
        alert("Invalid Email");
        return;
    }

    if(remember){
        localStorage.setItem(
            "savedEmail",
            email
        );
    }
    else{
        localStorage.removeItem(
            "savedEmail"
        );
    }

    alert("Login Successful");
}

// Password Strength

document.getElementById("registerPassword").addEventListener("input",function(){

    let pass=this.value;
    let bar = document.getElementById("strengthBar");

    if(pass.length < 5) {
        bar.style.width="30%";
        bar.style.background="red";
    }
    else if(pass.length<8) {
        bar.style.width="60%";
        bar.style.background="orange";
    }
    else{
        bar.style.width="100%";
        bar.style.background="green";
    }
});

// Register Validation

function registerUser(){

    let name=
        document.getElementById("fullName").value;

    let email=
        document.getElementById("registerEmail").value;

    let mobile=
        document.getElementById("mobile").value;

    let password=
        document.getElementById("registerPassword").value;

    let confirm=
        document.getElementById("confirmPassword").value;

    let terms=
        document.getElementById("terms").checked;

    if(name==="" ||
       email==="" ||
       mobile==="" ||
       password==="" ||
       confirm===""){
        alert("Please fill all fields");
        return;
    }

    if(!/^[A-Za-z ]+$/.test(name)){
        alert("Name should contain only letters");
        return;
    }

    if(!/^[0-9]{10}$/.test(mobile)){
        alert("Mobile must be 10 digits");
        return;
    }

    if(password!==confirm){
        alert("Passwords do not match");
        return;
    }

    if(!terms){
        alert("Accept Terms & Conditions");
        return;
    }

    alert("Registration Successful");
}