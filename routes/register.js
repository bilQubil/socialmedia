const express = require("express");
const controller = require("../Controller/controller");

const register = express.Router()

register.get("/", controller.getRegister)
register.post("/", controller.postRegister)

module.exports = register