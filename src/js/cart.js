import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartFooter = document.querySelector(".cart-footer");

  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "There are no items in the cart.";
    cartFooter.classList.add("hide");
  } else {
    cartFooter.classList.remove("hide");
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    getTotal(cartItems);
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
}

function getTotal(cartItems) {
  const totalCartValue = cartItems.reduce(
    (total, item) => total + (item.FinalPrice * item.Qty),
    0,
  );
  const cartTotalElement = document.querySelector(".cart-total");
  cartTotalElement.innerHTML = "";
  cartTotalElement.insertAdjacentHTML(
    "beforeend",
    `Total: $${totalCartValue.toFixed(2)}`,
  );
}

function cartItemTemplate(item) {
  const productIds = [];
  productIds.push(item.Id);
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${item.Images.PrimaryMedium}" alt="${item.Name}">
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>  
  <p class="cart-card__quantity"><span class="cart-card__remove-item" data-id="${item.Id}">X</span>Qty: ${item.Qty}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  return newItem;
}

function removeProductFromCart() {
  const cartList = document.querySelector(".product-list");
  cartList.addEventListener("click", (event) => {
    if (
      event.target &&
      event.target.classList.contains("cart-card__remove-item")
    ) {
      const productId = event.target.dataset.id;
      let cartUpdated = getLocalStorage("so-cart");

      const indexElement = cartUpdated.findIndex(
        (product) => product.Id === productId,
      );

      if (indexElement !== -1) {
        cartUpdated.splice(indexElement, 1);
        setLocalStorage("so-cart", cartUpdated);
        renderCartContents();
      }
    }
  });
}

renderCartContents();
removeProductFromCart();
