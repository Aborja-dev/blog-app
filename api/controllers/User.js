const User = require('../models/User')
const bcrypt = require('bcrypt')
const { validate } = require('../utils/utils')
const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
const passwordRegEx = new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')
const userRouter = require('express').Router()

userRouter.get('/', async (req, response)=>{
	const users = await User.find({}).populate('blogs',{id:true})
	response.json(users)
})

userRouter.post('/', async (req, response, next)=>{
	const body = req.body
	const {username, name, password} = body
	const validateUser = validate({username, password},{
        userlength: ({username})=>username.length > 3 ? true : 'user must be more than 3 characters',
        password:  ({password})=>password.length > 3 ? true : 'password format invalid',
        //validatePass: ({password})=>passwordRegEx.test(password) ? true : 'password invalid'
    })
	const isInvalid = Object.values(validateUser).find((value)=>value != true) || false
	if (isInvalid) {
		next(`InvalidError`)
	}

	try {
		const user = new User({
			username,
			name,
			passwordHash: password,
		})
		const result = await user.save()
		response.status(201).json(result)	
	} catch (error) {
		next(error)
	}
})

module.exports = userRouter