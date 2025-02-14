import { validDeliveryOption } from "./deliveryOptions.js";

// object and inside obj we cant use export
// export let cart: shortcut for export let cart = undefined;

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
    // avoid confusion let us defined cart.cart let us rename to cartItems
    //loadFromStorage: function () {
    // make sure to use normal function calling and not => fn coz fn inside object is a method
    // shortcut of above
    // this will give access to outer object
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
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
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

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
    },

    removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
      this.saveToStorage();
    },

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
    },

    calculateCartQuantity() {
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      return cartQuantity;
    },

    updateQuantity(productId, newQuantity) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingItem = cartItem;
        }
      });
      matchingItem.quantity = newQuantity;
      this.saveToStorage();
    },
  };

  return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");
cart.loadFromStorage();
businessCart.loadFromStorage();
console.log(cart); // will display 3 products coz of localStorage store though commented product has been added already
console.log(businessCart);

// cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
// console.log(cart);

// const businessCart = {
//   cartItems: undefined,
//   // avoid confusion let us defined cart.cart let us rename to cartItems
//   //loadFromStorage: function () {
//   // make sure to use normal function calling and not => fn coz fn inside object is a method
//   // shortcut of above
//   // this will give access to outer object
//   loadFromStorage() {
//     this.cartItems = JSON.parse(localStorage.getItem("cart-business"));
//     if (!this.cartItems) {
//       this.cartItems = [
//         {
//           productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//           quantity: 2,
//           deliveryOptionId: "1",
//         },
//         {
//           productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//           quantity: 1,
//           deliveryOptionId: "2",
//         },
//       ];
//     }
//   },

//   saveToStorage() {
//     localStorage.setItem("cart-business", JSON.stringify(this.cartItems));
//   },

//   addToCart(productId) {
//     let matchingItem;
//     this.cartItems.forEach((cartItem) => {
//       if (cartItem.productId === productId) {
//         matchingItem = cartItem; // if we find the matchingitem then it will be an object as cartItem is object and a param name of product object which is a truthy value
//       }
//     });

//     if (matchingItem) {
//       matchingItem.quantity += 1;
//     } else {
//       this.cartItems.push({
//         productId: productId,
//         quantity: 1,
//         deliveryOptionId: "1",
//       });
//     }
//     this.saveToStorage(); // as we want outer objects cart's saveToStorage method
//   },

//   removeFromCart(productId) {
//     const newCart = [];
//     this.cartItems.forEach((cartItem) => {
//       if (cartItem.productId !== productId) {
//         newCart.push(cartItem);
//       }
//     });
//     this.cartItems = newCart;
//     this.saveToStorage();
//   },

//   updateDeliveryOption(productId, deliveryOptionId) {
//     let matchingItem;
//     this.cartItems.forEach((cartItem) => {
//       if (cartItem.productId === productId) {
//         matchingItem = cartItem;
//       }
//     });
//     if (!matchingItem) {
//       return;
//     }
//     if (!validDeliveryOption(deliveryOptionId)) {
//       return;
//     }

//     matchingItem.deliveryOptionId = deliveryOptionId;
//     this.saveToStorage();
//   },

//   calculateCartQuantity() {
//     let cartQuantity = 0;
//     this.cartItems.forEach((cartItem) => {
//       cartQuantity += cartItem.quantity;
//     });
//     return cartQuantity;
//   },

//   updateQuantity(productId, newQuantity) {
//     let matchingItem;
//     this.cartItems.forEach((cartItem) => {
//       if (cartItem.productId === productId) {
//         matchingItem = cartItem;
//       }
//     });
//     matchingItem.quantity = newQuantity;
//     this.saveToStorage();
//   },
// };
