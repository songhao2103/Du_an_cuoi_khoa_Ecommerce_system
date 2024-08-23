// lấy ra phần tử form
const formLogIn = document.getElementById("form_log_in");
const emailLogIn = document.getElementById("email");
const passwordLogIn = document.getElementById("password");
const errorEmail = document.getElementById("error_email");
const errorPassword = document.getElementById("error_password");
const alertError = document.getElementById("alert_error");
// hidden mật khẩu
const icon_password = document.querySelector(".icon_password");
var password = document.getElementById("password");
icon_password.addEventListener("click", function () {
  icon_password.classList.toggle("active");
  if (icon_password.classList.contains("active")) {
    password.type = "text";
  } else {
    password.type = "password";
  }
});

// lắng nghe sự kiện submib của formLogIin
formLogIn.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!emailLogIn.value) {
    errorEmail.style.display = "block";
    alertError.style.display = "none";
  } else {
    errorEmail.style.display = "none";
  }

  if (!passwordLogIn.value) {
    errorPassword.style.display = "block";
    alertError.style.display = "none";
  } else {
    errorPassword.style.display = "none";
  }
  // lấy dữ liệu tài khoản từ localstorage
  const usersLocal = JSON.parse(localStorage.getItem("usersLocal")) || [];
  // tìm kiếm và kiểm tra dữ liệu người dùng nhập vào so với dữ liệu từ localstorage
  // hàm find() sẽ trả về giá trị duy nhất thỏa mãn được tìm thấy trong mảng

  const findUser = usersLocal.find(
    (user) =>
      user.email === emailLogIn.value && user.password === passwordLogIn.value
  );
  // && passwordLogIn.value && emailLogIn.value

  if (emailLogIn.value && passwordLogIn.value) {
    if (!findUser) {
      alertError.style.display = "block";
    } else {
      const userLoggedInLocal = {
        id: findUser.id,
        email: findUser.email,
        password: findUser.password,
        name: findUser.userName,
      };
      localStorage.setItem(
        "userLoggedInLocal",
        JSON.stringify(userLoggedInLocal)
      );
      window.location.href = "../loggedIn/index.html";
    }
  }
});
