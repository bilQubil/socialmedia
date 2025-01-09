const bcrypt = require('bcryptjs');
const { User, Post, Tag } = require('../models')
const passport = require('passport');

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
            if (role !== 'buyer' && role !== 'seller') {
                return res.send('Invalid role. Role must be either buyer or seller.');
            }
            const existingUser = await User.findOne({
                where: { email } 
            });
            if (existingUser) {
                return res.send('User already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                username,
                email,
                password: hashedPassword,
                role
            })
            
            req.login(User, (err) => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/home');  // Redirect to the homepage after login
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
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send(info.message); // Send back the error message from Passport
            }
            req.login(user, (err) => {  // Log in the user and create a session
                if (err) {
                    return next(err);
                }
                res.redirect('home');  // Redirect to home after successful login
            });
        })(req, res, next);  // Pass req, res, next to Passport's 
        } catch (error) {
            console.error(error)
            if(error.name === 'SequelizeValidationError'){
                error = error.errors.map((el) => {
                    return el.message
                })
            }
        }
    static async getHome(req, res) {
        // This route will be protected, so check if user is authenticated first
        if (!req.isAuthenticated()) {
            return res.redirect('/login');  // Redirect to login if not authenticated
        }
        res.render('home', { user: req.user });  // Render home page with user data
    }

    static async logout(req, res) {
        req.logout((err) => {
            if (err) {
                return res.send('Error during logout');
            }
            res.redirect('/login');
        });
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

module.exports = Controller