const mongoose = require('mongoose')
const supertest = require('supertest')
const {app, server} = require('../app')
const User = require('../models/User')
const Blog = require('../models/Blog')
const { getAll, takeAnID, findAndMap } = require('../utils/apiHelpers')
const startDB = require('./mock/startDB')
const users = require('./mock/users')
const blogs = require('./mock/data')
const api = supertest(app)

describe('api para pruebas',()=>{
    beforeEach(async ()=>{
        await startDB(Blog, blogs)
        await startDB(User, users)
    })
    test('borra la  de datos',async ()=>{
        await api.get('/api/testing/reset')
            .expect(204)
        const usersInDb = await getAll(User)
        const blogsInDb = await getAll(Blog)
        expect(usersInDb).toHaveLength(0)
        expect(blogsInDb).toHaveLength(0)
    })
    test('crea un nuevo usuario',async ()=>{
        const newUser = {
            "name": "Abraham B",
            "username": "Killer2022",
            "password": "asdf1234"
        }
        await api.post('/api/testing/user')
            .expect(200)
            .send(newUser)
        const usersInDb = await findAndMap(User,'username')
        expect(usersInDb).toContain(newUser.username)
    })
    test('crea un nuevo blog',async ()=>{
        const userId = await takeAnID(User)
        const newBlog = {
            "title": "blog de prueba para test API",
            "author": "Abraham Borja",
            "url": "http://miblog.com/1",
            "likes": 0,
            user: userId
        }
        await api.post('/api/testing/blog')
        .expect(200)
        .send(newBlog)
        const blogsInDb = await findAndMap(Blog, 'title')
        expect(blogsInDb).toContain(newBlog.title)
    })
    test('devuelve la lista de blogs por usuarios', async () => {
        const userId = (await findAndMap(User, 'id'))[0]
        const newBlog = {
            "title": "blog de prueba para test API",
            "author": "Abraham Borja",
            "url": "http://miblog.com/1",
            "likes": 0,
            user: userId
        }
        await api.post('/api/testing/blog')
        .send(newBlog)
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