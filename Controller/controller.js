// <<<<<<< bagian-putri
// const { title } = require("process");
// const { Users, Posts, Tags } = require("../models");
// const bcrypt = require("bcryptjs");

// class Controller {

// =======
const bcrypt = require("bcryptjs");
const { User, Post, Tag } = require("../models");
// const { Users, Posts, Tags } = require("../models");

class Controller {
  static async getRegister(req, res) {
    try {
      res.render("register");
    } catch (error) {
      console.error(error);
    }
  }
  static async postRegister(req, res) {
    const { username, email, password, role } = req.body;
    try {
      const existingUser = await User.findOne({
        where: { email },
      });
      if (existingUser) {
        return res.send("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
      });

      res.redirect("/login");
    } catch (error) {
      console.error(error);
      if (error.name === "SequelizeValidationError") {
        error = error.errors.map((el) => {
          return el.message;
        });
      }
      res.send(error);
    }
  }
  static async getLogin(req, res) {
    try {
      res.render("login");
    } catch (error) {
      console.error(error);
    }
  }
  static async postLogin(req, res) {
    const { username, email, password, role } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email,
          role,
        },
      });
      if (!user) {
        res.send("User not found");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.send("Wrong password");
      }

      res.redirect("home");
    } catch (error) {
      console.error(error);
      if (error.name === "SequelizeValidationError") {
        error = error.errors.map((el) => {
          return el.message;
        });
      }
    }
  }
  static async getHome(req, res) {
    // This route will be protected, so check if user is authenticated first
    if (!req.isAuthenticated()) {
      return res.redirect("/login"); // Redirect to login if not authenticated
    }
    res.render("home", { user: req.user }); // Render home page with user data
  }

  static async logout(req, res) {
    req.logout((err) => {
      if (err) {
        return res.send("Error during logout");
      }
      res.redirect("/login");
    });
  }

  static async landingPage(req, res) {
    try {
      const posts = await Post.findAll({
        include: [{ model: Tag, as: "Tag" }, { model: User }],
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

      const [defaultTag, created] = await Tag.findOrCreate({
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

      await Post.create({
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
      const posts = await Post.findAll({
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
      const { title, content, UserId, tagId } = req.body;
      await Post.create({ title, content, UserId, tagId });
      res.redirect("/posts");
    } catch (error) {
      res.status(400).send(error.errors.map((err) => err.message));
    }
  }
  //     static async getPost(req, res){
  //         try {

  //         } catch (error) {
  //             console.error(error)
  //             if(error.name === 'SequelizeValidationError'){
  //                 error = error.errors.map((el) => {
  //                     return el.message
  //                 })
  //             } res.send(error)
  //         }
  //     }
  //     static async newPost(req, res){
  //         try {

  //         } catch (error) {
  //             console.error(error)
  //             if(error.name === 'SequelizeValidationError'){
  //                 error = error.errors.map((el) => {
  //                     return el.message
  //                 })
  //             } res.send(error)
  //         }
  //     }
  //     static async getTags(req, res){
  //         try {

  //         } catch (error) {
  //             console.error(error)
  //             if(error.name === 'SequelizeValidationError'){
  //                 error = error.errors.map((el) => {
  //                     return el.message
  //                 })
  //             } res.send(error)
  //         }
  //     }
  //     static async postTags(req, res){
  //         try {

  //         } catch (error) {
  //             console.error(error)
  //             if(error.name === 'SequelizeValidationError'){
  //                 error = error.errors.map((el) => {
  //                     return el.message
  //                 })
  //             } res.send(error)
  //         }
  //     }
}
module.exports = Controller;
