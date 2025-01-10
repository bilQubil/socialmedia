// <<<<<<< bagian-putri
// const { title } = require("process");
// const { Users, Posts, Tags } = require("../models");
// const bcrypt = require("bcryptjs");

const bcrypt = require('bcryptjs');
const passport = require('passport');
const { Op } = require('sequelize');

const { Users, Posts, Tags } = require("../models"); 

class Controller {
    static async getRegister(req, res){
        try {
            res.render('register');
        } catch (error) {
            console.error(error)
            }
        }
    static async postRegister(req, res, next){
        const { username, email, password, role } = req.body
        try {
            if (role !== 'user' && role !== 'admin') {
                return res.send('Invalid role. Role must be either buyer or seller.');
            }
            const existingUser = await Users.findOne({
                where: { email } 
            });
            if (existingUser) {
                return res.send('User already exists');
            }

            await Users.create({
                username,
                email,
                password,
                role,
            })
            
            req.login(Users, (err) => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/');  
            });
        } catch (error) {
            console.error(error)
            if(error.name === 'SequelizeValidationError'){
                error = error.errors.map((el) => {
                    return el.message
                })
            } res.send(error)
        }
    }
    static async getLogin (req, res){
        try {
            res.render('login');
        } catch (error) {
            console.error(error)
            }
        }
    static async postLogin(req, res, next){
        try{
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send(info.message); 
            }
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('landing');
            });
        })(req, res, next); 
        } catch (error) {
            console.error(error)
            if(error.name === 'SequelizeValidationError'){
                error = error.errors.map((el) => {
                    return el.message
                })
            }
        }
        }

        static async updatePasswordForm(req, res) {
            try {
                res.render('editPassword', { Users }); 
            } catch (error) {
                console.error(error)
            }
        }
    
        static async updatePassword(req, res){
            try {
                const { oldPassword, newPassword, confirmPassword } = req.body;
    
                const user = await Users.findByPk(req.user.id);
    
                const isMatch = await bcrypt.compare(oldPassword, user.password);
                if (!isMatch) {
                    return res.status(400).send('Current password is incorrect.');
                }
    
                if (newPassword !== confirmPassword) {
                    return res.status(400).send('New password and confirmation password do not match.');
                }
    
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                user.password = hashedPassword;
                await user.save();
    
                res.redirect('/profile');
            } catch (error) {
                console.error(error)
            }
        }

    static async getLogout(req, res) {
        req.logout((err) => {
            if (err) {
                return res.send('Error during logout');
            }
            res.redirect('/login');
        });
    }
  
  static async landingPage(req, res) {
    try {
        const user = req.user;
        const tag = req.query.tag; // Filter by tag
        const search = req.query.search; // Filter by search term
        let posts;
    
        // Construct a where condition for search
        const whereCondition = search
          ? {
              [Op.or]: [
                { title: { [Op.iLike]: `%${search}%` } }, // Case-insensitive search in the title
                { content: { [Op.iLike]: `%${search}%` } }, // Case-insensitive search in the content
              ],
            }
          : {};
    
        if (tag) {
          posts = await Posts.findAll({
            where: whereCondition,
            include: [
              {
                model: Tags,
                where: { name: tag },
              },
              {
                model: Users,
              },
            ],
          });
        } else {
          posts = await Posts.findAll({
            where: whereCondition,
            include: [Tags, Users],
          });
        }
    
        res.render("landing", { posts, user, search });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  static async createPost(req, res) {
    const { title, content, imgURL, tagname } = req.body;
    if (!content) {
        throw new Error("Content is required.");
      }
    try {
        const userId = req.user.id;

        const [tag, created] = await Tags.findOrCreate({
          where: { name: { [Op.iLike]: tagname } }, // Case-insensitive
          defaults: { name: tagname },
        });
    
         await Posts.create({
          title: title || "Untitled",
          content,
          imgURL: imgURL || null,
          UserId: userId,
          TagId: tag.id,
        });
    
        res.redirect("/landing");
    } catch (error) {
      console.error("Error creating post:", error.message);
      res.status(500).send("An error occurred while creating the post.");
    }
  }

  static async getPost(req, res){
    try {
        const post = req.params.id
        const postData = await Posts.findByPk(post, {
            include: [{ model: Tags, as: "Tag" }, { model: Users }],
        });
        res.render('post', { postData });
    } catch (error) {
        console.error(error)
        if(error.name === 'SequelizeValidationError'){
            error = error.errors.map((el) => {
                return el.message
            })
        } res.send(error)
    }
}
  
  static async newPost(req, res) {
    try {
      const { title, content, UserId, TagsId } = req.body;
      await Posts.create({ title, content, UserId, TagsId });
      res.redirect("/landing");
    } catch (error) {
      res.status(400).send(error.errors.map((err) => err.message));
    }
  }

  static async profilePage(req, res) {
    try {
      const user = req.user
    //   console.log("Authenticated User:", user);
      const posts = await Posts.findAll({
        where: { UserId: user.id },
        order: [["createdAt", "DESC"]],
      });
    //   console.log("Posts for User:", posts);
      res.render("profile", { user, posts });
    } catch (error) {
      console.error("Error in profilePage:", error.message);
      res.status(500).send("An error occurred while loading the profile page.");
    }
  }
  
  static async deletePost(req, res) {
    const postId = req.params.id;
    try {
      await Posts.destroy({ where: { id: postId } });
      res.redirect("/landing");
    } catch (error) {
      console.error("Error deleting post:", error.message);
      res.status(500).send("An error occurred while deleting the post.");
    }
  }

}
module.exports = Controller;
