import { setLocalStorage,
  getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
const services = new ExternalServices();

export default class CheckoutProcess {
	constructor() {
    this.list = getLocalStorage("so-cart");
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const totalCartItems = this.list.reduce(
      (total, item) => total + item.Qty, 0,
    );
    this.itemTotal = this.list.reduce(
      (total, item) => total + (item.FinalPrice * item.Qty), 0,
    );
    document.querySelector("#cartTotal").innerHTML = `Item Subtotal(${totalCartItems}): $${this.itemTotal}`;
  }

  calculateOrdertotal() {
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)).toFixed(2);
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const shipping = document.querySelector("#shipping");
    const tax = document.querySelector("#tax");
    const orderTotal = document.querySelector("#orderTotal");
    shipping.innerText = `Shipping Estimate: $${this.shipping}`;
    tax.innerText = `Tax: $${this.tax}`;
    orderTotal.innerHTML = `<b>Order Total:</b> $${this.orderTotal}`;
  }
	
  async checkout() {
    const formElement = document.forms["checkout"];
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);

    console.log(json);
    try {
      const response = await services.checkout(order);
      console.log(response);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      console.log(err);
    }
  }
}

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.Qty,
    };
  });
  return simplifiedItems;
}