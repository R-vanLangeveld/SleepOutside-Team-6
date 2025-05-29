import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
const order = new CheckoutProcess();
order.init();

document.querySelector("#zip")
  .addEventListener("blur", order.calculateOrdertotal.bind(order));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.forms[0];
  const chk_status = form.checkValidity();
  if(chk_status) {
    order.checkout();
  }
});