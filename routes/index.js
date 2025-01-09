// const express = require("express");
// const postRoutes = require("./post.js");
// const userRoutes = require("./users.js");
// const tagRoutes = require("./tags.js");
const posting = require('./post')
const tag = require('./tags')
const login = require('./login')
const register = require('./register')

const { ensureAuthenticated } = require('../middleware/auth');
const Controller = require('../Controller/controller');

router.use('/register', register)
router.use('/login', login)
router.use('/logout', Controller.getLogout)

router.use('/post', posting)
router.use('/tag', tag)


const express = require("express");
const postRoutes = require("./post.js");
const userRoutes = require("./users.js");
const tagRoutes = require("./tags.js");
const Controller = require("../Controller/controller");

const router = express.Router();

router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/tags", tagRoutes);

router.get("/profile", Controller.profilePage);

router.get("/landing", Controller.landingPage);
router.post("/posts", Controller.createPost);

router.get("/", (req, res) => {
  res.redirect("/landing");
});


module.exports = router;
