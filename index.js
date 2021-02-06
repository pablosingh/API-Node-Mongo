'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connect( config.db, (err,res) => {
	if (err) {
		//throw err;
		console.log(`Error al conectar con la base de datos: ${err}`);
	}
	console.log('Conexion establecida con la base de datos...');
	
	app.listen(config.port , () => {
		console.log('API Rest corriendo en http:/localhost:'+ config.port);
	});
});

