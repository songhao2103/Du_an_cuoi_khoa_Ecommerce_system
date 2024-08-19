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

// =====introduce media=========

const listMedias = document.querySelectorAll(".list_media .media");
const listDots = document.querySelectorAll(".control .dot");
// console.log(listDots);
let currentIndex = 2;
listDots.forEach((item, index) => {
  item.addEventListener("click", function () {
    item.classList.add("active");
    listMedias[index].classList.add("active");
    removeActive(listMedias, index);
    removeActive(listDots, index);
  });
});
function removeActive(arr, index) {
  arr.forEach((item, ind) => {
    if (item.classList.contains("active") && index !== ind) {
      item.classList.remove("active");
    }
  });
}

// ===============Time Sale================

// 86400000 là số miliseconds trong 1 ngày
// 360000 là số milisecons trong 1 giờ
// 6000 là số milisecon trong 1 phút

const endTimeSale = new Date("2024-09-10T00:00:00").getTime();
function getTimeSale() {
  const currentTime = new Date().getTime();
  let remainingTimeSale = endTimeSale - currentTime;
  let daysSale = Math.floor(remainingTimeSale / 86400000);
  let hoursSale = Math.floor(
    (remainingTimeSale - daysSale * 86400000) / 3600000
  );
  let minutesSale = Math.floor(
    (remainingTimeSale - daysSale * 86400000 - hoursSale * 3600000) / 60000
  );
  let secondsSale = Math.floor(
    (remainingTimeSale -
      daysSale * 86400000 -
      hoursSale * 3600000 -
      minutesSale * 60000) /
      1000
  );
  // console.log(daysSale);
  // console.log(hoursSale);
  // console.log(minutesSale);
  // console.log(secondsSale);
  let prefixDay = daysSale < 10 ? "0" : "";
  let prefixHour = hoursSale < 10 ? "0" : "";
  let prefixMinute = minutesSale < 10 ? "0" : "";
  let prefixSecond = secondsSale < 10 ? "0" : "";
  document.getElementById("day_sale").innerHTML = `${prefixDay}${daysSale}`;
  document.getElementById("hour_sale").innerHTML = `${prefixHour}${hoursSale}`;
  document.getElementById(
    "minute_sale"
  ).innerHTML = `${prefixMinute}${minutesSale}`;
  document.getElementById(
    "second_sale"
  ).innerHTML = `${prefixSecond}${secondsSale}`;
}
setInterval(getTimeSale, 1000);

// ============product sale====================
const listProducts = document.querySelector(".product_sale .list_product");
const leftSales = document.querySelector(".flash_sales .arrow .left");
const rightSales = document.querySelector(".flash_sales .arrow .right");
const btnSales = document.querySelector("#btn_product_sale");
let current = 0;

function forward(value) {
  current += value;
  listProducts.style.transform = `translateX(-${current * 300.3}px)`;
  leftSales.disabled = current === 0;
  rightSales.disabled = current === 4;
}

leftSales.addEventListener("click", function () {
  forward(-1);
});

rightSales.addEventListener("click", function () {
  forward(1);
});

btnSales.addEventListener("click", function () {
  listProducts.classList.toggle("view_all");
  btnSales.classList.toggle("clicked");
  document.querySelector(".flash_sales .arrow").classList.toggle("none");
  document.querySelector("#btn_product_sale").innerHTML = "View All Products";
  document.querySelector(".btn.clicked").innerHTML = "Close All Products";
});

// ==========Browse==================
// =================================

const listCategories = document.querySelectorAll(".categories .item");
// console.log(listCategories);

// khi click vào button ở Browse thì active ở list Item Categories thay đổi
const leftCate = document.querySelector(".browse .arrow .left");
const rightCate = document.querySelector(".browse .arrow .right");
let indexCurrentCate;

function getIndex() {
  for (let i = 0; i < listCategories.length; i++) {
    if (listCategories[i].classList.contains("active")) {
      return i;
    }
  }
}
// console.log(indexCurrentCate());

function forwardCate(value) {
  listCategories[indexCurrentCate].classList.remove("active");
  indexCurrentCate += value;
  listCategories[indexCurrentCate].classList.add("active");
  leftCate.disabled = indexCurrentCate === 0;
  rightCate.disabled = indexCurrentCate === 5;
}

leftCate.addEventListener("click", function () {
  indexCurrentCate = getIndex();
  if (indexCurrentCate !== 0) {
    forwardCate(-1);
  }
});

rightCate.addEventListener("click", function () {
  indexCurrentCate = getIndex();
  if (indexCurrentCate < 5) {
    forwardCate(1);
  }
});

// thêm class active vào item nào được click

listCategories.forEach((item, ind) => {
  item.addEventListener("click", function () {
    listCategories.forEach((item1) => {
      item1.classList.remove("active");
    });
    item.classList.toggle("active");

    indexCurrentCate = getIndex();
    leftCate.disabled = indexCurrentCate === 0;
    rightCate.disabled = indexCurrentCate === 5;
  });
});

// view all ở selling product

const listProductSelling = document.querySelector(
  ".selling_products .list_product"
);

const btnSelling = document.querySelector("#btn_product_selling");

btnSelling.addEventListener("click", function () {
  listProductSelling.classList.toggle("view_all");
  btnSelling.classList.toggle("clickk");
  btnSelling.innerHTML = "View All";
  document.querySelector(".btn.clickk").innerHTML = "Close All";
});

// ========explore products==================
// ============đổi sản phẩm theo màu sắc============
const exOption51 = document.querySelector(
  ".product_explore #product_5 .option_1"
);
const exOption52 = document.querySelector(
  ".product_explore #product_5 .option_2"
);
exOption51.addEventListener("click", function () {
  exActive(exOption51, exOption52, exImage51, exImage52);
});
exOption52.addEventListener("click", function () {
  exActive(exOption52, exOption51, exImage52, exImage51);
});

const exOption61 = document.querySelector(
  ".product_explore #product_6 .option_1"
);
const exOption62 = document.querySelector(
  ".product_explore #product_6 .option_2"
);
exOption61.addEventListener("click", function () {
  exActive(exOption61, exOption62, exImage61, exImage62);
});
exOption62.addEventListener("click", function () {
  exActive(exOption62, exOption61, exImage62, exImage61);
});

const exOption71 = document.querySelector(
  ".product_explore #product_7 .option_1"
);
const exOption72 = document.querySelector(
  ".product_explore #product_7 .option_2"
);
exOption71.addEventListener("click", function () {
  exActive(exOption71, exOption72, exImage71, exImage72);
});
exOption72.addEventListener("click", function () {
  exActive(exOption72, exOption71, exImage72, exImage71);
});

const exOption81 = document.querySelector(
  ".product_explore #product_8 .option_1"
);
const exOption82 = document.querySelector(
  ".product_explore #product_8 .option_2"
);
exOption81.addEventListener("click", function () {
  exActive(exOption81, exOption82, exImage81, exImage82);
});
exOption82.addEventListener("click", function () {
  exActive(exOption82, exOption81, exImage82, exImage81);
});

const exImage51 = document.querySelector(
  ".product_explore #product_5 .image_1"
);
const exImage52 = document.querySelector(
  ".product_explore #product_5 .image_2"
);

const exImage61 = document.querySelector(
  ".product_explore #product_6 .image_1"
);
const exImage62 = document.querySelector(
  ".product_explore #product_6 .image_2"
);

const exImage71 = document.querySelector(
  ".product_explore #product_7 .image_1"
);
const exImage72 = document.querySelector(
  ".product_explore #product_7 .image_2"
);

const exImage81 = document.querySelector(
  ".product_explore #product_8 .image_1"
);
const exImage82 = document.querySelector(
  ".product_explore #product_8 .image_2"
);

function exActive(value11, value12, value21, value22) {
  value12.classList.remove("active");
  value11.classList.add("active");

  value22.classList.remove("active");
  value21.classList.add("active");
}

// làm chức năng thêm vào giỏ hàng
// lấy dữ liệu danh sách sản phẩm lên localStorage
// const listProductsLocal = JSON.parse(localStorage.getItem("listProducts"));
const listClassAdd = document.querySelectorAll(".add");
// lấy xuống dữ liệu danh sách các sản phẩm đã được thêm vào giỏ hàng
const listProductsCartLocal =
  JSON.parse(localStorage.getItem("listProductsCart")) || [];
// console.log(listClassAdd);
listClassAdd.forEach((element) => {
  element.addEventListener("click", function () {
    // lấy ra các thông tin của sản phẩm
    const idProduct = element.id.slice(4);
    const productName = document.querySelector(`#${idProduct} .name`).innerHTML;
    const productImg = document.querySelector(`#${idProduct} .product_img`).src;
    const productPrice = document.querySelector(
      `#${idProduct} .price .after span`
    ).innerHTML;

    // Tạo đối tượng sản phẩm
    const productCart = {
      id: idProduct,
      name: productName,
      img: productImg,
      price: productPrice,
      quantity: 1,
    };
    let count = 0;
    for (let i = 0; i < listProductsCartLocal.length; i++) {
      if (listProductsCartLocal[i].id === productCart.id) {
        listProductsCartLocal[i].quantity++;
        count++;
        localStorage.setItem(
          "listProductsCart",
          JSON.stringify(listProductsCartLocal)
        );
        break;
      }
    }
    if (count === 0) {
      listProductsCartLocal.push(productCart);
      localStorage.setItem(
        "listProductsCart",
        JSON.stringify(listProductsCartLocal)
      );
    }
    // đẩy thông tin sản phẩm lên localstorage
  });
});
