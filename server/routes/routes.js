const { Router } = require("express");
const entries = require('./entries');
const refs = require('./refs');

const api = Router();

api.use('/entries', entries);
api.use('/refs', refs);

module.exports = api;
