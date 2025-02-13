import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import isWeekend from "./15-exercise-default.js"; // with the given name callin default export function
import isSatSun from "./15-exercise-default.js"; // with the subsituted name calling fefault export function

const today = dayjs();
const todayDisplay = today.format("MMMM D");
console.log("Today: " + todayDisplay);

const fiveDayAfter = today.add(5, "days");
const fiveDayAfterDisplay = fiveDayAfter.format("MMMM D");
console.log("5 days after: " + fiveDayAfterDisplay);

const oneMonthAfter = today.add(1, "month");
const oneMonthAfterDisplay = oneMonthAfter.format("MMMM D");
console.log("1 month after: " + oneMonthAfterDisplay);

const oneMonthBefore = today.subtract(1, "month");
const oneMonthBeforeDisplay = oneMonthBefore.format("MMMM D");
console.log("1 month before: " + oneMonthBeforeDisplay);

const displayOnlyWeek = today.format("dddd");
console.log("Display only week: " + displayOnlyWeek);

console.log(isSatSun(today.add(2, "day"))); // subsituted export fn name
if (isWeekend(today.add(2, "day"))) {
  // given export fn name
  console.log("weekend");
} else {
  console.log("not weekend");
}
