function togglePassword(){

  let password =
  document.getElementById("password");

  let eye =
  document.getElementById("eye");

  if(password.type === "password"){

    password.type = "text";

    eye.classList.remove("fa-eye");

    eye.classList.add("fa-eye-slash");

  }

  else{

    password.type = "password";

    eye.classList.remove("fa-eye-slash");

    eye.classList.add("fa-eye");

  }

}

/* LOGIN */

function loginUser(){

  let email =
  document.getElementById("email").value;

  let password =
  document.getElementById("password").value;

  /* VALIDASI */

  if(email === "" || password === ""){

    alert("Please fill all fields");

    return;

  }

  /* LOGIN ADMIN */

  if(
    email === "admin@gmail.com" &&
    password === "admin123"
  ){

    localStorage.setItem(
      "adminLogin",
      "true"
    );

    alert("Admin Login Success");

    window.location.href =
    "../admin/admin.html";

    return;

  }

  /* AMBIL USER */

  let users =
  JSON.parse(localStorage.getItem("users")) || [];

  /* CEK USER */

  let validUser =
  users.find(

    user =>

    user.email === email &&
    user.password === password

  );

  /* LOGIN BERHASIL */

  if(validUser){

    localStorage.setItem(

      "loginUser",

      JSON.stringify(validUser)

    );

    alert("Login Success");

    window.location.href =
    "../../index.html";

  }

  /* LOGIN GAGAL */

  else{

    alert("Wrong Email or Password");

  }

}