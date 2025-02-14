import {
  addToCart,
  cart,
  loadFromStorage,
  removeFromCart,
  updateDeliveryOption,
} from "../../data/cart.js";

describe("test suite: addToCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });
  it("adds an existing product to the cart", () => {
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
    // to check if setItem recieved the correct values
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
      ])
    );
  });
  it("adds a new product to the cart", () => {
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
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ])
    );
  });
});

describe("test suite: removeFromCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });
  it("remove a product from the cart", () => {
    // for localStorage we are creating a fake call of a product basketball
    // and test it on the cart rn coz of spyOn only product in the cart
    // so length of cart should be zero after removal of product
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();
    removeFromCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // above in beforeEach; yes or no it has been called to check that
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([])
    ); // coz after removal it should be set to empty too i.e. the cart looks correct or not
    // to check that after removal it has been called empty or not
  });

  it("does nothing if product is not in the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        }, // now again fetching.getItem a product of our choice from the cart for testing
        // in solution SuperSimpleDev has used "socks" example
      ]);
    });
    loadFromStorage();
    // removeFromCart("does-not-exist"); // to write an id which might not exist
    removeFromCart("15b6fc6f-327a-4ec4-896f-doesnotexist"); // can use does-not-exist as an id too coz collection of char only
    expect(cart.length).toEqual(1); // length stays as it is coz product does not exist
    expect(cart[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]) // because the productId entered in removeFromCart("15b6fc6f-327a-4ec4-896f-doesnotexist") does not exist
      // so it/cart should be again called with the existing product in it
    );
  });
});

describe("test suite: updateDeliveryOption", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        }, // made a faake cart with only basketball product to test
      ]);
    });
  });
  it("update the delivery option of a product in the cart", () => {
    loadFromStorage();
    updateDeliveryOption("15b6fc6f-327a-4ec4-896f-486349e85a3d", "3"); // by default 2 was selected in the initalisation but we are updating deliverOptionId: 3; if no error then test passed as simple as that

    // to check if cart looks correct; then: total product in the cart should be 1;
    // id of basketball as it is mocked, deliveryOptionId: 3 as it is being updated
    // and qty as it is 1 as no update made up there;
    expect(cart.length).toEqual(1); // only one fake/mock product in the cart
    expect(cart[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(cart[0].quantity).toEqual(1); // note if ids/string then only "" 0therwise for qty no ""; if we write "" for qty then error
    expect(cart[0].deliveryOptionId).toEqual("3");

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "3",
        }, // made a fake cart with only basketball product to test
      ])
    );
  });

  it("does nothing if the product is not in the cart", () => {
    loadFromStorage();
    // edge case test where we check if the productId is not in the cart then nothing should happend and check setItem was not called

    updateDeliveryOption("15b6fc6f-327a-4ec4-896f-doesnotexit", "3"); // nothing should happen
    // Just to check if cart stays as it is and it should not alter it
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual("2");

    expect(localStorage.setItem).toHaveBeenCalledTimes(0); // as does not exist so should not be called
  });

  it("does nothing if the delivery option does not exist", () => {
    loadFromStorage();

    updateDeliveryOption(
      "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      "5-does-not-exist"
    ); // for delivery-option to not exist not about the product
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual("2");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});

// starting of cart is from localStorage and it might not be empty
// our test would have passed if the cart was empty from localStorage but it is not so this is called as a
// Flaky Test = test that sometimes passes and sometimes fails

// So we will use Mocks
// it let us replace a method with fake version

// until now it was 1 unit test check
// now we want to test multiple things at a time; integration test: multiple unit test (uses many diff pieces of code together)

// expect() has another method we can use expect(localStorage.setItem).toHaveBeenCalledWith("cart","[]")
// checks if the code called localStorage.setItem("cart", "[]") at some point.
