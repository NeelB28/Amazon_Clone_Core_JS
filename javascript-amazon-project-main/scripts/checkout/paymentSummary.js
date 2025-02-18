import { cart, calculateCartQuantity, resetCart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";
// save data, generate html, make interactive
// Loop through the cart, for each product, price*quantity
// Add everything together

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  // console.log(productPriceCents);
  // console.log(shippingPriceCents);

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(
              productPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-payment-summary-shipping">$${formatCurrency(
              shippingPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalBeforeTaxCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              taxCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-payment-summary-total">$${formatCurrency(
              totalCents
            )}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
    `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          // will wait to get the link and then go to the next line
          method: "POST",
          // headers are present in network section of inspect page
          // headers gives the backend more info about our request
          headers: {
            "Content-Type": "application/json", // it says what type of data we are sending it json so ultimately cart onject
          },
          body: JSON.stringify({
            // cart object is the data we are sending to backend
            cart: cart,
          }),
        }); // we need send our cart to backend to create order
        // so there are 4 types of requests; so we will use one of them; here POST will be use to send the data to backend and GET is recieving data and sending request
        const order = await response.json();
        // we are sending the data to backend and we are getting the order back
        // so we are going to redirect to order page
        addOrder(order);
        console.log(order);
      } catch (error) {
        console.log("Unexpected error. Try again later.");
      }
      resetCart();
      window.location.href = "orders.html"; // is special obj by js let us control url at the top of the browser
      // if we change the location of obj it will change the url
      // http://127.0.0.1:5502/javascript-amazon-project-main/ here after / abpve window.lock will come and url will be different
    });
}
