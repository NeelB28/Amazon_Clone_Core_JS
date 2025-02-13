import { formatCurrency } from "../../scripts/utils/money.js";

describe("test suite: format currency", () => {
  it("convert cents into dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });
  it("works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("rounds up to the nearest cent", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
});
// describe() creates a test suite "name"
// it() create a test
// expect() let us compare one value to another value
// to compare it to another value except object provide many methods
