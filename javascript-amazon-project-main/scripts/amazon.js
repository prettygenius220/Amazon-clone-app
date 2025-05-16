import { products } from "../data/products.js";
import { cart, add2Cart, save2Storage } from "../data/cart.js";


renderCartQuantity();
//make the cart quantity in the header dynamic

function renderCartQuantity(){
  document.querySelector('.js-cart-quantity').innerHTML = cart.length
}

const timeoutIds = {}; // Object to store timeout IDs for each product

function renderAdded(productId) {
  // Find all elements with the class `.js-added`
  document.querySelectorAll('.js-added').forEach((element) => {
    const elementProductId = element.dataset.productId;

    // Check if the current element matches the given productId
    if (elementProductId === productId) {
      // Make the element visible
      element.classList.add('visible');

      // Clear any existing timeout for this product
      if (timeoutIds[productId]) {
        clearTimeout(timeoutIds[productId]);
      }

      // Set a new timeout for this product
      timeoutIds[productId] = setTimeout(() => {
        element.classList.remove('visible'); // Hide the element
        delete timeoutIds[productId]; // Clean up the timeout ID
      }, 2000);
    }
  });
}


//generate html for each product
function renderHTML(){
  let html = '';
  products.forEach((product) => {
    html += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.cents2Dollars()}
          </div>

          <div class="product-quantity-container">
            <select class="js-select" data-product-Id="${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="js-link">${product.renderClothingLink()}</div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added" data-product-id="${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`
})

document.querySelector('.js-homepage-mother').innerHTML = html;

document.querySelectorAll('.js-add-to-cart').forEach((buttonElement) => {
  buttonElement.addEventListener('click', () => {
    const productId = buttonElement.dataset.productId;
    const selectedQuantity = document.querySelector(`.js-select[data-product-id="${productId}"]`).value;
    add2Cart(productId, selectedQuantity);
    save2Storage();
    document.querySelector('.js-cart-quantity').innerHTML = `${cart.length}`;
    renderAdded(productId);
  })
});

};




renderHTML();


//console.log(products)
