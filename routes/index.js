const express = require('express')
const router = express.Router()

const posting = require('./post')
const tag = require('./tags')

router.use('/post', posting)
router.use('/tag', tag)

router.get('/', (req, res) => {
  res.render('home')
})

module.exports = router