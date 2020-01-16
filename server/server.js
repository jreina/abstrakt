const express = require("express");
const { abstrakt } = require("abstrakt");

const app = express();

app.get("/api/entries/refs", function(req, res) {
  abstrakt.refs().then(x => res.json(x));
});

app.listen(4000, function() {
  console.log("Navigate to http://localhost:4000");
});
