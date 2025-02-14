import { formatCurrency } from "../../scripts/utils/money.js";

describe("test suite: format currency", () => {
  it("convert cents into dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });
  it("works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("rounds up to the nearest cent", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01"); // coz divide by 100 first ~ 20.005 and then round ~ 20.01 {.5+ -> 1.}
  });
  it("rounds down to the nearest cent", () => {
    expect(formatCurrency(2000.4)).toEqual("20.00");
  });
  it("works with negtive number", () => {
    expect(formatCurrency(-1000)).toEqual("-10.00");
  });
});
// describe() creates a test suite "name"
// it() create a test
// expect() let us compare one value to another value
// to compare it to another value except object provide many methods
