// tạo dữ liệu các sản phẩm
const products = [
  {
    id: "product_1",
    name: "HAVIT HV-G92 Gamepad",
    url: "../img/img_products/g92-2-500x500 1.png",
    price: 120,
  },
  {
    id: "product_2",
    name: "AK-900 Wired Keyboard",
    url: "../img/img_products/ak-900-01-500x500 1.png",
    price: 960,
  },
  {
    id: "product_3",
    name: "IPS LCD Gaming Monitor",
    url: "../img/img_products/g27cq4-500x500 1.png",
    price: 370,
  },
  {
    id: "product_4",
    name: "S-Series Comfort Chair",
    url: "../img/img_products/sam-moghadam-khamseh-kvmdsTrGOBM-unsplash 1.png",
    price: 375,
  },
  {
    id: "product_5",
    name: "The north coat",
    url: "../img/img_products/672462_ZAH9D_5626_002_100_0000_Light-The-North-Face-x-Gucci-coat 1.png",
    price: 260,
  },
  {
    id: "product_6",
    name: "Gucci duffle bag",
    url: "../img/img_products/547953_9C2ST_8746_001_082_0000_Light-Gucci-Savoy-medium-duffle-bag 1.png",
    price: 960,
  },
  {
    id: "product_7",
    name: "RGB liquid CPU Cooler",
    url: "../img/img_products/gammaxx-l240-argb-1-500x500 1.png",
    price: 160,
  },
  {
    id: "product_8",
    name: "Small BookSelf",
    url: "../img/img_products/sam-moghadam-khamseh-L_7MQsHl_aU-unsplash 1.png",
    price: 210,
  },
];

localStorage.setItem("listProducts", JSON.stringify(products));
