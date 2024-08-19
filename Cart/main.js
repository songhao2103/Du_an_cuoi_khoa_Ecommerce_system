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

// Lấy dữ liệu từ local xuống
const listProductsCartLocal =
  JSON.parse(localStorage.getItem("listProductsCart")) || [];

// lấy ra các elements
const listProductElement = document.getElementById("list_products");
const subtobalElement = document.querySelector(".subtobal");

//
for (let i = 0; i < listProductsCartLocal.length; i++) {
  const name = listProductsCartLocal[i].name;
  const img = listProductsCartLocal[i].img;
  const price = listProductsCartLocal[i].price;
  const quantity = listProductsCartLocal[i].quantity;
  const id = listProductsCartLocal[i].id;
  const subtobal = quantity * price;
  const idClear = "clear_" + id;

  addProduct(name, img, price, quantity, id, subtobal, idClear);
}

function addProduct(name, img, price, quantity, id, subtobal, idClear) {
  const addProductHTML = document.createElement("div");
  addProductHTML.innerHTML = `<div class="product" id="${id}  ">
                <div class="info">
                  <div class="image_product">
                    <img src="${img}" alt="" />
                  </div>
                  <p class="desc name">${name}</p>
                </div>
                <p class="item desc price">${price}</p>
                <div class="item">
                  <div class="quantity">
                    <p class="desc">0${quantity}</p>
                    <div class="icon">
                      <div class="up"><i class="fa-solid fa-angle-up"></i></div>
                      <div class="down">
                        <i class="fa-solid fa-angle-down"></i>
                      </div>
                    </div>  
                  </div>
                </div>
                <p class="item desc subtobal">${subtobal}</p>
                <div class="icon_clear" id="${idClear}">
                  <i class="fa-regular fa-circle-xmark"></i>
                </div>
              </div>`;
  listProductElement.append(addProductHTML);
}

const listClearElements = document.querySelectorAll(".icon_clear");
// xóa các sản phẩm ở list cart
for (let i = 0; i < listClearElements.length; i++) {
  const idProduct = listClearElements[i].id.slice(6);

  listClearElements[i].addEventListener("click", function () {
    for (let j = 0; j < listProductsCartLocal.length; j++)
      if (listProductsCartLocal[j].id === idProduct) {
        // xóa sản phẩm khỏi local
        listProductsCartLocal.splice(j, 1);
        // cập nhật mảng các product cart sau khi xóa lên local
        localStorage.setItem(
          "listProductsCart",
          JSON.stringify(listProductsCartLocal)
        );
        break;
      }
    const removeProduct = document.getElementById(idProduct);
    console.log(idProduct);
    console.log(removeProduct);

    if (removeProduct) {
      removeProduct.remove();
    }
    //   // xóa phần tử khỏi DOM
    //   const iconClearClicked = listClearElements[i].target;
    //   const productClear = iconClearClicked.parentElement;
    //   productClear.remove();
  });
}

// tính tổng tiền
const totalAmount = document.querySelectorAll(".total_amount");
console.log(totalAmount);

let sumMoney = 0;
console.log(listProductsCartLocal);
console.log(totalAmount);

listProductsCartLocal.forEach((element) => {
  sumMoney += element.quantity * Number(element.price);
});
console.log(sumMoney);

totalAmount[0].innerHTML = `${sumMoney}`;
totalAmount[1].innerHTML = `${sumMoney}`;
