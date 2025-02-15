import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import "../data/cart-oop.js"; // this just runs all the code inside this file without importing anything & that is what we need in this situation to run only this in console
// import "../data/cart-class.js";
// import "../data/17-exercise-car.js";
// import "../data/backend-practice.js";

// one more feature of Promise is that we can run mutliple promises at the same time
// we can use Promise.all() to run multiple promises at the same time
// Promise.all() returns a promise that resolves when all of the promises in the array have resolved, i.e. wait for all of them to finish
// if any of the promises in the array reject, then Promise.all() will reject immediately

Promise.all([
  loadProductsFetch(), // it will make our code cleaner as fetch returns promise only and we don't need to write extra code as below

  // new Promise((resolve) => {
  //   loadProducts(() => {
  //     resolve("value1"); // so whatever we are going to give in resolve is going to be save in a parameter inside .then
  //   });
  // }) // now commenting this promise coz using fetch and it returns promise only

  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then((values) => {
  console.log(values); // "value1", undefined because second promise does not have any value passed to it
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve("value1"); // so whatever we are going to give in resolve is going to be save in a parameter inside .then
  });
})
  .then((value) => {
    console.log(value); // this is going to run after loadProducts is done and will display "value1"
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
  */
// resolve makes it go to the next step and helps us control when to go to the next step
// these and blow group of code are running at the same time
// the reason Promises are designed this way is coz it allows js to do multipple things at the same time
// when we create a promise it runs the inner function in it immmediately
// inside Promise there is one more function that is 'resolve' [which is a function again]
// similar to done() function of JASMINE
// let us control when to go to the next step

// loadProducts(() => {
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// });
// here we gave loadProducts a callback using anonymous fn ()=>{} without a name
// here ()=>{unanamed function only so we will call other three functions only when loadProducts is executed that means when products gets loaded}
// so thats how we use a backend our project we need to send a request and then use a call back to wait for a response and then run the rest of our code
