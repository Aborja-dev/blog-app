const mongoose = require('mongoose')
let url = ''
if (process.env.NODE_ENV === 'test') {
	url = process.env.MONGO_DB_URL_TEST
}
else {
	url = process.env.MONGO_DB_URL
}
mongoose.connect(url)
	.then(()=>{
		console.log(`conexion a la base de datos exitosa en ${process.env.NODE_ENV}`)
	})
	.catch((e)=>{
		console.log('a ocurrido un error no se ha podido contectar la base de datos', e)
	})