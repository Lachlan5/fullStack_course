const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
  }

blogsRouter.post('/', async (request, response) => {
    if (!request.body.title || !request.body.url) {
        response.status(400).send({ error: 'malformatted id' })
        return
    }
    
    const body = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = await Blog.find({_id: request.params.id}).populate('user')
    const blogAuthorId = blog[0].user[0]._id.toString()
    if (user.id != blogAuthorId) {
        return response.status(401).json({ error: 'unauthorized blog user' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})
  
  
blogsRouter.put('/:id', async (request, response) => {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const body = request.body

    if (!body.user 
        || !body.likes
        || !body.author
        || !body.title
        || !body.url
    ) {
        response.status(400).send({ error: 'malformatted id' })
        return
    }

    const id = request.params.id

    const blog = {
        _id: id,
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        __v: 0
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(201).json(updatedBlog)
})

module.exports = blogsRouter