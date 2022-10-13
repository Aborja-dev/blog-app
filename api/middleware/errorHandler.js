const errorHandler = (err, req, res, next) => { 
	const errorType = err.constructor.name == 'Error'
		? err.message
		: err.constructor.name
	switch (errorType) {
	case 'ValidationError':
		const errors = Object.keys(err.errors)
		return res.status(400).json({
			type: errorType,
			message:`no se creo el blog`,
			missingFields: errors
		})
	case 'InvalidError':
		return res.status(400).json({
			type: errorType,
			message:`usuario invalido`,
		})
	default:
		return res.status(400).json({message: 'ocurrio un error', error: err.message})
	}
}

module.exports = errorHandler