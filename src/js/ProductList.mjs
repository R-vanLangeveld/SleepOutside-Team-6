import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  let discount = "";
  if (product.FinalPrice < product.SuggestedRetailPrice) {
    discount = `<p class="product-card__price">Discount: -$${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)}</p> `;
  }

  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="${product.Name}"/>
      <h2 class="card__name">${product.Brand.Name}</h2>
      <h3 class="card__brand">${product.Name}</h3>
      ${discount}
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}