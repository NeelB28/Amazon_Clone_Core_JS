// reason we created this is to keep code cleaner

// How do we know which product to add?
// For that we will learn about data attribute
// Data attribute is a way to store data in HTML elements which is another HTML attribute
// allows us to attach any info to an element
// name = value
// data-name = "value"
// it has to start with data-xyz (kebab-case format)
// so data-name will help to attach the name, price etc to the button element using data attributes

export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
  // deduplicating or normalising the data as we can product from id itself
];
// now this variable can be used outside cart.js
export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem; // if we find the matchingitem then it will be an object as cartItem is object and a param name of product object which is a truthy value
      console.log("fhbkhsdbfvfk" + matchingItem);
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
}

// two ways to remove from cart
// 1. Create an Array
// 2. Loop through the cart
// 3. Find the item with the matching product id and add each profuct to the new array except for the matching id
