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

            await User.create({
                username,
                email,
                password,
                role,
            })
            
            req.login(User, (err) => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/home');  
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
                return res.send(info.message); 
            }
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('home');
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

    static async getHome(req, res) {
        
        if (!req.isAuthenticated()) {
            return res.redirect('/login');  
        }
        res.render('home', { user: req.user }); 
    }

    static async getLogout(req, res) {
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