const express = require("express");
const app = express();
const Joi = require("joi");
app.use(express.json()); // middleware
/* A lot of code might seem repetative from previous JS script files but the idea is to learn the ropes of
developing in Node Express step by step */

// Courses
const courses = [
  { id: 1, name: "First Course" },
  { id: 2, name: "Second Course" },
  { id: 3, name: "Third Course" }
];

// Courses Put
app.put("/api/courses/:id", (req, res) => {
  /* Validate the Request Body. validate Method returns the whole joi object which has error, value, 
  then and catch parameter. refer the README.md joi section in this folder.
  Since we are only interested in error
  we use the Javascript Object Destructuring technique. Refer to README.md in the same folder.
  */
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // If no Error
  // Find the course
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course Not Found");
  course.name = req.body.name;
  res.send(course);
});
// Course Delete
app.delete("/api/courses/:id", (req, res) => {
  // find the course to delete
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course Not Found");
  // Remove the course from courses array
  // find index of the course to delete in the array
  const index = courses.indexOf(course);
  /* Use splice method to delete the course. 
    First param is the index to delete, 
    second tells how many element to delete after the index (including current index)
    in our case we just want that one course to be deleted*/
  courses.splice(index, 1);
  res.send(course);
});
// Home Page

app.get("/", (req, res) => {
  res.send("Home Page!");
});

// Courses GET ALL

app.get("/api/courses/", (req, res) => {
  res.send(courses);
});

// Courses GET BY ID

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course Not Found");
  res.send(course);
});

// Courses Post

app.post("/api/courses/", (req, res) => {
  // Validate the Client Request Body. This is modularized into one function "validate"
  const { error } = validate(req.body);
  // If request is not valid and validate() sends error respond to client with Bad Request Error Code
  if (error) return res.status(400).send(error.details[0].message);
  // If no error then go ahead create a course add to DB / Course array and send response to client
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

function validate(course) {
  // Schema
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

// Listener
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port} ...`);
});
