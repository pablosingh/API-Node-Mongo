'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/shop', (err,res) => {
	if (err) {
		//throw err;
		console.log(`Error al conectar con la base de datos: ${err}`);
	}
	console.log('Conexion establecida con la base de datos...');
	app.listen(port , () => {
		console.log('API Rest corriendo en http:/localhost:'+ port);
	});
});

