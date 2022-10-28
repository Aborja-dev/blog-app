/* eslint-disable no-tabs */
require('dotenv').config()
require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/Blog')
const noFound = require('./middleware/noFound')
const errorHandler = require('./middleware/errorHandler')
const userRouter = require('./controllers/User')
const loginRouter = require('./controllers/Login')
const testingRouter = require('./controllers/testing')
app.use(express.json())
app.use(cors())
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
if (process.env.NODE_ENV === 'test') {
	app.use('/api/testing', testingRouter)
}
app.use(noFound)
app.use(errorHandler)
const PORT = process.env.PORT || 3003
const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
