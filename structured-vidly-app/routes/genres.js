const express = require("express");
const router = express.Router();
const Joi = require("joi"); // schema validation or rquest validation
const debug = require("debug")("app:genres");

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

router.get("/", (req, res) => {
  res.send(genres);
});

// GET GENRE BY ID
router.get("/:id", (req, res) => {
  // Find the genre in db
  const genre = genres.find(g => g.id == parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre Not Found");
  res.send(genre);
});
// POST GENRE

router.post("/", (req, res) => {
  // Validate the req from client
  const schema = schemas.find(s => s.id === 1).schema;
  debug(schema);
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

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  // Validate if ID is valid
  const genre = genres.find(g => g.id == parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre Not Found");
  // splice the genre out of the db
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  // send deleted genre
  res.send(genre);
});

module.exports = router;
