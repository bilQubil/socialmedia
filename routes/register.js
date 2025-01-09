const express = require("express");
const controller = require("../Controller/controller");

const register = express.Router()

register.get("/register", controller.getRegister)
register.post("/register", controller.postRegister)

module.exports = register