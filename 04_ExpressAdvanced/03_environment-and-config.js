const express = require("express");
const app = express();
const config = require("config");
/* require("debug") returns a function, so we call this function and return an argument.
This argument is an arbitray namespace that we define for debugging.
For example we can define different namespace like "app:startup", "app:db" etc.
Now when we call this function with the namesapce as argument we get a function for writing debugging 
messages in this namespace.
Potentially we can have multiple debuggers in one file but general convention is to have one for each file
or module.
To use debug mode however you need to set the environment variable 
---------------- > DEBUG=app:startup to see only logs for app:startup
or ------------- > DEBUG=app:startup, app:db to see both
or ------------- > DEBUG=app:* to see all with namespace starting with app:
*/
const debug = require("debug")("app:startup");
const debug_custom = require("debug")("app:mrinalini"); // name space can be anything meaningfull
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
/* Configuration to enable morgan only during development */
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled --");
}

/* Parameters from config module, they will print different values based on what is set in NODE_ENV*/
debug(`The name of app is ${config.get("name")}`);
debug_custom(`The name of mail server is ${config.get("mail.host")}`);

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
