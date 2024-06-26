const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
    .find({})
    .then(blogs => {
        response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
    if (!request.body.title || !request.body.url) {
        response.status(400).send({ error: 'malformatted id' })
        return
    }
    const blog = new Blog(request.body)
    blog
    .save()
    .then(result => {
        response.status(201).json(result)
    })
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})
  
  
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        _id: body._id,
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        __v: body.__v
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(201).json(updatedBlog)
})

module.exports = blogsRouter