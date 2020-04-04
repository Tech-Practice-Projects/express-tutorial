/* Here we will discuss about some built-in and third part middleware */
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
/* Built-in middleware */
/* it parses the body of the request and there is a json object it will populate the req.body property*/
app.use(express.json());
/* This middleware function parses incoming request like express.json() does but this is for "url encoded" payloads.
That is a request with body like key=value&key=value.. In postman if you try to post a genre click on body and 
select the radio button x-www-form-urlencoded and pass the request as key-value pairs. Just having this
middleware means we can now handle url encoded payloads.*/
// app.use(express.urlencoded()); this gives a deprecated warning use the below line
app.use(express.urlencoded({ extende: true })); // with this we can pass arrays and other complex objects using the url encode dormat
/* Say we have all our static assets like css, images and so on inside a folder called public
 Having the below url we can serve static contents. In our case we have a readme.txt, with this middleware
 we can now access this using url say "http://localhost:3000/readme.txt
 note that we dont have public in the url*/
app.use(express.static("public"));
/* Third Party middleware, you will need to use npm i morgan and npm i helmet to install these */
/* */
app.use(helmet);
/* */
app.use(morgan);

/* ................. 03_06_project copied here ................ */

// Resourse in DB
const genres = [
  { id: 1, type: "Horror", desc: "" },
  { id: 2, type: "Science Fiction", desc: "" },
  { id: 3, type: "Comedy", desc: "" },
  { id: 4, type: "Adventure", desc: "" }
];

// some schemas
const schemas = [
  {
    id: 1,
    schema: {
      type: Joi.string().min(3).required(),
      desc: Joi.string().min(10)
    }
  },
  {
    id: 2,
    schema: {
      desc: Joi.string().min(10).required()
    }
  }
];

// GET ALL GENRES

app.get("/api/genres/", (req, res) => {
  res.send(genres);
});

// GET GENRE BY ID
app.get("/api/genres/:id", (req, res) => {
  // Find the genre in db
  const genre = genres.find(g => g.id == parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre Not Found");
  res.send(genre);
});
// POST GENRE

app.post("/api/genres/", (req, res) => {
  // Validate the req from client
  const schema = schemas.find(s => s.id === 1).schema;
  console.log(schema);

  const { error } = validate(req.body, schema);
  // Send Bad Request if req is not valid
  if (error) return res.status(400).send(error.details[0].message);
  // If valid create a genre and push to db
  const genre = {
    id: genres.length + 1,
    type: req.body.type,
    desc: req.body.desc
  };
  genres.push(genre);
  // Send res with newly created genre
  res.send(genre);
});

// function to validate create genre req body

function validate(genre, schema) {
  return Joi.validate(genre, schema); // returns the joi object
}

// UPDATE GENRE DESCRIPTION by id

app.put("/api/genres/:id", (req, res) => {
  // Validate description
  const { error } = validate(req.body, schemas.find(s => s.id === 2).schema);
  // Send Bad Request if Error
  if (error) return res.status(400).send(error.details[0].message);
  // find genre to update
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  // update the genre desc
  genre.desc = req.body.desc;
  // send the updated genre back
  res.send(genre);
});

// DELETE GENRE BY ID

app.delete("/api/genres/:id", (req, res) => {
  // Validate if ID is valid
  const genre = genres.find(g => g.id == parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre Not Found");
  // splice the genre out of the db
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  // send deleted genre
  res.send(genre);
});

// LISTENER

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port} ...`);
});
