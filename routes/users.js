const express = require("express");
const Controller = require("../controller");

const router = express.Router();

router.get("/register", Controller.registerPage);
router.post("/register", Controller.registerUser);

router.get("/login", Controller.loginPage);
router.post("/login", Controller.loginUser);

module.exports = router;