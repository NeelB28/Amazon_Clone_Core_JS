import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import "../data/cart-oop.js"; // this just runs all the code inside this file without importing anything & that is what we need in this situation

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();
