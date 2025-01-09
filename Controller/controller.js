const bcrypt = require('bcryptjs');
const { User, Post, Tag } = require('../models')

class Controller {
    static async getRegister(req, res){
        try {
            res.render('register');
        } catch (error) {
            console.error(error)
            }
        }
    static async postRegister(req, res){
        const { username, email, password, role } = req.body
        try {

            const existingUser = await User.findOne({
                where: { email } 
            });
            if (existingUser) {
                return res.send('User already exists');
            }


            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                username,
                email,
                password: hashedPassword,
                role
            })
            
            res.redirect('/login')
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
    static async postLogin(req, res){
        const { username, email, password, role } = req.body
        try {
            
            const user = await User.findOne({
                where: {
                    email,
                    role
                }
            })
            if(!user){
                res.send('User not found')
            }
            
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                res.send('Wrong password')
            }
            
            res.redirect('home')
        } catch (error) {
            console.error(error)
            if(error.name === 'SequelizeValidationError'){
                error = error.errors.map((el) => {
                    return el.message
                })
            }
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