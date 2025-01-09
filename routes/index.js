const express = require('express')
const router = express.Router()

const posting = require('./post')
const tag = require('./tags')
const login = require('./login')
const register = require('./register')

const { ensureAuthenticated } = require('../middleware/auth');
const Controller = require('../Controller/controller');

router.use('/register', register)
router.use('/login', login)
router.use('/logout', Controller.getLogout)

router.use('/post', posting)
router.use('/tag', tag)

router.get('/',ensureAuthenticated, (req, res) => {
  res.render('home')
})
router.get('/home', (req, res) => {
  res.redirect('/')
})

module.exports = router