
const mongoose = require('mongoose')
const supertest = require('supertest')
const {app, server} = require('../app')
const User = require('../models/User')
const { getAll } = require('../utils/apiHelpers')
const startDB = require('./mock/startDB')
const users = require('./mock/users')
const api = supertest(app)
describe('pruebas de api', ()=>{
    beforeEach(async ()=>await startDB(User, users))
    test('retorna la lista de usuarios', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const result = await getAll(User)
      expect(result).toHaveLength(users.length)
    })
    test('La lista de usuarios tiene el atributo blogs', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const result = await getAll(User)
      result.map(e=>{
        expect(e).toHaveProperty('blogs')
      })
    })
    test('crear un nuevo usuario', async () => {
      const newUser = {
        name: "Mariano",
        username: "mariano123",
        password: "asdf1234"
      }  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const result = await getAll(User)
      expect(result).toHaveLength(users.length + 1)
    })
     test('crear un usuario invalido', async () => {
      const newUser = {
        name: "Mariano",
        username: "ma",
        password: "asdf1234"
      }  
      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      const result = await getAll(User)
      expect(result).toHaveLength(users.length)
      expect(response.body).toHaveProperty('message')
    })
    afterAll(() => {
      mongoose.connection.close()
      server.close()
    })
})
