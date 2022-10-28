const Blog = require('../models/Blog')
const User = require('../models/User')
const testingRouter = require('express').Router()
testingRouter.get('/reset', async (req, response) => {
   await Blog.deleteMany({})
   await User.deleteMany({})
   response.status(204).end()
})
testingRouter.post('/blog', async (req, response) => {
    const blog = req.body
    const newblog = new Blog(blog)
    const result = await newblog.save()

    response.status(200).json(result)
 })
 testingRouter.post('/user', async (req, response) => {
    const {username, password} = req.body
    const user = {
        username,
        name: 'Abraham',
        passwordHash: password
    }
    const newUser = new User(user)
    const result = await newUser.save()
    response.status(200).json(result)
 })
module.exports = testingRouter