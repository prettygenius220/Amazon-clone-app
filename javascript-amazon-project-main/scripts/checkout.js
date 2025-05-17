import { cart, makeLinkInteractive, renderCartItems, renderDeliveryDate } from "../data/cart.js";
import { calculateSum, calculateShipping, totalB4Tax, estimatedTax, orderTotal, renderOrderSummary } from "./orderSummary.js";
import { toOrderPage } from "../scripts/orderSummary.js";



document.addEventListener('DOMContentLoaded', () => {
  makeLinkInteractive();
  renderCartItems();
})


renderDeliveryDate();
renderOrderSummary();
toOrderPage();









