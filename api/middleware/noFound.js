const noFound = (req, res) => { 
	const { url } = req
	console.log('ruta no encontrada', url)
	return res.status(404).end()
}

module.exports = noFound