const express = require("express"); // returns a method
const Joi = require("joi"); // Retuns a class
const app = express();
app.use(express.json()); // express json middleware added

const courses = [
  { id: 1, name: "First Course" },
  { id: 2, name: "Second Course" },
  { id: 3, name: "Third Course" }
];

// Home Page

app.get("/", (req, res) => {
  console.log("Home Page");
});

// All Cources

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// Specific Course Page

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Course Not Found");
  else res.send(course.name);
});

app.post("/api/courses", (req, res) => {
  // Design Schema (refer README.md in current folder)
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const validation = Joi.validate(req.body, schema); // validate the request body with schema
  if (validation.error) {
    // send 400 if request body doesn't comply with the schema
    res.status(400).send(validation.error.details[0].message); // instead of if else block just return this line
  } else {
    const course = {
      id: courses.length + 1,
      name: req.body.name // You will read the course name from the body of the request the client sends, for this to work you need json middleware
    };
    courses.push(course);
    res.send(course);
  }
});

// Listener
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to ${port} ...`);
});
