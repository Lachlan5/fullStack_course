const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset/all', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

router.post('/reset/blogs', async (request, response) => {
  await Blog.deleteMany({})

  response.status(204).end()
})

module.exports = router