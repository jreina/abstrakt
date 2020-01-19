const { Router } = require("express");
const { abstrakt, Database } = require("abstrakt");
const moment = require("moment");
const _ = require("lodash");

const entries = Router();

entries.post("/start/:id", function(req, res) {
  if (!req.params.id) return res.status(404).send("MISSING_ID");
  abstrakt.start(req.params.id).then(id => res.json({ id }));
});

entries.post("/end/:id", function(req, res) {
  if (!req.params.id) return res.status(404).send("MISSING_ID");
  abstrakt.end(req.params.id).then(_ => res.json({ id: req.params.id }));
});

entries.post("/drop/:id", function(req, res) {
  if (!req.params.id) return res.status(404).send("MISSING_ID");
  abstrakt.delete(req.params.id).then(_ => res.json({ id: req.params.id }));
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

module.exports = entries;
