/// import { cart as Mycart } from "../data/cart.js";

import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
// we need to get out of scripts folder from amazon.js and thus use ..

//const cart = []; // now website won't work coz of naming conflicts but now we have atleast a control from where we are getting this conflict

// to avoid this conflict we can import cart of cart.js as some different variable name such cart as myCart

// First, get a var out of a file
// 1. Add type = "module" attribute
// 2. Import
// 3. Export

// Main idea of js
// 1. SAVE THE DATA
// 2. GENERATE THE INNERHTML
// 3. MAKE IT INTERACTIVE

// We will use objects to group multiple values together

// const products = [
//   {
//     image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//     name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//     rating: {
//       stars: 4.5,
//       count: 87,
//     },
//     priceCents: 1090, // caluctate in cents for better call instead of 10.90
//   },
//   {
//     image: "images/products/intermediate-composite-basketball.jpg",
//     name: "Intermediate Composite Basketball",
//     rating: {
//       stars: 4,
//       count: 127,
//     },
//     priceCents: 2095, // calculate in cents for better call instead of 15
//   },
//   {
//     image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
//     name: "Adults Plain Cotton T-Shirt 2-Pack Teal",
//     rating: {
//       stars: 4.5,
//       count: 56,
//     },
//     priceCents: 799, // calculate in cents for better call instead of 12
//   },
//   {
//     image: "images/products/black-2-slot-toaster.jpg",
//     name: "2 Slot Toaster - Black",
//     rating: {
//       stars: 5,
//       count: 2197,
//     },
//     priceCents: 1899,
//   },
// ];
// commented as importing from data folder

// So now we will generate the inner html and for that we will use for each for our array and to avoid boiler plate/repetitive code we will add ${} in foreach and use single time html
let productsHTML = "";

products.forEach((product) => {
  productsHTML += `<div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        ${product.extraInfoHTML()} <!-- Polmorphism it will decide on its own what to method to take for which class-->
        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>`;
});

//  add aa variable at the top to combine all the html together into one string and variable to combine all strings

// Now the last step is to take this html and put it on the webpage (using dom)

// first put html element in js and replace it

document.querySelector(".js-products-grid").innerHTML = productsHTML;

// Now last step is to make it interactive

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();

  // console.log(cartQuantity);
  // use the dom to put it in webpage
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity || "";

  // console.log(cart);
}
updateCartQuantity();
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    // for each ka fn fir click pr fn
    // so basically .dataset will help us to get all the attributue attached to button on click
    // console.log(button.dataset);
    // console.log(button.dataset.productName);
    const productId = button.dataset.productId;

    // steps
    // check if the product is already in the cart: 1 way is too loop through the cart
    // if it is in the cart then increase the qty
    // if it is not in the cart then add it to the cart
    addToCart(productId);
    updateCartQuantity();
  });
});
