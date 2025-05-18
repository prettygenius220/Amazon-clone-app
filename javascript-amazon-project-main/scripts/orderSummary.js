import { cents2Dollars } from "./utils/money.js";
import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOption.js";

export function calculateSum(){
  let totalArray = [];
  let total = 0;
  let totalSumConverted = '';
  cart.forEach((cartItem) => {
    products.forEach((productItem) => {
      if(cartItem.id === productItem.id){
        const cartitemPrice = productItem.priceCents * cartItem.quantity;
        totalArray.push(cartitemPrice);
        for (let i = 0; i < totalArray.length; i++){
          total += totalArray[i]
        }        
        totalSumConverted = cents2Dollars(total)
      }
    })
  });
  document.querySelector('.js-quantity-total').innerHTML = `$${totalSumConverted}`
  return Number(totalSumConverted)
};

export function calculateShipping(){
  let totalArray = [];
  let totalShipping = 0;
  let totalShippingConverted = 0;
  cart.forEach((cartItem) => {
    deliveryOptions.forEach((deliveryOption) => {
      if(cartItem.deliveryOptionId === deliveryOption.id){
        const cartitemShipping = deliveryOption.costCents;
        totalShipping += cartitemShipping;
        totalShippingConverted = cents2Dollars(totalShipping);
      }
  })
  });
  document.querySelector('.js-shipping').innerHTML = `$${totalShippingConverted}`
  return Number(totalShippingConverted)
}


export function totalB4Tax(){
  const totalSum = calculateSum();
  const shipping = calculateShipping();
  const total = totalSum + shipping;
  document.querySelector('.js-before-tax').innerHTML = `$${total}`
  return Number(total)
}

export function estimatedTax(){
  const total = totalB4Tax();
  const percent = 0.1 * total;
  const estimatedTax = cents2Dollars(percent);
  document.querySelector('.js-tax').innerHTML = `$${estimatedTax}`;
  return Number(estimatedTax)
}

export function orderTotal(){
  const total = totalB4Tax();
  const tax = estimatedTax();
  const orderTotal = total + tax;

  document.querySelector('.js-money-total').innerHTML = `$${(orderTotal).toFixed(2)}`;
  return orderTotal;
}

export function renderOrderSummary(){
  calculateSum();
  calculateShipping();
  totalB4Tax();
  estimatedTax();
  orderTotal();
};

export function toOrderPage(){
  document.querySelector('.js-order-button').addEventListener('click', () => {
    sendOrderRequest().then(() => {
      const cartIds = cart.map((item) => item.id);
      const queryString = `?ids=${cartIds.join(',')}`;
      window.location.href = `orders.html${queryString}`
      })    
  })
}

async function sendOrderRequest(){
  const cartIds = cart.map((item) => item.id).join(',');
  const webhookUrl = `https://hook.us1.make.com/m09k6cpu6zrwsx9tnhoi7165xvv6tvwh?ids=${cartIds}`;
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({cart: cart})
    });

    return order;
  }

  catch(error){
   console.log('Try again later')
  }
}