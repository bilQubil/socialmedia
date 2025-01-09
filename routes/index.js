const express = require("express");
const postRoutes = require("./post.js");
const userRoutes = require("./user.js");
const tagRoutes = require("./tag.js");
const Controller = require("../Controller/controller");

const router = express.Router();

const posting = require("./post");
const tag = require("./tag.js");
const login = require("./login");
const register = require("./register");

router.use("/register", register);
router.use("/login", login);
router.use("/post", posting);
router.use("/tag", tag);

router.use("/post", postRoutes);
router.use("/user", userRoutes);
router.use("/tag", tagRoutes);

router.get("/profile", Controller.profilePage);

router.get("/landing", Controller.landingPage);
router.post("/post", Controller.createPost);

router.get("/", (req, res) => {
  res.redirect("/landing");
});

module.exports = router;
