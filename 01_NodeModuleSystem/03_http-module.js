/*
    In real world we will not be responding to "connection" event to build an http service, 
    like we did in basic-modules.js. We commonly pass a callback function to the createServer function.
    We can now work with the acrual request or response objects instead of working with the sockets.
    
*/
// Listener
const http = require("http");
const server = http.createServer((req, res) => {
  // if the url is http://localhost:3000
  if (req.url === "/") {
    res.write("Hello World"); // write Hello World on the browser home page "/"
    res.end();
  }
  //go to http://localhost:3000/api/courses
  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

// Raises an event
server.listen(3000);
console.log("Listening on port 3000");

/*
Above we saw that we had two if condition for different routes of a URL in real life we handle these routes using 
a framework called Express.
internally Express framework is built on top of the http module in node.
*/
