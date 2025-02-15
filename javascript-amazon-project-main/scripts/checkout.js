import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
//import "../data/cart-oop.js"; // this just runs all the code inside this file without importing anything & that is what we need in this situation to run only this in console
// import "../data/cart-class.js";
// import "../data/17-exercise-car.js";
// import "../data/backend-practice.js";
loadProducts(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
// here we gave loadProducts a callback using anonymous fn ()=>{} without a name
// here ()=>{unanamed function only so we will call other three functions only when loadProducts is executed that means when products gets loaded}
// so thats how we use a backend our project we need to send a request and then use a call back to wait for a response and then run the rest of our code
