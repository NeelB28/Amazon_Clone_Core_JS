// reason we created this is to keep code cleaner

// How do we know which product to add?
// For that we will learn about data attribute
// Data attribute is a way to store data in HTML elements which is another HTML attribute
// allows us to attach any info to an element
// name = value
// data-name = "value"
// it has to start with data-xyz (kebab-case format)
// so data-name will help to attach the name, price etc to the button element using data attributes

//here we will intially get the item cart from the local storage which we set below
// in add to cart and remove from cart fucntion
// now getItem will only take one string "name which to be accessed" and is of string type from localStorage but here let cart is an object so convert it first to object using JSON.parse();
import { validDeliveryOption } from "./deliveryOptions.js";
export let cart;
loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
      },
      // deduplicating or normalising the data as we can product from id itself
    ];
    // now this variable can be used outside cart.js
  }
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
// setItem takes two string 1. is the name of String where 2. the data we will be stored here we wat to store cart which is object so stringify it using json.stringify

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem; // if we find the matchingitem then it will be an object as cartItem is object and a param name of product object which is a truthy value
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

// two ways to remove from cart
// 1. Create an Array
// 2. Loop through the cart
// 3. Find the item with the matching product id and add each profuct to the new array except for the matching id

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity = newQuantity;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  if (!matchingItem) {
    return;
  }
  if (!validDeliveryOption(deliveryOptionId)) {
    return;
  }

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
