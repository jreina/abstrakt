const express = require("express");
const { abstrakt } = require("abstrakt");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.post("/api/entries/start/:id", function(req, res) {
  if (!req.params.id) return res.status(404).send("MISSING_ID");
  abstrakt.start(req.params.id).then(id => res.json({ id }));
});

app.get("/api/entries/refs", function(req, res) {
  abstrakt.refs().then(x => res.json(x));
});

app.listen(4000, function() {
  console.log("Navigate to http://localhost:4000");
});
