const { Users, Posts, Tags } = require("../models");
const bcrypt = require("bcryptjs");

class Controller {
  static async landingPage(req, res) {
    try {
      const posts = await Posts.findAll({
        include: [{ model: Tags, as: "Tag" }, { model: Users }],
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
      const { Username, email, password, role } = req.body;
      await Users.create({ Username, email, password, role });
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
      const Users = await Users.findOne({ where: { email } });
      if (!Users || !(await bcrypt.compare(password, Users.password))) {
        return res.status(401).send("Invalid email or password");
      }
      req.session.Users = { id: Users.id, email: Users.email };
      res.redirect("/");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getPost(req, res) {
    try {
      const posts = await Posts.findAll();
      res.render("posts", { posts });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async newPost(req, res) {
    try {
      const { title, content, UserId, TagsId } = req.body;
      await Posts.create({ title, content, UserId, TagsId });
      res.redirect("/posts");
    } catch (error) {
      res.status(400).send(error.errors.map((err) => err.message));
    }
  }

  static async getTags(req, res) {
    try {
      const Tags = await Tags.findAll();
      res.render("Tags", { Tags });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async postTags(req, res) {
    try {
      const { name } = req.body;
      await Tags.create({ name });
      res.redirect("/Tags");
    } catch (error) {
      res.status(400).send(error.errors.map((err) => err.message));
    }
  }
}
module.exports = Controller;
