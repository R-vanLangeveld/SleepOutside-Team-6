import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, listElement);
myList.init();

document.querySelector(".title").textContent =
  `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;

const sortName = document.querySelector("#sort-name");
sortName.addEventListener("click", () => {
  myList.sort("name");
});

const sortPrice = document.querySelector("#sort-price");
sortPrice.addEventListener("click", () => {
  myList.sort("price");
});
