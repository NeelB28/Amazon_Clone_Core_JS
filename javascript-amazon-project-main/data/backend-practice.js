// now to send an HHTP message we will use a built in class provided by JS
// new XMLHttpRequest // creates a new HTTP message to send to the backend; message=request
const xhr = new XMLHttpRequest();
// open() method is used to send an HTTP request to the server
// it takes 4 parameters: method, url, async, user, password: request(method), where to send this message currentl GET SO where to: https://supersimplebackend.dev(url),

// just like a button click we need to set up the event listener first and we click the button afterwards

// log xhr.response when event is of "loading" at time we could have got the response
xhr.addEventListener("load", () => {
  console.log(xhr.response);
}); // this method waits or listens for an event or wait for an event
// URL: Uniform Resource Locator = Like and address but for the internet, helps us locate another computer on the internet
// http(s: secure version of http)://amazon.com{domain name points to amazons backend}
// TYPE of Requests: GET, POST, PUT, DELETE

// we can also send different messages or different requests to the backend through url paths (it comes after the domain name ex: supersimplebackend.dev/hello)
// If we send a request to a URL path that is not supported, the backend will respond with an error and status code
// STATUS CODE
// starts with 4 or 5(400, 404, 500) = failed; with 4 our problem, with 5: backend's problem maybe backend's crashed
// starts with (200, 201, 204) ex: 200 = success

// So the list of all the URL paths that are supported is called the backend API = application programming interface (interface: how we interact with something)

// Backend can respond with different types of data; like text and we can check it in headers section of our code in content type
// JSON too a response type and use JSON.parse() to conver back into object
// another type we get as response is HTML
// another response type is image and check content type in headers section; but when we try to display image in console it will provide some written text which will be a raw data of that image and so for that when we type a url in the browser it sends a GET request to that URL and will display it on the page and using the brower makes a same task as making a GET request (same display as console one)
// same for all other type of responses

//xhr.open("GET", "https://supersimplebackend.dev/products/not-supported");
xhr.open("GET", "https://supersimplebackend.dev/products/first");
xhr.send(); // above all creates a new message and now sends this message across the internet to supersimplebackend.dev
// when we send a message thorugh internet it is a request and when we receive a message from the backend then it is a response
// one request one reponse
xhr.response;
// it will be undefined intially as it takes time to fetch the response
// and xhr.send is known as asynchronous code: so it will not wait for the response to come and it will direclty go to the next line but we want it in synchronous manner so we need to wait for response and then execute xhr.response
