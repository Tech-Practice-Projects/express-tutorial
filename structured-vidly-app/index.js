const express = require("express");
const app = express();
const debug = require("debug")("app:startup");

// for pug used by homepage to render response as html
app.set("view engine", "pug");
app.set("views", "./views");

// routers
const home = require("./routes/home");
const genres = require("./routes/genres");

// app use
app.use(express.json());
app.use("/", home);
app.use("/api/genres", genres);

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug(`Listening on ${port} ...`);
});
