const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');  
const bcrypt = require('bcryptjs');

// Local strategy for Passport.js
passport.use(new LocalStrategy({
    usernameField: 'email',  // Use email as username
    passwordField: 'password',  // Standard password field
    passReqToCallback: true  // This will pass the request object to the callback
}, async (req, email, password, done) => {  // req is passed here
    try {
       
        const username = req.body.username;
        const role = req.body.role;

        // Look for a user with the given username, email, and role
        const user = await User.findOne({
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
        if (user.role !== 'buyer' && user.role !== 'seller') {
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
        const user = await User.findByPk(id);  
        done(null, user); 
    } catch (error) {
        done(error); 
    }
});
