const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
loginRouter.post('/', async (req, response) => {
    const { username, password } = req.body
    const user = await User.findOne({ username: username }).populate('blogs',{id:true, title: true})
    let passwordCorrect = null
    if (user) {
        passwordCorrect = user.passwordHash === password
    } else {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    response
        .status(200)
        .send({ token, username: user.username, name: user.name, blogs: user.blogs })
})

module.exports = loginRouter