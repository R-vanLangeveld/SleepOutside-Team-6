import ProductData from "./ProductData.mjs"
import ProductList from "./ProductList.mjs"

const dataSource = new ProductData("tents");

const list = new ProductList("tents", dataSource);

console.log(list)
