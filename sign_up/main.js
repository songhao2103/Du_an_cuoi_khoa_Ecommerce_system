// lấy ra các element của trang
// + element của form
const formSignUp = document.getElementById("form_sign_up");

// lấy ra các elements icon eye
const iconPassword = document.querySelector(".icon_password");
const iconRepassword = document.querySelector(".icon_repassword");
var password = document.getElementById("password");
var rePassword = document.getElementById("repassword");

// tạo mảng userLocal rồi gán nó bằng 1 mảng users ở trên localstorage
const usersLocal = JSON.parse(localStorage.getItem("usersLocal")) || [];

function hiddenPassword(element1, element2) {
  element1.classList.toggle("active");
  if (element1.classList.contains("active")) {
    element2.type = "text";
  } else {
    element2.type = "password";
  }
}

iconPassword.addEventListener("click", function () {
  hiddenPassword(iconPassword, password);
});
iconRepassword.addEventListener("click", function () {
  hiddenPassword(iconRepassword, rePassword);
});

// lắng nghe sự kiện submit của formSignUp
formSignUp.addEventListener("submit", function (e) {
  // ngăn chặn sự kiện load lại trang
  e.preventDefault();

  // lấy ra các elements của form
  const userName = document.getElementById("user_name");
  const email = document.getElementById("email");
  var password = document.getElementById("password");
  var rePassword = document.getElementById("repassword");

  //   lấy ra các elements lỗi của các input
  const errorUserName = document.querySelector(".user_name_error");
  const errorEmail = document.querySelector(".email_error");
  const errorPassword = document.querySelector(".password_error");
  const errorRepassword = document.querySelector(".repassword_error");

  // hàm kiểm tra xem đã có địa chỉ email ở trên localstorage hay chưa
  const findEmail = usersLocal.find((user) => user.email === email.value);
  console.log(findEmail);

  if (!userName.value) {
    errorUserName.style.display = "block";
  } else {
    errorUserName.style.display = "none";
  }

  if (!email.value) {
    errorEmail.innerHTML = "Email không được để trống";
    errorEmail.style.display = "block";
  } else if (findEmail) {
    errorEmail.innerHTML = "Email này đã được đăng ký";
    errorEmail.style.display = "block";
  } else {
    errorEmail.style.display = "none";
  }

  if (!password.value) {
    errorPassword.innerHTML = "Password không được để trống";
    errorPassword.style.display = "block";
  } else if (password.value.length < 6) {
    errorPassword.innerHTML = "Độ dài mật khẩu không đủ, ít nhất 6 ký tự";
    errorPassword.style.display = "block";
  } else {
    errorPassword.style.display = "none";
  }

  if (!rePassword.value) {
    errorRepassword.innerHTML = "Re-password không được để trống";
    errorRepassword.style.display = "block";
  } else if (
    rePassword.value !== password.value &&
    password.value.length >= 6
  ) {
    errorRepassword.innerHTML = "Mật khẩu không khớp, thử lại";
    errorRepassword.style.display = "block";
  } else {
    errorRepassword.style.display = "none";
  }

  if (
    userName.value &&
    email.value &&
    password.value &&
    rePassword.value &&
    password.value === rePassword.value &&
    password.value.length >= 6 &&
    !findEmail
  ) {
    // lấy dữ liệu từ form gộp thành đối tượng user
    const user = {
      id: Math.floor(Math.random() * 100000000),
      userName: userName.value,
      email: email.value,
      password: password.value,
    };

    // đưa dữ liệu user và mảng các usersLocal
    usersLocal.push(user);

    // lưu trữ dữ liệu 1 mảng lên local
    localStorage.setItem("usersLocal", JSON.stringify(usersLocal));

    // chuyển hướng về trang đăng nhập
    window.location.href = "../LogIn/index.html";
  }
});
