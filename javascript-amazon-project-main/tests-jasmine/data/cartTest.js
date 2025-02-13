import {
  addToCart,
  cart,
  loadFromStorage,
  updateDeliveryOption,
} from "../../data/cart.js";

describe("test suite: addToCart", () => {
  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
  });
  it("adds a new product to the cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
      // as local storage only supports string so convert obj to string
    });
    // so what we did here is first mocked the fake version and then reloaded the cart
    loadFromStorage();
    // helps to create mock, 1st param is object and second param is string for the methods
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // this only works if it has been mocked with spyOn and to see if localStorage.setItem has been mocked or not

    // check firstProduct in the cart
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6"); // starts with this id
    expect(cart[0].quantity).toEqual(1); // starts with qty=1
  });
});

// starting of cart is from localStorage and it might not be empty
// our test would have passed if the cart was empty from localStorage but it is not so this is called as a
// Flaky Test = test that sometimes passes and sometimes fails

// So we will use Mocks
// it let us replace a method with fake version
