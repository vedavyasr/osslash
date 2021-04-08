const router = require('express').Router()

const postsHandler = require('./posts')
router.use('/login', signIn)
router.use('/posts', postsHandler)
module.exports = exports= router