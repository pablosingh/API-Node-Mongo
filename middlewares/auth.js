'use strict'

//const moment = require('moment');
//const jwt = require('jwt-simple');
//const config = require('../config');
const services = require('../srvices');

function isAuth (req,res,next) {
	if (!req.headers.authorization){
		return req.status(403).send({ message: 'No tienes autorizacion...'});
		//Error 403 es Prohibido el acceso
	}
	const token = req.headers.authorization.split(' ')[1]; //Separamos y obtenemos el token

	services.decodeToken(token);
		.then( response => { 
			req.user = response;
			next();
		} );
		.catch( response => {
			req.status(response.status);
		} );
}

module.exports = isAuth;