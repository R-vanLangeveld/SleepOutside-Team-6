import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();


const category = getParam("category");

const list_h2 = document.getElementById("list-h2")
list_h2.textContent = "Top Products: " + category.charAt(0).toUpperCase() + category.slice(1);
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);
productList.init();