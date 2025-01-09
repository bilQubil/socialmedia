const express = require("express");
const Controller = require("../Controller/controller.js");

const router = express.Router();

// router.get("/register", Controller.registerPage);
// router.post("/register", Controller.registerUser);

// router.get("/login", Controller.loginPage);
// router.post("/login", Controller.loginUser);
router.get("/profile", (req, res) => {
  //   if (!req.user) {
  //     return res.redirect("/login"); // Redirect to login if no user is found
  //   }
});

router.get("/profile", Controller.profilePage);

module.exports = router;
