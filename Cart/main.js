// thêm class active và account user
const accountUser = document.getElementById("account_user");
const optionsAcc = document.getElementById("options_acc");
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
// lấy thông tin tài khoản hiện tại đang đăng nhập trên local xuống
const accountLoggedIn = JSON.parse(localStorage.getItem("userLoggedInLocal"));
const nameCartLocal = "listProductsCart" + accountLoggedIn.id;
console.log(nameCartLocal);

const listProductsCartLocal =
  JSON.parse(localStorage.getItem(nameCartLocal)) || [];

// lấy ra các elements
const listProductElement = document.getElementById("list_products");
const subtobalElement = document.querySelector(".subtobal");
// lấy email tài khoản đang đăng nhập thêm vao trang
const nameAccountLoggedIn = document.getElementById("acccount_logged_in");
nameAccountLoggedIn.innerHTML = accountLoggedIn.email;

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
                    <p id="quantity_${id}" class="desc">0${quantity}</p>
                    <div class="icon">
                      <div id="up_${id}" class="up"><i class="fa-solid fa-angle-up"></i></div>
                      <div id="down_${id}" class="down">
                        <i class="fa-solid fa-angle-down"></i>
                      </div>
                    </div>  
                  </div>
                </div>
                <p id="subtotal_${id}" class="item desc subtobal">${subtobal}</p>
                <div class="icon_clear" id="${idClear}">
                  <i class="fa-regular fa-circle-xmark"></i>
                </div>
              </div>`;
  listProductElement.append(addProductHTML);
  // tính tổng tiền
  calculateTotalAmount();
  clearProduct();
}

//tính tổng tiền
function calculateTotalAmount() {
  const totalAmount = document.querySelectorAll(".total_amount");

  let sumMoney = 0;

  listProductsCartLocal.forEach((element) => {
    sumMoney += element.quantity * Number(element.price);
  });

  totalAmount[0].innerHTML = `${sumMoney}`;
  totalAmount[1].innerHTML = `${sumMoney}`;
}

// xóa sản phẩm
function clearProduct() {
  const listClearElements = document.querySelectorAll(".icon_clear");
  // xóa các sản phẩm ở list cart
  for (let i = 0; i < listClearElements.length; i++) {
    const idProduct = listClearElements[i].id.slice(6);
    // console.log(listClearElements[i]);

    listClearElements[i].addEventListener("click", function () {
      for (let j = 0; j < listProductsCartLocal.length; j++)
        if (listProductsCartLocal[j].id === idProduct) {
          // xóa sản phẩm khỏi local
          listProductsCartLocal.splice(j, 1);
          // cập nhật mảng các product cart sau khi xóa lên local
          localStorage.setItem(
            nameCartLocal,
            JSON.stringify(listProductsCartLocal)
          );
          break;
        }

      // tính tổng tiền
      calculateTotalAmount();
      //   // xóa phần tử khỏi DOM
      const iconClearClicked = listClearElements[i].parentElement;
      iconClearClicked.remove();
    });
  }
}
// clearProduct();

// lấy ra các nút tăng, giảm số lượng sản phẩm
const listUp = document.querySelectorAll(".up");
const listDown = document.querySelectorAll(".down");

changeQuantity(1, listUp);
changeQuantity(-1, listDown);

function changeQuantity(value, arr) {
  // tạo sự kiện click cho các phần tử của arr
  arr.forEach((element) => {
    element.addEventListener("click", function () {
      // làm cho listUp
      if (value === 1) {
        const idProduct = element.id.slice(3);

        listProductsCartLocal.forEach((prd) => {
          if (prd.id === idProduct) {
            prd.quantity++;
            // cập nhật lại dữ liệu lên local
            localStorage.setItem(
              nameCartLocal,
              JSON.stringify(listProductsCartLocal)
            );
            // cập nhật lại số lượng trên giao diện
            const idQuantityProduct = "quantity_" + idProduct;
            let stringQuantity = String(`${prd.quantity}`).padStart(2, "0");
            document.getElementById(idQuantityProduct).innerHTML =
              stringQuantity;

            // cập nhật lại tổng tiền của sản phẩm
            let newSubtotal = Number(prd.price) * prd.quantity;
            console.log(newSubtotal);
            const idSubtotalProduct = `subtotal_${idProduct}`;
            document.getElementById(
              idSubtotalProduct
            ).innerHTML = `${newSubtotal}`;
            console.log(idSubtotalProduct);
            console.log(document.getElementById(idSubtotalProduct));

            // Cập nhật lại tổng tiền của giỏ hàng
            calculateTotalAmount();
          }
        });
      } else {
        const idProduct = element.id.slice(5);
        listProductsCartLocal.forEach((prd) => {
          if (prd.id === idProduct) {
            if (prd.quantity > 1) {
              prd.quantity--;
              // cập nhật lại dữ liệu lên local
              localStorage.setItem(
                nameCartLocal,
                JSON.stringify(listProductsCartLocal)
              );

              // cập nhật lại số lượng trên giao diện
              const idQuantityProduct = "quantity_" + idProduct;
              let stringQuantity = String(`${prd.quantity}`).padStart(2, "0");
              document.getElementById(idQuantityProduct).innerHTML =
                stringQuantity;

              // cập nhật lại tổng tiền của sản phẩm
              let newSubtotal = Number(prd.price) * prd.quantity;
              console.log(newSubtotal);
              const idSubtotalProduct = `subtotal_${idProduct}`;
              document.getElementById(
                idSubtotalProduct
              ).innerHTML = `${newSubtotal}`;
              console.log(idSubtotalProduct);
              console.log(document.getElementById(idSubtotalProduct));

              // Cập nhật lại tổng tiền của giỏ hàng
              calculateTotalAmount();
            }
          }
        });
      }
    });
  });
}
