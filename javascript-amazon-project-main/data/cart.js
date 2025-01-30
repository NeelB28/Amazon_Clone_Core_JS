// reason we created this is to keep code cleaner

// How do we know which product to add?
// For that we will learn about data attribute
// Data attribute is a way to store data in HTML elements which is another HTML attribute
// allows us to attach any info to an element
// name = value
// data-name = "value"
// it has to start with data-xyz (kebab-case format)
// so data-name will help to attach the name, price etc to the button element using data attributes

export const cart = [];
// now this variable can be used outside cart.js
export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem; // if we find the matchingitem then it will be an object as item is object and a param name of product object which is a truthy value
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
