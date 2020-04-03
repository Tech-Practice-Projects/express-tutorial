/*
This code talks about how we can define a route with parameters. These parameters can be usefull when 
say trying to get a customer with a specific id, we would hence pass the id as a parameter.
parameters are conventionally defined with a ":" like this /api/courses/:id. There can be more than one 
parameter like /api/posts/:year/:month.
*/
const express = require("express");
const app = express();

// Home page
app.get("/", (req, res) => {
  res.send("Home Page");
});

// all courses
app.get("/api/courses/", (req, res) => {
  res.send(courses);
});

// Course page with id param, NOTE : you have to use req.params.id and not id directly.

app.get("/api/courses/:id", (req, res) => {
  res.send(`Course with ${req.params.id}`);
});

/* Two param and query example. 
    url http://localhost:5000/api/posts/2018/3, Note how the JSON objects had to be
    stringified before sending a complete string as resonse.
    
    Query Parameter: instead of req.params use req.query and the url must be
    http://localhost:5000/api/posts/2018/3?sortBy=year.
    req.query object looks like this { sortBy : year }
    */

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(
    `The param object : ${JSON.stringify(req.params)}
    | The year sent in the request ${req.params.year}
    | The month sent in the request ${req.params.month} 
    | The query param ${JSON.stringify(req.query)}`
  );
});

// Listener
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
