import ExternalServices from "./ExternalServices.mjs";
const services = new ExternalServices();

export default class CheckoutProcess {
	constructor() {}

	getTotal(cartItems) {
		const shipping = cartItems.reduce(
			(total, item) => total + (item.Qty * 2), 8,
		);
		const totalItems = cartItems.reduce(
			(total, item) => total + item.Qty, 0,
		);
		const totalCartValue = cartItems.reduce(
			(total, item) => total + (item.FinalPrice * item.Qty), 0,
		);
		const cartTotalElement = document.querySelector(".summary");
		const total = shipping + (totalCartValue * 1.06);

		cartTotalElement.innerHTML = `<h3>Order Summary</h3>
		<p>Total Items:${totalItems}<br>Subtotal: $${totalCartValue}<br>Tax: $${(totalCartValue * 0.06).toFixed(2)}<br>Shipping Estimate: $${shipping}<br>Order Total: $${total.toFixed(2)}</p>`;
	}
	
  async checkout() {
    const formElement = document.forms["checkout"];
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);

    try {
      const response = await services.checkout(order);
      console.log(response);
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