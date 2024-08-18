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
