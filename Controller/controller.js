const { title } = require("process");
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
  static async createPost(req, res) {
    try {
      const { title, content, imgUrl } = req.body;
      if (!content) {
        throw new Error("Content is required.");
      }

      const [defaultTag, created] = await Tags.findOrCreate({
        where: { name: "General" }, // Adjust "General" to your desired default tag
        defaults: { name: "General" },
      });

      //DEBUG GEDEBUG
      console.log("Creating post with data:");
      console.log({
        title: title || "",
        content,
        imgUrl: imgUrl || null,
        userId: req.user.id,
        tagId: defaultTag.id,
      });

      await Posts.create({
        title: title || "",
        content,
        imgUrl: imgUrl || null,
        userId: req.user.id,
        tagId: defaultTag.id,
      });

      res.redirect("/landing");
    } catch (error) {
      //   console.log(Posts);
      console.error("Error creating post:", error.message);
      res.status(500).send("An error occurred while creating the post.");
    }
  }

  static async profilePage(req, res) {
    try {
      console.log("Accessing /profile route");
      console.log("User data in req.user:", req.user);

      const user = req.user;
      if (!user) {
        return res.redirect("/login");
      }
      const posts = await Posts.findAll({
        where: { userId: user.id },
        order: [["createdAt", "DESC"]],
      });
      res.render("profile", { user, posts });
    } catch (error) {
      console.error("Error in profilePage:", error.message);
      res.status(500).send("An error occurred while loading the profile page.");
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
}
module.exports = Controller;
