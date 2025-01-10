function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function ensureAdmin(role) {
    return (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === "admin") {
            return next();
        }
        res.status(403).send('Forbidden: You do not have access to this resource');
    };
}

module.exports = { ensureAuthenticated, ensureAdmin };