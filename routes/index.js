const express = require("express");
const postRoutes = require("./post");
const userRoutes = require("./user");
const tagRoutes = require("./tag");

const router = express.Router();

router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/tags", tagRoutes);

router.get("/", (req, res) => {
  res.redirect("/posts");
});

module.exports = router;
