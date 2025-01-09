const express = require("express");
const Controller = require("../Controller/controller");
const { ensureAuthenticated, ensureRole } = require('../middleware/auth');

const posting = express.Router();

// posting.get("/", ensureAuthenticated, Controller.getPost);
// posting.post("/", ensureAuthenticated, Controller.newPost);

module.exports = posting