// const xhr = new XMLHttpRequest();
// xhr.addEventListener("load", () => {
//   console.log(xhr.response);
// });

// xhr.open("GET", "https://supersimplebackend.dev/greeting");
// xhr.send(); // it will take time to recieve so after the event of load only it means after receiving only it should display for that add an addEventListener

// fetch("https://supersimplebackend.dev/greeting")
//   .then((response) => {
//     return response.text();
//   })
//   .then((text) => {
//     console.log(text);
//   });

async function getGreeting() {
  const response = await fetch("https://supersimplebackend.dev/greeting");
  const text = await response.text();
  console.log(text);
}
getGreeting();

async function postGreeting() {
  const response = await fetch("https://supersimplebackend.dev/greeting", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Neel Buddhdev",
    }),
  });
  const text = await response.text();
  console.log(text);
}
postGreeting();

// async function getAmazon() {
//   const response = await fetch('https://amazon.com');
//   const text = await response.text();
//   console.log(text);
// }
// getAmazon(); amazon's URL is running on different URL and so for security reasons it is blocked

// async function getAmazon() {
//   try {
//     const response = await fetch("https://amazon.com");
//     const text = await response.text();
//     console.log(text);
//   } catch (error) {
//     console.log(
//       "CORS: Cross-origin Resource Sharing error. Your request was blocked by the backend."
//     );
//   }
// }
// getAmazon();

async function postGreetingError() {
  try {
    const response = await fetch("https://supersimplebackend.dev/greeting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status >= 400) {
      throw response;
    }
    const text = await response.text();
    console.log(text);
  } catch (error) {
    if (error.status === 400) {
      const errorMessage = await error.json();
      console.log(errorMessage);
    } else {
      console.log("Network error please try again later");
    }
  }
}
postGreetingError();
