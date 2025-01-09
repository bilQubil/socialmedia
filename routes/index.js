const express = require('express')
const router = express.Router()

const posting = require('./post')
const tag = require('./tags')
const login = require('./login')
const register = require('./register')

const { ensureAuthenticated, ensureRole } = require('../middleware/auth');

router.use('/register', register)
router.use('/login', login)
router.use('/post', posting)
router.use('/tag', tag)

router.get('/',ensureAuthenticated, (req, res) => {
  res.render('home')
})
router.get('/home', (req, res) => {
  res.redirect('/')
})

module.exports = router