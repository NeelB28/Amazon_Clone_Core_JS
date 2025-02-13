import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

// 2 things to test for orderSummary
// 1. How the page looks
// 2. How the page behaves
describe("test suite: renderOrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
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

    document.querySelector(".js-test-container").innerHTML = ""; // TO MAKE SPACE FOR TEST CODES NOTHING ELSE
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
  });
  document.querySelector(".js-test-container").innerHTML = ""; // TO MAKE SPACE FOR TEST CODES NOTHING ELSE
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
