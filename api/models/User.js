const {Schema, model} = require('mongoose')

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		minlength: 3,
		unique: true
	},
	name: String,
	passwordHash: {
		type: String,
		required: true,
        minlength: 3
	},
	blogs: [{
		type: Schema.Types.ObjectId,
		ref: 'Blog'
	}]
})

userSchema.set('toJSON', {
	transform: (doc, returnedObject)=>{
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const User = model('User', userSchema)
module.exports = User