import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || "no items";

  const cartFooter = document.querySelector(".cart-footer");
  if (cartItems === "no items") {
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
    (total, item) => total + item.FinalPrice,
    0,
  );
  const cartTotalElement = document.querySelector(".cart-total");
  cartTotalElement.insertAdjacentHTML("beforeend", totalCartValue.toFixed(2));
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${item.Images.PrimaryMedium}" alt="${item.Name}">
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
