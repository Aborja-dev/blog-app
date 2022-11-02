/* eslint-disable no-tabs */

const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../app')
const Blog = require('../models/Blog')
const User = require('../models/User')
const { getAll, findInDB, takeAnID, findAndMap, getToken } = require('../utils/apiHelpers')
const blogs = require('./mock/data')
const users = require('./mock/users')
const startDB = require('./mock/startDB')
const api = supertest(app)
describe('pruebas de api', () => {
	beforeEach(async () => {
		await startDB(Blog, blogs)
		await startDB(User, users)

	})
	test('retorna una lista de blogs como JSON', async () => {
		const token = await getToken(users[2].username)
		await api
			.get('/api/blogs')
			.set({ Authorization: `Bearer ${token}` })
			.expect(200)
			.expect('Content-Type', /application\/json/)
		const result = await getAll(Blog)
		expect(result).toHaveLength(blogs.length)
	})
	test('el identificador se llama id', async () => {
		const result = await getAll(Blog)
		result.forEach((blog) => {
			expect(blog.id).toBeDefined()
		})
	})
	test('crear una entrada de blog', async () => {
		const token = await getToken(users[2].username)
		const newBlog = {
			title: 'Express and MongoDB',
			author: 'Abraham Borja',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 2
		}
		await api
			.post('/api/blogs')
			.set({ Authorization: `Bearer ${token}` })
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		const result = await getAll(Blog)
		expect(result).toHaveLength(blogs.length + 1)
		const titles = result.map(({ title }) => title)
		expect(titles).toContain(newBlog.title)
	})
	test('crear una entrada sin likes', async () => {
		const token = await getToken(users[2].username)
		const newBlog = {
			title: 'Express and MongoDB',
			author: 'Abraham Borja',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
		}
		const result = await api
			.post('/api/blogs')
			.set({ Authorization: `Bearer ${token}` })
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		const id = result.body.id
		const newEntry = await findInDB(Blog, id)
		expect(newEntry.likes).toBe(0)
	})
	test('crear una entrada sin titulo ni url', async () => {
		const token = await getToken(users[2].username)
		const newBlog = {
			author: 'Abraham Borja'
		}
		const response = await api
			.post('/api/blogs')
			.set({ Authorization: `Bearer ${token}` })
			.send(newBlog)
			.expect(400)
		const result = response.body
		expect(result.missingFields).toBeDefined()
		const blogsInDB = await getAll(Blog)
		expect(blogsInDB).toHaveLength(blogs.length)
	})
	test('borrar una entrada', async () => {
		const id = await takeAnID(Blog)
		await api
			.delete(`/api/blogs/${id}`)
			.expect(204)
		const result = findAndMap(Blog, 'id')
		expect(result).not.toContain(id)
	})
	test('actualizar una entrada', async () => {
		const idBlog = await takeAnID(Blog)
		const newEntry = {
			_id: idBlog,
			title: 'Type wars with Typescript',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 2,
			__v: 0
		}
		const id = newEntry._id
		await api
			.put(`/api/blogs/${id}`)
			.send(newEntry)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const result = await findInDB(Blog, id)
		expect(result.title).toContain(newEntry.title)
	})
	afterAll(() => {
		mongoose.connection.close()
		server.close()
	})
})
