// const express = require("express");
// const postRoutes = require("./post.js");
// const userRoutes = require("./users.js");
// const tagRoutes = require("./tags.js");
const express = require("express");
const router = express.Router();
const login = require('./login')
const register = require('./register')
const postRoutes = require("./post.js");
const tagRoutes = require("./tags.js");

const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');
const Controller = require('../Controller/controller');

router.use('/register', register)
router.use('/login', login)
router.use('/logout', Controller.getLogout)
router.get('/update-password', ensureAuthenticated, Controller.updatePasswordForm);
router.post('/update-password', ensureAuthenticated, Controller.updatePassword);

router.use("/posts",ensureAuthenticated , postRoutes);
router.post("/posts/:id/delete", ensureAdmin, Controller.deletePost);

router.get("/profile",ensureAuthenticated, Controller.profilePage);
router.get("/landing",ensureAuthenticated, Controller.landingPage);

router.get("/", (req, res) => {
  res.redirect("/landing");
});


module.exports = router;
