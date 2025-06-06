import { getParam, loadHeaderFooter, updateCartCount } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter().then(() => {
  updateCartCount();
});

const dataSource = new ExternalServices();
const productId = getParam("product");

const productDetail = new ProductDetails(productId, dataSource);
productDetail.init();
