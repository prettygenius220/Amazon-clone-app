import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { orderTotal } from "./orderSummary.js";
import { deliveryOptions } from "../data/deliveryOption.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
renderorderItems();


function getOrders(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const cartItemIds  = urlParams.get('ids')?.split(',');
  return cartItemIds;
}

function renderorderItems() {
  let orderDetailsHTML = '';
  const cartItemIds = getOrders();
  const today = dayjs();
  cartItemIds.forEach((itemId) => {
    // Find the matching cart item
    const matchingCart = cart.find((cartItem) => cartItem.id === itemId);
    const itemdeliveryOptionId = matchingCart.deliveryOptionId;
    const deliveryOption = deliveryOptions.find((deliveryOption) => deliveryOption.id === itemdeliveryOptionId)
    
    if (matchingCart) {
      // Find the matching product
      const matchingProduct = products.find((product) => product.id === matchingCart.id);

      if (matchingProduct) {
        // Generate the HTML for the order item
        orderDetailsHTML += `
        <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${today.format('MMMM D, YYYY')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${matchingProduct.cents2Dollars()* matchingCart.quantity}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${matchingProduct.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            <div class="product-image-container">
              <img src=${matchingProduct.image}>
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on:${today.add(deliveryOption.days, 'day').format('MMMM D, YYYY')}
              </div>
              <div class="product-quantity">
                Quantity:${matchingCart.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
        `;
      }
    }
  });

  // Update the DOM with the generated HTML
  const orderDetailsContainer = document.querySelector('.js-container');
  if (orderDetailsContainer) {
    orderDetailsContainer.innerHTML = orderDetailsHTML;
  }

  console.log(orderDetailsHTML); // Debugging
}
