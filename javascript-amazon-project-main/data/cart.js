import { products } from "./products.js";
import { deliveryOptions } from "./deliveryOption.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'



class Cart{
  id;
  quantity;
  deliveryOptionId;

  constructor(cartItem){
    this.id = cartItem.id;
    this.quantity = cartItem.quantity
    this.deliveryOptionId = cartItem.deliveryOptionId
  }
}

export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart){
  cart = [
{
  id: "5968897c-4d27-4872-89f6-5bcb052746d7",
  quantity: 2,
  deliveryOptionId: '1'
},

{
  id: "aad29d11-ea98-41ee-9285-b916638cac4a",
  quantity: 1,
  deliveryOptionId: '2'
}
].map((cartItem) => {
  return new Cart(cartItem)
})
}

export function getDateTime(){
  const today = dayjs();
  return today;
}

export function add2Cart(productId, selectedQuantity){
  let matchingItem;
  cart.forEach((cartItem) => {
    if(cartItem.id === productId){
      matchingItem = cartItem
    }
  });

  if(matchingItem){
    matchingItem.quantity = Number(selectedQuantity) 
  } else{
    cart.push(
      {
        id: productId,
        quantity: Number(selectedQuantity)
      }
    )
  }  
}

export function save2Storage(){
  localStorage.setItem('cart', JSON.stringify(cart))
};

export function makeLinkInteractive(){
  document.querySelector('.js-items-quantity').innerHTML = `${cart.length} items`;

  document.querySelector('.js-summary-row').innerHTML = `Items (${cart.length})`
};

export function renderCartItems(){
  let html = '';
  let matchingProduct;
  const today = getDateTime();
  cart.forEach((cartItem) => {
    products.forEach((product) => {
      if (product.id === cartItem.id){
        matchingProduct = product;
        html += `
        <div class="cart-item-container" 
        data-cart-id=${cartItem.id}>
            <div class="delivery-date  js-delivery-date" data-cart-id=${cartItem.id}>
              Delivery date:
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${matchingProduct.cents2Dollars()}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete" data-cart-id=${cartItem.id}
                  data-product-id=${matchingProduct.id}>
                    Delete
                  </span>

                  
                </div>
              </div>
                
              </div>
              
            </div>
            <div>${renderDeliveryDate(product.id, cartItem.deliveryOptionId, cartItem.id)} </div>
        </div>
          
        `;
      };
      
    })
    document.querySelector('.js-order-summary').innerHTML = html;   
    getElement();
    
  });
  setUpDeliveryInputListener();
  remove4rmCart()
}

export function renderDeliveryDate(productId, cartdeliveryId, cartId){
  let dateHTML = '';
  let selectedOption;
  const today = getDateTime();
  const tomorrow = today.add(5, 'day').format('dddd MMMM, D');
  deliveryOptions.forEach((deliveryOption) => {
    dateHTML += `
    <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                <div class="delivery-option ">
                  <input type="radio" class="delivery-option-input js-delivery-input"
                    name="delivery-option-${productId}" 
                    data-product-id="${productId}" 
                    data-delivery-id="${deliveryOption.id}"
                    ${cartdeliveryId === deliveryOption.id ? "checked" : '' }>
                  <div>
                    <div class="delivery-option-date">
                     ${today.add(deliveryOption.days, 'day').format('dddd MMMM, D ')}
                    </div>
                    <div class="delivery-option-price">
                    ${deliveryOption.costCents === 0 ? "FREE shipping" :  deliveryOption.cents2Dollars()}
                    </div>
                  </div>
                </div>
    `;
  
    if (cartdeliveryId === deliveryOption.id){
      selectedOption = deliveryOption.days
    }
  }); 
  return dateHTML;  
};


function getElement() {
  document.querySelectorAll('.js-delivery-date').forEach((element) => {
    // Get the product ID from the data attribute of the delivery date element
    const productId = element.getAttribute('data-cart-id');

    // Find the selected radio button for this product
    const selectedInput = document.querySelector(`.js-delivery-input[name="delivery-option-${productId}"]:checked`);

    if (selectedInput) {
      // Get the delivery date from the sibling element of the selected radio button
      const deliveryDate = selectedInput.closest('.delivery-option').querySelector('.delivery-option-date').textContent;

      // Update the delivery date element with the selected delivery date
      element.innerHTML = `Delivery date: ${deliveryDate}`;
    } else {
      // If no option is selected, display a default message
      element.innerHTML = 'Delivery date: Not selected';
    }
  });
};

function setUpDeliveryInputListener() {
  document.querySelectorAll('.js-delivery-input').forEach((element) => {
    element.addEventListener('change', (event) => {
      // Get the product ID from the data attribute of the selected input
      const productId = event.target.getAttribute('data-product-id');

      // Get the selected delivery option ID (value of the radio button)
      const selectedDeliveryOptionId = event.target.getAttribute('data-delivery-id');

      // Update the corresponding cart item's deliveryOptionId
      const cartItem = cart.find((item) => item.id === productId);
      if (cartItem) {
        cartItem.deliveryOptionId = selectedDeliveryOptionId;
      }

      // Save the updated cart to localStorage
      save2Storage();

      // Update the delivery date display
      getElement();

      
      console.log(selectedDeliveryOptionId);
      console.log(cartItem);
    });
  });
};

function remove4rmCart(){
  const newCart = [];
  document.querySelectorAll('.js-delete').forEach((deletelink) => {
    deletelink.addEventListener('click', () => {
      const productId = deletelink.dataset.productId;
      cart.forEach((item) => {
        if(item.id !== productId){
          newCart.push(item);
        };
      });
      cart = newCart;
      save2Storage();
      renderCartItems();
    })
  })
}

