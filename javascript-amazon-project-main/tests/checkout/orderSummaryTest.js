import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { renderPaymentSummary } from "../../scripts/checkout/paymentSummary.js";
import { loadProducts } from "../../data/products.js";

// 2 things to test for orderSummary
// 1. How the page looks
// 2. How the page behaves
describe("test suite: renderOrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  beforeAll((done) => {
    loadProducts(() => {
      done();
    }); // still tests fail and here loadproducts is async that means it just sends request to the backend but does not wait for the responses to come and so continue with the rest of the task code; unfortunalety yet response is not back and so products is still and empty array so to fix this issue we need to wait for load products to finish first and for this JASMINE provides a function called done which waits for a task to get complete/done
  });
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    document.querySelector(
      ".js-test-container"
    ).innerHTML = `<div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
    <div class="js-checkout-header"></div>`;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
        // deduplicating or normalising the data as we can product from id itself
      ]);
    });
    loadFromStorage();
    renderOrderSummary();
  }); // beforeEach hook

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = ""; // TO MAKE SPACE FOR TEST CODES NOTHING ELSE
  });

  it("displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2"); // inner value checking
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1"); // inner value checking
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual("Intermediate Size Basketball");
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toEqual("$10.90");
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual("$20.95");
  });

  it("removes a product", () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();
    // so after we delete we expect only 1 product in the cart that is what we will do in expect.toEqual(1) for the quantity in js-cart-item-container
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );
    // let's check if the product 1 is no longer in the page
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    // and also check if the product 2 (basketball) is in the page where it is not equal to null
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    // so one more to thing that if the cart array is updated or not after del
    // i.e. product1 id removed then it should have product2 id matching in the remaining cart array
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
    // as removeFromCart evokes localStorage so to avoid the flaky test in our tests we need to mock localStorage (recommended not to modift localStorage)
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual("Intermediate Size Basketball");
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual("$20.95");
  });

  it("updates the deliverey option: ", () => {
    document.querySelector(`.js-delivery-option-${productId1}-3`).click(); // product1-3 option it is click()/ed or not

    expect(
      document.querySelector(`.js-delivery-option-input-${productId1}-3`)
        .checked
    ).toEqual(true); // expect it to be equal to true; simple english terms

    expect(cart.length).toEqual(2); // only two products in spyOn and we are updating the qty not adding new products so total cart qty should be 2
    expect(cart[0].productId).toEqual(productId1); // check if productId1 matches first product in cart array
    expect(cart[0].deliveryOptionId).toEqual("3"); // similarly checking deliveryOptionId in cart array
    expect(
      document.querySelector(".js-payment-summary-shipping").innerText
    ).toEqual("$14.98"); // for 3rd deliver option only we are verifying
    expect(
      document.querySelector(".js-payment-summary-total").innerText
    ).toEqual("$63.50"); // for 3rd deliver option only we are verifying
  });
});

// So this is an integration Test = tests many units/pieces of code working together

// now where does the orderSummary is getting displayed; i.e. in js-order-summary
// so we will create a class in test.html and will display test case there
// again it is from localStorge and so we need to create a mock

// it will not load images so it is okay
// yellow dots below jasmine shows if that test has any expectations or not

// lastly we will run a shortcut that we can use in JASMINE and that is HOOKS
// let us run some code for each test & we can share the code

// HOOKS in JASMINE
// beforeEach() = run code before each test
// afterEach() = run code after each test
// beforeAll() = run code before all tests
// afterEach() = run code after all tests
