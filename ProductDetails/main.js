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

// lấy tên tài khoản đang đăng nhập rồi hiển thị lên trang
const accountLoggedIn = JSON.parse(localStorage.getItem("userLoggedInLocal"));
const nameCartLocal = "listProductsCart" + accountLoggedIn.id;
const nameAccountLoggedIn = document.getElementById("acccount_logged_in");
nameAccountLoggedIn.innerHTML = accountLoggedIn.email;

// code cho phần hiển thị số sản phẩm đã thêm vào giỏ hàng
const listProductsCartLocal =
  JSON.parse(localStorage.getItem(nameCartLocal)) || [];

function displayQuantity() {
  const quantityProductsCart = document.getElementById(
    "quantity_products_cart"
  );
  if (listProductsCartLocal.length === 0) {
    quantityProductsCart.style.display = "none";
  } else {
    quantityProductsCart.innerHTML = listProductsCartLocal.length;
    quantityProductsCart.style.display = "block";
  }
}
displayQuantity();
// Thêm chức năng hiển thị sản phẩm
// lấy sản phẩm được đẩy lên local ở loggedIn xuống
const seeProduct = JSON.parse(localStorage.getItem("seeProductLocal"));
if (seeProduct) {
  const name = seeProduct.name;
  const img = seeProduct.img;
  const price = seeProduct.price;
  const id = seeProduct.id;
  console.log(name, img, id, price);
  // thêm vào html
  const addSeeProductHTML = document.createElement("div");
  addSeeProductHTML.className = "product_see";
  addSeeProductHTML.innerHTML = `<div class="list_secondary_images">
            <img src="${img}" alt="" /><img
              src="${img}"
              alt=""
            /><img src="${img}" alt="" /><img
              src="${img}"
              alt=""
            />
          </div>
          <div class="box_main_image">
            <img
              class="main_image"
              src="${img}"
              alt=""
            />
          </div>
          <div class="info">
            <div class="top_info">
              <p class="desc title">${name}</p>
              <div class="ratting">
                <div class="list_star">
                  <i class="fa-solid fa-star"></i
                  ><i class="fa-solid fa-star"></i
                  ><i class="fa-solid fa-star"></i
                  ><i class="fa-solid fa-star"></i
                  ><i class="fa-solid fa-star"></i>
                </div>
                <p class="desc review">(150 Reviews)</p>
                <p class="desc">In Stock</p>
              </div>
              <p class="price desc">$<span>${price}</span></p>
              <p class="describe desc">
                PlayStation 5 Controller Skin High quality vinyl with air
                channel adhesive for easy bubble free install & mess free
                removal Pressure sensitive.
              </p>
            </div>

            <div class="product_options">
              <div class="colours">
                <p class="desc">Colours:</p>
                <div class="dot"></div>
                <div class="dot"></div>
              </div>
              <div class="size">
                <p class="desc">Size:</p>
                <p class="desc item">XS</p>
                <p class="desc item">S</p>
                <p class="desc item">M</p>
                <p class="desc item">L</p>
                <p class="desc item">XL</p>
              </div>
              <div class="bot_option">
                <div class="change_quantity">
                  <p id="change_down" class="change desc">-</p>
                  <p id="quantity_product" class="desc quantity">1</p>
                  <p id="change_up" class="change desc">+</p>
                </div>
                 <a href="../Cart/index.html">
                  <button id="buy_now_see" class="btn desc">Buy Now</button>
                  </a>
                <div class="wish_list_product">
                  <i class="fa-regular fa-heart"></i>
                </div>
              </div>
            </div>

            <div class="endows">
              <div class="endow">
                <div class="icon_endow"><i class="fa-solid fa-truck"></i></div>
                <div class="right">
                  <p class="desc">Free Delivery</p>
                  <p class="desc">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>
              <div class="endow">
                <div class="icon_endow">
                  <i class="fa-solid fa-rotate-left"></i>
                </div>
                <div class="right">
                  <p class="desc">Return Delivery</p>
                  <p class="desc">Free 30 Days Delivery Returns. Details</p>
                </div>
              </div>
            </div>
          </div>`;
  const seeProductElement = document.getElementById("see_product");
  // console.log(seeProductElement);
  seeProductElement.append(addSeeProductHTML);
}

// lấy ra phần tử change_up, change_down
const changeUpElement = document.getElementById("change_up");
const changeDownElement = document.getElementById("change_down");
const quantityProductSeeElement = document.getElementById("quantity_product");
// seeProduct.quantity = 1;
changeUpElement.addEventListener("click", function () {
  changeQuantity(1);
  // code cho phần hiển thị số sản phẩm đã thêm vào giỏ hàng
});
changeDownElement.addEventListener("click", function () {
  changeQuantity(-1);
  // code cho phần hiển thị số sản phẩm đã thêm vào giỏ hàng
});
// hàm thay đổi số lượng
function changeQuantity(value) {
  // cập nhật số lượng trên local
  seeProduct.quantity += value;
  if (seeProduct.quantity <= 0) {
    seeProduct.quantity = 1;
  }
  localStorage.setItem("seeProductLocal", JSON.stringify(seeProduct));
  // cập nhật lại số lượng trên giao diện
  quantityProductSeeElement.innerHTML = seeProduct.quantity;
}

// làm chức năng thêm sản phẩm vào giỏ hàng cho nút buy now
const buyNowSeeElement = document.getElementById("buy_now_see");
const listProductCart = JSON.parse(localStorage.getItem(nameCartLocal));
buyNowSeeElement.addEventListener("click", function () {
  // lấy sản phẩm ở giỏ hàng trên local xuống
  if (listProductCart) {
    let productFound = false;
    for (let i = 0; i < listProductCart.length; i++) {
      if (listProductCart[i].id === seeProduct.id) {
        listProductCart[i].quantity += seeProduct.quantity;
        localStorage.setItem(nameCartLocal, JSON.stringify(listProductCart));
        productFound = true;
        break;
      }
    }
    if (!productFound) {
      listProductCart.push(seeProduct);
      localStorage.setItem(nameCartLocal, JSON.stringify(listProductCart));
    }
  } else {
    listProductCart.push(seeProduct);
    localStorage.setItem(nameCartLocal, JSON.stringify(listProductCart));
  }
});

console.log(seeProduct);


// làm chức năng xem thông tin sản phẩm
// lấy các phần tử HTML
const listImagesProduct = document.querySelectorAll(
  ".cart_product .see_product"
);
console.log(listImagesProduct);

listImagesProduct.forEach((element) => {
  element.addEventListener("click", function () {
    // lấy ra các thông tin của sản phẩm
    const idProduct = element.id.slice(6);
    const productName = document.querySelector(`#${idProduct} .name`).innerHTML;
    const productImg = document.querySelector(`#${idProduct} .product_img`).src;
    const productPrice = document.querySelector(
      `#${idProduct} .price .after span`
    ).innerHTML;

    // Tạo đối tượng sản phẩm
    const seeProduct = {
      id: idProduct,
      name: productName,
      img: productImg,
      price: productPrice,
      quantity: 1,
    };
    // đẩy thông tin sản phẩm muốn xem trên local
    localStorage.setItem("seeProductLocal", JSON.stringify(seeProduct));
  });
});
