const { Router } = require("express");
const { abstrakt } = require("abstrakt");

const refs = Router();

refs.get("/list", function(req, res) {
  abstrakt.refs().then(x => res.json(x));
});

refs.get("/search/:title", function(req, res) {
  if (!req.params.title) return res.json([]);
  const pattern = RegExp(req.params.title);
  abstrakt.refs().then(items => {
    const matches = items.filter(({ title }) => pattern.test(title));
    res.json(matches);
  });
});

module.exports = refs;
