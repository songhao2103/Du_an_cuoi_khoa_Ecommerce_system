// thêm class active và account user
const accountUser = document.getElementById("account_user");
const optionsAcc = document.getElementById("options_acc");
console.log(accountUser);
accountUser.addEventListener("click", function () {
  accountUser.classList.toggle("active");
  if (accountUser.classList.contains("active")) {
    optionsAcc.style.display = "block";
    accountUser.style.backgroundColor = "#db4444";
    accountUser.style.color = "#fff";
  } else {
    optionsAcc.style.display = "none";
    accountUser.style.backgroundColor = "#fff";
    accountUser.style.color = "#000";
  }
});

// Làm chức năng ẩn hiện mật khẩu ở profile update
const boxEyeUpdateElement = document.getElementById("box_eye_update");
const slashEyeUpdateElement = document.getElementById("slash_eye_update");
const passwordUpdateElement = document.getElementById("password_update");
boxEyeUpdateElement.addEventListener("click", function () {
  slashEyeUpdateElement.classList.toggle("active");
  if (slashEyeUpdateElement.classList.contains("active")) {
    passwordUpdateElement.type = "text";
  } else {
    passwordUpdateElement.type = "password";
  }
});

// // code cho phần hiển thị số sản phẩm đã thêm vào giỏ hàng
// const listProductsCartLocal =
//   JSON.parse(localStorage.getItem(nameCartLocal)) || [];

// function displayQuantity() {
//   const quantityProductsCart = document.getElementById(
//     "quantity_products_cart"
//   );
//   if (listProductsCartLocal.length === 0) {
//     quantityProductsCart.style.display = "none";
//   } else {
//     quantityProductsCart.innerHTML = listProductsCartLocal.length;
//     quantityProductsCart.style.display = "block";
//   }
// }
// displayQuantity();
// =======================================================
const listMyOptionsElement = document.querySelectorAll(".my_option");
const listMediaOptionsElement = document.querySelectorAll(".media_option");
console.log(listMediaOptionsElement);

listMyOptionsElement.forEach((element, index) => {
  element.addEventListener("click", function () {
    listMyOptionsElement.forEach((item) => {
      item.classList.remove("active");
    });
    element.classList.add("active");

    listMediaOptionsElement.forEach((media) => {
      media.style.display = "none";
    });
    listMediaOptionsElement[index].style.display = "block";
  });
});

// lấy thông tin tài khoản đang đăng nhập hiện thị lên trang web
function displayInfo() {
  const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedInLocal"));
  // lays thông tin tất cả các tài khoản đã được đăng nhập
  const listUsers = JSON.parse(localStorage.getItem("usersLocal"));
  document.getElementById("my_name").innerHTML = userLoggedIn.name;
  document.getElementById("my_email").innerHTML = userLoggedIn.email;
  document.getElementById("my_id").innerHTML = userLoggedIn.id;
}
displayInfo();
// làm chức năng cập nhật thông tin

const profileUpdate = document.getElementById("form_profile_update");
profileUpdate.addEventListener("submit", function (e) {
  e.preventDefault();

  const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedInLocal"));
  // lays thông tin tất cả các tài khoản đã được đăng nhập
  const listUsers = JSON.parse(localStorage.getItem("usersLocal"));

  const nameForm = document.getElementById("name_update").value;
  const emailForm = document.getElementById("email_update").value;
  const passwordForm = document.getElementById("password_update").value;

  let passwordUpdate;
  let nameUpdate = nameForm ? nameForm : userLoggedIn.name;
  let emailUpdate = emailForm ? emailForm : userLoggedIn.email;
  // kiểm tra giá trị của nameForm

  // kiểm tra giá trị của emailForm
  let checkEmail = true;
  if (emailForm) {
    const findEmail = listUsers.find((user) => user.email === emailForm);
    if (findEmail) {
      emailUpdate = userLoggedIn.email;
      document.getElementById("error_email").style.display = "block";
      checkEmail = false;
      return;
    } else {
      document.getElementById("error_email").style.display = "none";
      checkEmail = true;
    }
  }

  // kiểm tra passwordForm
  if (!passwordForm) {
    document.getElementById("error_password").style.display = "block";
    return;
  } else {
    document.getElementById("error_password").style.display = "none";
    if (userLoggedIn.password !== passwordForm) {
      document.getElementById("error_password").innerHTML =
        "Mật khẩu không đúng, thử lại";
      document.getElementById("error_password").style.display = "block";
    } else {
      passwordUpdate = passwordForm;
      document.getElementById("error_password").style.display = "none";
    }
  }
  console.log(checkEmail);

  if (checkEmail && userLoggedIn.password === passwordUpdate) {
    // cập nhật lại thông tin của tài khoản rồi đưa lên local
    userLoggedIn.email = emailUpdate;
    userLoggedIn.name = nameUpdate;
    userLoggedIn.password = passwordUpdate;

    // cập nhật thông tin lên tài khoản đang đăng nhập
    localStorage.setItem("userLoggedInLocal", JSON.stringify(userLoggedIn));

    // cập nhật thông tin lên danh sách tất cả các tài khoản
    const listUsers = JSON.parse(localStorage.getItem("usersLocal"));
    for (let i = 0; i < listUsers.length; i++) {
      if (listUsers[i].id === userLoggedIn.id) {
        listUsers[i].email = emailUpdate;
        listUsers[i].userName = nameUpdate;
        localStorage.setItem("usersLocal", JSON.stringify(listUsers));
        break;
      }
    }

    alert("Bạn đã cập nhật thông tin thành công!");
    document.getElementById("profile_update").style.display = "none";
    document.getElementById("my_profile").style.display = "block";
    document.getElementById("option_my_profile").classList.add("active");
    document.getElementById("option_profile_update").classList.remove("active");
  }
  displayInfo();
});

// ẩn hiện mật khẩu ở password changes
const oldPasswordElement = document.getElementById("old_password");
const newPasswordElement = document.getElementById("new_password");
const re_newPasswordElement = document.getElementById("re-new_password");
const boxEyeOld = document.getElementById("box_eye_old");
const boxEyeNew = document.getElementById("box_eye_new");
const boxEyeRe_new = document.getElementById("box_eye_re-new");
const slashEyeOld = document.getElementById("slash_eye_old");
const slashEyeNew = document.getElementById("slash_eye_new");
const slashEyeRe_new = document.getElementById("slash_eye_re-new");

boxEyeOld.addEventListener("click", function () {
  hiddenChangesPassword(oldPasswordElement, slashEyeOld);
});
boxEyeNew.addEventListener("click", function () {
  hiddenChangesPassword(newPasswordElement, slashEyeNew);
});
boxEyeRe_new.addEventListener("click", function () {
  hiddenChangesPassword(re_newPasswordElement, slashEyeRe_new);
});

function hiddenChangesPassword(password, eye) {
  eye.classList.toggle("active");
  if (eye.classList.contains("active")) {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

// Làm chức năng thay đổi mật khẩu

const passwordChanges = document.getElementById("form_password_changes");

passwordChanges.addEventListener("submit", function (e) {
  e.preventDefault();
  const oldPasswordForm = document.getElementById("old_password").value;
  const newPasswordForm = document.getElementById("new_password").value;
  const re_newPasswordForm = document.getElementById("re-new_password").value;

  const errorOldPassword = document.getElementById("error_old_password");
  const errorNewPassword = document.getElementById("error_new_password");
  const errorRe_newPassword = document.getElementById("error_re-new_password");

  const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedInLocal"));
  // lays thông tin tất cả các tài khoản đã được đăng nhập
  const listUsers = JSON.parse(localStorage.getItem("usersLocal"));

  let isValid = true;
  // kiểm tra mật khẩu cũ
  if (!oldPasswordForm) {
    errorOldPassword.innerHTML = "Old password không được để trống";
    errorOldPassword.style.display = "block";
    isValid = false;
  } else if (oldPasswordForm !== userLoggedIn.password) {
    errorOldPassword.innerHTML = "Mật khẩu cũ không đúng, thử lại";
    errorOldPassword.style.display = "block";
    isValid = false;
  } else {
    errorOldPassword.style.display = "none";
  }

  // kiểm tra mật khẩu mới
  if (!newPasswordForm) {
    errorNewPassword.style.display = "block";
    errorNewPassword.innerHTML = "New password không được để trống";
    isValid = false;
  } else if (newPasswordForm.length < 6) {
    errorNewPassword.innerHTML = "Mật khẩu phải trên 6 ký tự";
    errorNewPassword.style.display = "block";
    isValid = false;
  } else {
    errorNewPassword.style.display = "none";
  }

  // kiểm tra mật khẩu được nhập lại
  if (!re_newPasswordForm) {
    errorRe_newPassword.innerHTML = " Re-new password không được để trống";
    errorRe_newPassword.style.display = "block";
    isValid = false;
  } else if (re_newPasswordForm !== newPasswordForm) {
    errorRe_newPassword.innerHTML = "Mật khẩu không khớp, thử lại";
    errorRe_newPassword.style.display = "block";
    isValid = false;
  } else {
    errorRe_newPassword.style.display = "none";
  }

  if (isValid) {
    userLoggedIn.password = newPasswordForm;
    localStorage.setItem("userLoggedInLocal", JSON.stringify(userLoggedIn));
    for (let i = 0; i < listUsers.length; i++) {
      if (listUsers[i].id === userLoggedIn.id) {
        listUsers[i].password = newPasswordForm;
        localStorage.setItem("usersLocal", JSON.stringify(listUsers));
        break;
      }
    }

    alert("Bạn đã cập nhật thông tin thành công!");
    document.getElementById("password_changes").style.display = "none";
    document.getElementById("my_profile").style.display = "block";
    document.getElementById("option_my_profile").classList.add("active");
    document
      .getElementById("option_password_changes")
      .classList.remove("active");
  }
});
