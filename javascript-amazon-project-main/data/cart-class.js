import { validDeliveryOption } from "./deliveryOptions.js";

// inside class we will put method and properties
class Cart {
  cartItems = undefined; // that is the syntax of adding poperties to the class
  localStorageKey; // same declaration as above but shortcut

  // just for param ref but best prac is as below
  // constructor(localStorageKeyConstructorReference) {
  //   this.localStorageKey = localStorageKeyConstructorReference;
  //   this.loadFromStorage();
  // }

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey; // this will point to the object we will create let say object is businessCart then this will point businessCart
    this.loadFromStorage();
  }

  // we dont put , at the end of methods {} (not allowed {},)
  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
    if (!this.cartItems) {
      this.cartItems = [
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
      ];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem; // if we find the matchingitem then it will be an object as cartItem is object and a param name of product object which is a truthy value
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: "1",
      });
    }
    this.saveToStorage(); // as we want outer objects cart's saveToStorage method
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
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
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.quantity = newQuantity;
    this.saveToStorage();
  }
}

// instance of classes
const cart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");

// cart.localStorageKey = "cart-oop";
// businessCart.localStorageKey = "cart-business";

cart.loadFromStorage();
businessCart.loadFromStorage();
console.log(cart); // will display 3 products coz of localStorage store though commented product has been added already
console.log(businessCart);

// we can even check if an object is an instance of a class
console.log(businessCart instanceof Cart);
