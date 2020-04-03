const express = require("express"); // returns a function
const app = express(); // returns an object of type express, by convention we call this object app.
/*
The app object has methods or verbs like get(), post(), put() and delete().
*/
/* First argument is the url and second is a callback function (also called a route handler) 
that takes two arguments (req, res). url + route handler is how we define a route.
req has bunch of useful properties that gives information about the incoming of request. 
Express documentation is a great place to read more about these properties. 
(https://expressjs.com/en/4x/api.html) for version 4 express*/
/*
    Not how in 01_NodeModuleSystem - > 03_http-module.js we had if blocks for different routes of the webpage.
    Here app.get() creates each route for us. As our app grows we can more some of these calls to different files.
    We can move all the routes related to cources to a seperate file like cources.js.
*/
app.get("/", (req, res) => {
  res.send("Hello Word, changed");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]); // in real world this will hit data base and get list of cources.
});

/* The call back function for the below listener is optional. It has hardcoded port hence in comments
app.listen(3000, () => {
  console.log("Listening on Port 3000");
});

*/

/* process is a globaly available variable*/
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});
