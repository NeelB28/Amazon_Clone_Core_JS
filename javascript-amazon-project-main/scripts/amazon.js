// Main idea of js
// 1. SAVE THE DATA
// 2. GENERATE THE INNERHTML
// 3. MAKE IT INTERACTIVE

// We will use objects to group multiple values together

const products = [
  {
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: 1090, // caluctate in cents for better call instead of 10.90
  },
  {
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Composite Basketball",
    rating: {
      stars: 4,
      count: 127,
    },
    priceCents: 2095, // calculate in cents for better call instead of 15
  },
  {
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt 2-Pack Teal",
    rating: {
      stars: 4.5,
      count: 56,
    },
    priceCents: 799, // calculate in cents for better call instead of 12
  },
];

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
          <img class="product-rating-stars" src="images/ratings/rating-${
            product.rating.stars * 10
          }.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${(product.priceCents / 100).toFixed(2)}
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

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary">
          Add to Cart
        </button>
      </div>`;
});
console.log(productsHTML);

//  add aa variable at the top to combine all the html together into one string and variable to combine all strings

// Now the last step is to take this html and put it on the webpage (using dom)

// first put html element in js and replace it

document.querySelector(".js-products-grid").innerHTML = productsHTML;
