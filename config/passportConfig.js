const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');  // Sequelize User model
const bcrypt = require('bcryptjs');

// Local strategy for Passport.js
passport.use(new LocalStrategy({
    usernameField: 'email',  // Use email as username
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }

        // if (user.username !== email) {
        //     return done(null, false, { message: 'Username and email mismatch' });
        // }

        if (user.role !== 'buyer' && user.role !== 'seller') {
            return done(null, false, { message: 'Invalid role' });
        }
        // console.log(user.password)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
        }

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
