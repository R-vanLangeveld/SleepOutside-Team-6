import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();
const productId = getParam("product");

const productDetail = new ProductDetails(productId, dataSource);
productDetail.init();
