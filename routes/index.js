// const express = require("express");
// const postRoutes = require("./post.js");
// const userRoutes = require("./users.js");
// const tagRoutes = require("./tags.js");

// const router = express.Router();

// router.use("/posts", postRoutes);
// router.use("/users", userRoutes);
// router.use("/tags", tagRoutes);

// router.get("/", (req, res) => {
//   res.redirect("/landing");
// });

// module.exports = router;

const express = require("express");
const postRoutes = require("./post.js");
const userRoutes = require("./users.js");
const tagRoutes = require("./tags.js");
const Controller = require("../Controller/controller");

const router = express.Router();

router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/tags", tagRoutes);

// Define the /landing route
router.get("/landing", Controller.landingPage); // Add this line

router.get("/", (req, res) => {
  res.redirect("/landing");
});

module.exports = router;
