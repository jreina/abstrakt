const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/routes");

const app = express();

app.use(morgan("dev"));

app.use("/api", routes);

app.listen(4000, function() {
  console.log("Navigate to http://localhost:4000");
});
