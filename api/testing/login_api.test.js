const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const api = supertest(app)

describe('test de login', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const password = "asdf1234"
        const passwordHash = password
        const newUser = new User({
            name: "Mariano",
            username: "mariano123",
            passwordHash
        })
        await newUser.save()
    })
    test('login', async () => {
        const userInDB = await User.find({})
        const login = {username: 'mariano123', password: 'asdf1234'}
        const result = await api
            .post('/api/login')
            .send(login)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body).toHaveProperty('token')
    })
    afterAll(() => {
        mongoose.connection.close()
        server.close()
    })
})
