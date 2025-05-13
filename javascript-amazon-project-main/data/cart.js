import { products } from "./products.js";

class Cart{
  id;
  quantity;

  constructor(cartItem){
    this.id = cartItem.id;
    this.quantity = cartItem.quantity
  }
}

export const cart = [
{
  id: "5968897c-4d27-4872-89f6-5bcb052746d7",
  quantity: 2
},

{
  id: "aad29d11-ea98-41ee-9285-b916638cac4a",
  quantity: 1
}
].map((cartItem) => {
  return new Cart(cartItem)
})

export function add2Cart(productId){
  let matchingItem;
  cart.forEach((cartItem) => {
    if(cartItem.id === productId){
      matchingItem = cartItem
    }
  });

  if(matchingItem){
  } else{
    cart.push(matchingItem)
  }
  console.log(cart)
  
}
