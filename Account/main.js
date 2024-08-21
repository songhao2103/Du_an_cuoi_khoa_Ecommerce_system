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
  console.log(userLoggedIn);
  document.getElementById("my_name").innerHTML = userLoggedIn.name;
  document.getElementById("my_email").innerHTML = userLoggedIn.email;
  document.getElementById("my_id").innerHTML = userLoggedIn.id;
  document.getElementById("my_address").innerHTML =
    userLoggedIn.address || "Not update yet";
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
  const addressForm = document.getElementById("address_update").value || "";

  let passwordUpdate;
  let nameUpdate = nameForm ? nameForm : userLoggedIn.name;
  let addressUpdate = addressForm ? addressForm : userLoggedIn.address;
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
    userLoggedIn.address = addressUpdate;
    // cập nhật thông tin lên tài khoản đang đăng nhập
    localStorage.setItem("userLoggedInLocal", JSON.stringify(userLoggedIn));
    // cập nhật thông tin lên danh sách tất cả các tài khoản
    const listUsers = JSON.parse(localStorage.getItem("usersLocal"));
    alert("Bạn đã cập nhật thông tin thành công!");
    document.getElementById("profile_update").style.display = "none";
    document.getElementById("my_profile").style.display = "block";
  }
});

displayInfo();
