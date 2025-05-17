import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

console.log("productList")
const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, element);

console.log("productList", "")
productList.init();
