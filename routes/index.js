const express = require('express')
const router = express.Router()

const posting = require('./post')
const tag = require('./tags')
const login = require('./login')
const register = require('./register')

router.use('/register', register)
router.use('/login', login)
router.use('/post', posting)
router.use('/tag', tag)

router.get('/', (req, res) => {
  res.render('home')
})

module.exports = router