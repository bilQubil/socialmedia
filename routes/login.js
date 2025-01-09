const express = require("express");
const passport = require('passport');
const controller = require("../Controller/controller");

const login = express.Router();

login.get("/", controller.getLogin)
login.post("/", controller.postLogin)

module.exports = login 