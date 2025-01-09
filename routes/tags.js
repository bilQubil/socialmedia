const express = require("express");
const Controller = require("../Controller/controller");

const tag = express.Router();

tag.get("/tags", Controller.getTags);
tag.post("/tags", Controller.postTags);

module.exports = tag;
