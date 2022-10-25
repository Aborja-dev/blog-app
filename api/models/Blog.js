const { Schema, model } = require('mongoose')

const blogSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	author: String,
	url: {
		type: String,
		required: true
	},
	likes: Number,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
})

blogSchema.set('toJSON', {
	transform: (doc, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Blog = model('Blog', blogSchema)
module.exports = Blog
