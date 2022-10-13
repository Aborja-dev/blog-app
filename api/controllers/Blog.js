const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { authByToken } = require('../middleware/authToken')
const blogRouter = require('express').Router()

blogRouter.get('/', authByToken, async (req, response, next) => {
	const blogs = await Blog.find({}).populate('user')
	response.json(blogs)
})

blogRouter.delete('/:id', async (req, res) => {
	const id = req.params.id
	await Blog.findByIdAndDelete(id)
	return res.status(204).end()
})
blogRouter.put('/:id', async (req, res) => {
	const id = req.params.id
	const body = req.body
	const result = await Blog.findByIdAndUpdate(id, body, { new: true })
	return res.json(result)
})
blogRouter.post('/', authByToken ,async (req, response, next) => {
	const body = req.body
	const userId = req.auth.id
	const { author, title, url } = body
	const user = await User.findById(userId)
	try {
		const blog = new Blog({
			author,
			title,
			url,
			likes: body.likes ? body.likes : 0,
			user: body.userId
		})
		const result = await blog.save()
		user.blogs = user.blogs.concat(result._id)
		await user.save()
		response.status(201).json(result)
	} catch (error) {
		next(error)
	}

})

module.exports = blogRouter