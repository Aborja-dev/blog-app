const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../app')
const Blog = require('../models/Blog')
const User = require('../models/User')
const users = require('./mock/users')
const startDB = require('./mock/startDB')
const { findAndMap, saveInDB, getToken } = require('../utils/apiHelpers')
const api = supertest(app)
let userId = null
let token = ''
describe('casos de usuario',() => {
	beforeEach(async () => {
        await Blog.deleteMany({})
		await startDB(User, users)
        const userList = await findAndMap(User, 'id')
        userId = userList[0]
        const userId2 = userList[1]
        await saveInDB(Blog, {
            "title": "prueba 1",
            "author": "Abraham Borja",
            "url": "http://miblog.com/1",
            "likes": 0,
            "user": userId
        })
        await saveInDB(Blog, {
            "title": "prueba 2",
            "author": "Ankahara Organistabraham Borja",
            "url": "http://miblog.com/2",
            "likes": 0,
            "user": userId2
        })
        token = await getToken(users[0].username)
	})
    test ('guarda una entrada en la DB', async ()=>{
        await saveInDB(Blog, {
            "title": "Haz un backend con express",
            "author": "Abraham Borja",
            "url": "http://miblog.com/1",
            "likes": 0,
            "user": userId
        })
        const blogs = await findAndMap(Blog, 'title')
        expect(blogs).toContain("Haz un backend con express")
    })
    test ('devuelve todos los blogs', async ()=>{
        const result = await api
            .get(`/api/blogs`)
            .set({ Authorization: `Bearer ${token}` })
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(result.body).toHaveLength(2)
    })
	test('devuelve la lista de blogs por usuarios', async () => {
        const result = await api
            .get(`/api/blogs/${userId}`)
            .expect(200)
			.expect('Content-Type', /application\/json/)
        expect(result.body).toHaveLength(1)
    })
    
	afterAll(async () => {
        mongoose.connection.close()
		server.close()
    })
})
