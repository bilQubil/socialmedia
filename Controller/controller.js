const { User, Post, Tag } = require("./models");
const bcrypt = require("bcryptjs");

class Controller {
  static async landingPage(req, res) {
    try {
      const posts = await Post.findAll({
        include: [Tag, User],
      });
      res.render("landing", { posts });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async registerPage(req, res) {
    res.render("register");
  }

  static async registerUser(req, res) {
    try {
      const { username, email, password, role } = req.body;
      await User.create({ username, email, password, role });
      res.redirect("/login");
    } catch (error) {
      res.status(400).send(error.errors.map((err) => err.message));
    }
  }

  static async loginPage(req, res) {
    res.render("login");
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send("Invalid email or password");
      }
      req.session.user = { id: user.id, email: user.email };
      res.redirect("/");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
module.exports = Controller;
