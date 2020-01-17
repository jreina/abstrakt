const { Router } = require("express");
const entries = require('./entries');

const api = Router();

api.use('/entries', entries);


module.exports = api;
