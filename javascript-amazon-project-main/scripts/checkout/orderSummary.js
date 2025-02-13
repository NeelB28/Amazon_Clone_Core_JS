import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js"; // {xyx} : named export
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js"; //single dot for subfolder
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; // this is default export and we can use it when we want to export only 1 thing
// each file can have only 1 default export
import {
  calculateDeliveryDate,
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

hello();
// console.log(dayjs());
// Calculate Delivery dates
// 1. Get today's date
// 2. Do Calculation (add 7 days)
// 3. Display the date in easy to read format

// const today = dayjs();
// const deliveryDate = today.add(7, "day");
// deliveryDate.format("dddd, MMMM D");

// 1. Get the delivery option object from the deliveryOptions array
// 2. Use the deliveryOptionId to find the correct delivery option
// 3. Store the delivery option in the deliveryOption variable

export function renderOrderSummary() {
  let cartSummaryHTML = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const dateString = calculateDeliveryDate(deliveryOption);

    // Now we need to make it interactive
    // 1. Update deilveryOptionId in the cart
    // 2. Update the page

    cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image" src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                $${formatCurrency(
                  matchingProduct.priceCents
                )} <!-- type of utility function to format the price so we will add it to the utils folder under scripts folder -->
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${
                      matchingProduct.id
                    }">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                    matchingProduct.id
                  }">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${
                    matchingProduct.id
                  }">
                  <span class="save-quantity-link link-primary js-save-link" data-product-id="${
                    matchingProduct.id
                  }">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                    matchingProduct.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
  `;
  });

  // now all the html for this squares is inside the class order-html and so we will replace the order-sumary html with cartsummaryhtml

  // now after ch-14 for delivery option: instead of writing html manually for delivery options we will generate it using javaScript
  // we will create a function that will generate the delivery option html for us

  // Steps
  // 1. Loop through delivery options
  // 2. For each delivery option, generate some html
  // 3. Combine the html pages

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE Shipping"
          : `$${deliveryOption.priceCents / 100} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `<div class="delivery-option js-delivery-option"
                  data-product-id="${matchingProduct.id}"
                  data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio" 
                  ${isChecked ? "checked" : ""}
                  class="delivery-option-input" name="delivery-option-${
                    matchingProduct.id
                  }">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>`;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      // how do we remove so make an function in cart.js

      removeFromCart(productId);
      // const container = document.querySelector(
      //   `.js-cart-item-container-${productId}`
      // );
      // container.remove();

      // so to delete the product we will use data-attribute of html so that we can get the data-attribute in the js

      // how to remove?
      // 1. use the dom to get the element to remove
      // 2. use .remove() method
      renderOrderSummary();
      renderPaymentSummary();
      renderCheckoutHeader();
      updateCartQuantity();
    });
  });
  // () => a passed fucntion notation to avoid names
  // (link) => a passed function with parameter in it
  // link.addEventListener("click", () = > {}) // where "click" is param1 which is of type String and () => {} is param2 which is of type function

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
  }

  updateCartQuantity();

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove("is-editing-quantity");
      const quantityInput = container.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(quantityInput.value);
      if (newQuantity <= 0 || newQuantity >= 1000) {
        alert("Quantity should be between 1 and 1000");
        return;
      }
      updateQuantity(productId, newQuantity);

      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = newQuantity;
      updateCartQuantity();
      renderPaymentSummary();
      renderCheckoutHeader();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset; // shorthand property
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary(); // recurssion
      renderPaymentSummary();
    });
    // Update delivery option in the cart and update the page
    // To access productId and deliveryOptionId we can go to html variable string and use data-attribute inside the html written in delivery option because there we have both the ids
  });
}

// MVC: MODEL-VIEW-CONTROLLER
// 1. Update the data
// 2. Regenrate all the HTML = MVC

// In MVC we split our code into three parts
// 1. Model = saves and manages the data; data folder
// 2. View = takes the data and dsipalys it on the page; checkout.js part cartsummary
// 3. Controller = runs some code when we interact with the page; like eventListeners of checkout.js

// MVC makes sure the page always matches the data
// MVC is a design pattern; jmany avascript frameworks are based on mvc

// Where should we use ${matchingProduct.id} as class and where as data-product-id?

// when you don't know the product ID, but need a way to identify the product, have the element you need to call hold the data-product-id so you can know which product is linked to that element. je element ne bolavo che ene data product id api do to kam thai jse

// ex: We don't know our product ID, but every item in the cart has a delete link, so we query all of them, so we have every delete link hold a copy of the productID (data-product-id) to tell us which product that button is linked to. Now we can use that product ID to know which product we want to delete from the cart when clicking delete.

// When you know the product ID already, but need a way to get the element linked to that productID use ${matchingProduct.id} in the element class.

// ex: we get the product ID from the saveLink because the saveLink has the productId saved to it already(data-product-id, because of what I described above), we want to access the js-quantity-input but every item in the cart has this input element so how can we know which one we need? Let's just use the productID that we have already and add ${matchingProduct.id} to the class name and we can directly grab our input element.

// Technically yes, you could have the js-quantity-input hold the productID with data-product-id, and we can do a query all and run a foreach to iterate through all these quantity input elements, trying to match the productID we have to the productID that the input element contains but this would be incredibly inefficient because we already have the ID. Why waste time checking every single item in the cart when we can go straight to it.

// Hope this explanation helps

// Disadvantage of Manual Testing
// 1. Hard to test every situation
// 2. Hard to re-test

// For that we have automated testing = using code to test the code
