import { formatCurrency } from "../../scripts/utils/money.js";

// 2 Types of Test Cases
// 1. Basic test cases = test if the code is working or not
// 2. Edge cases = tests with values that are tricky
// Try to test something different in each test cases

console.log("test suite: formatCurrency");

console.log("convert cents into dollars");

if (formatCurrency(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("works with 0");

if (formatCurrency(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("rounds up to the nearest cent");

if (formatCurrency(2000.5) === "20.01") {
  console.log("passed");
} else {
  console.log("failed");
}
