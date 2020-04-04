const express = require("express");
const app = express();
/* What we are doing here is adding a peice of middleware, express.json() returns this middleware.
we use app.use() to use that middleware in the request proccessing pipeline. 
For now just understand that this line is required for app.post() to read the body of the request from the 
client. That is req.body.something */
app.use(express.json());
/* Here let's work on writing a meaningful GET and POST verbs for courses page we saw in 
02_route-parameters.js */
// Since we are not using Db in the course yet let's create an array that holds all the courses as objects
let courses = [
  { id: 1, name: "First Course" },
  { id: 2, name: "Second Course" },
  { id: 3, name: "Third Course" }
];

//HomePage
app.get("/", (req, res) => {
  res.send("Home Page!");
});

// All Courses
app.get("/api/courses/", (req, res) => {
  res.send(courses);
});

// Get Course with ID
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id)); // find course with id === route param.
  //Rest convention dictates that we send 404 Error when a route or page is not found
  if (!courses) res.status(404).send("Course Not Found!");
  else res.send(course.name);
});

app.post("/api/courses/", (req, res) => {
  /* Input Validation, joi module makes input validation easier use that instead of doing this **/
  if (!req.body.name || req.body.name.length < 4) {
    res
      .status(400)
      .send("No name or invalid name length (must be greater than 4)");
    return;
  }
  const course = {
    id: courses.length + 1, // This ID will be assigned automatically by DB when we use one.
    name: req.body.name // refer to README.md in current folder "POSTMAN" section to find out how to send request from client with an object with name param
  };
  courses.push(course);
  /* By covention when a server creates / posts a new object to the resource it should return that 
    object in the body of the response, the reason being we are assigning the id for this course on 
    the server and we need to send these details to the client because chances are that the client 
    needs to know the id of this new object.*/
  res.send(course);
});

// Listener.
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port} ...`);
});
