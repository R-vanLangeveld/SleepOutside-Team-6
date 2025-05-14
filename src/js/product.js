import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // We create the 'cart' variable. At this moment it is undefined.
  let cart;  
  try {
    // If the local storage doesn't have any products
    if (getLocalStorage("so-cart") === null) {
      // we initialize the 'cart' array.
      cart = [];
      // Otherwise if local storage has products
    } else {
      // we retrieve them.
      cart = getLocalStorage("so-cart");
    }
    // We add the new product into the cart array,
    cart.push(product);
    // and we store the updated cart back into local storage.
    setLocalStorage("so-cart", cart);
    // We send a message to notify the user that the product was added (temporal view).
    alert(`✅ ${cart[0].Name} added to the cart 🛒.`);
  } catch (error) {
    alert("Something went wrong. Please try again later.");
  }
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
