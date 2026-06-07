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

function registerUser(){

  let username =
  document.getElementById("username").value;

  let email =
  document.getElementById("email").value;

  let password =
  document.getElementById("password").value;

  // VALIDASI
  if(
    username === "" ||
    email === "" ||
    password === ""
  ){

    alert("Semua form wajib diisi");
    return;

  }

  // AMBIL USER
  let users =
  JSON.parse(localStorage.getItem("users"))
  || [];

  // CEK EMAIL
  let checkUser =
  users.find(user => user.email === email);

  if(checkUser){

    alert("Akun sudah ada");

    window.location.href =
    "login.html";

    return;
  }

  // SIMPAN USER
  let newUser = {

    username: username,
    email: email,
    password: password

  };

  users.push(newUser);

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  // AUTO LOGIN
  localStorage.setItem(
    "loginUser",
    JSON.stringify(newUser)
  );

  alert("Register berhasil");

  // PINDAH HALAMAN
  window.location.href =
  "booking.html";

}