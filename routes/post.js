const express = require("express");
const Controller = require("../Controller/controller");
const { ensureAuthenticated, ensureRole } = require('../middleware/auth');

const post = express.Router();

post.get("/newpost",ensureAuthenticated, Controller.getPost);
post.post("/newpost",ensureAuthenticated, Controller.newPost);


module.exports = post;
