import { convertToJson } from "./utils.mjs";


const baseURL = import.meta.env.VITE_SERVER_URL




export default class ProductData {
  constructor() {
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category} `);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
