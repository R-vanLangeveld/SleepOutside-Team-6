import { getLocalStorage, setLocalStorage, getDiscount, updateCartCount } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
    this.updateCartCountDisplay(); // Muestra el conteo actual al cargar
  }

  addProductToCart() {
    let j = 0;
    let inList = false;
    let itemIndex = 0;
    const array = { Qty: 1 };
    const cartItems = getLocalStorage("so-cart") || [];
    const baseLength = cartItems.length;

    if (baseLength !== 0) {
      do {
        for (let n = 0; n < cartItems.length; n++) {
          if (this.product.Id === cartItems[n].Id) {
            itemIndex = n;
            inList = true;
          }
        }
        j += 1;
      } while (j <= baseLength - 1);

      if (!inList) {
        cartItems.push(Object.assign(this.product, array));
      } else {
        cartItems[itemIndex].Qty += 1;
      }
    } else {
      cartItems.push(Object.assign(this.product, array));
    }

    setLocalStorage("so-cart", cartItems);
    document.querySelector("svg").classList.add("new-in-cart");

    updateCartCount(); // 👈 Actualiza el contador después de agregar
  }

  renderProductDetails() {
    productDetailsHTML(this.product);
  }
}

// Este bloque lo puedes dejar como está:
function productDetailsHTML(product) {
  document.querySelector("h3").textContent = product.Brand.Name;
  document.querySelector("h2").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById("retail-price").innerHTML =
    `<span>Retail Price:</span> <span>$${product.SuggestedRetailPrice}</span>`;
  document.getElementById("discount").innerHTML =
    `<span>You save:</span> <span>${getDiscount(product.SuggestedRetailPrice, product.FinalPrice)}%</span>`;
  document.getElementById("price").innerHTML =
    ` <span>Now:</span> $${product.FinalPrice}`;
  document.getElementById("color").innerHTML = product.Colors[0].ColorName;
  document.getElementById("description").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}
