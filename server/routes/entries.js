const { Router } = require("express");
const { abstrakt } = require("abstrakt");
const moment = require("moment");
const _ = require("lodash");

const entries = Router();

entries.post("/start/:id", function(req, res) {
  if (!req.params.id) return res.status(404).send("MISSING_ID");
  abstrakt.start(req.params.id).then(id => res.json({ id }));
});

entries.get("/unfinished", function(req, res) {
  abstrakt.unfinished().then(x => res.json(x));
});

entries.get("/recent", async function(req, res) {
  const items = await abstrakt.view();
  const starts = items
    .filter(item => item.start !== undefined)
    .map(x => [x.start, x]);
  const instances = items
    .filter(item => item.time !== undefined)
    .map(x => [x.time, x]);

  const timeEntries = starts.concat(instances);

  const recent = _(timeEntries)
    .sortBy(([time]) => moment(time).unix())
    .reverse()
    .map(([, x]) => x)
    .take(6)
    .value();

  res.json(recent);
});

entries.get("/refs", function(req, res) {
  abstrakt.refs().then(x => res.json(x));
});

module.exports = entries;
