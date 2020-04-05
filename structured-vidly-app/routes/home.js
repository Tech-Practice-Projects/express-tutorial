const express = require("express");
const router = express.Router();

// Home Page uses the pug template

router.get("/", (req, res) => {
  res.render("index", { title: "Vidly", message: "Welcome to Vidly" });
});

module.exports = router;
