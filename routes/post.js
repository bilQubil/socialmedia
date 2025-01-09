const express = require("express");
const Controller = require("../Controller/controller");

const post = express.Router();

// post.get("/posts", Controller.getPost);
post.post("/detail", Controller.newPost);

module.exports = post;
