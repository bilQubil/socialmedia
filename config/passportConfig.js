const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Users } = require('../models');  
const bcrypt = require('bcryptjs');

// Local strategy for Passport.js
passport.use(new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password', 
    passReqToCallback: true  // This will pass the request object to the callback
}, async (req, email, password, done) => {  // req is passed here
    try {
       
        const username = req.body.username;
        const role = req.body.role;

        // Look for a user with the given username, email, and role
        const user = await Users.findOne({
            where: {
                username, 
                email,  
                role  
            }
        });

        if (!user) {
            return done(null, false, { message: 'User not found' });
        }

        // Validate user role
        if (user.role !== 'user' && user.role !== 'admin') {
            return done(null, false, { message: 'Invalid role' }); 
        }

        // Compare password
        const isMatch = await user.validPassword(password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
        }

        // Successfully authenticated, return the user
        return done(null, user);
    } catch (error) {
        return done(error); 
    }
}));

// Serialize user to store user ID in session
passport.serializeUser((user, done) => {
    done(null, user.id);  
});

// Deserialize user from session using user ID
passport.deserializeUser(async (id, done) => {
    try {
        const user = await Users.findByPk(id);  
        done(null, user); 
    } catch (error) {
        done(error); 
    }
});
