import { loadHeaderFooter, updateCartCount } from "./utils.mjs";

loadHeaderFooter().then(() => {
  updateCartCount();
});

