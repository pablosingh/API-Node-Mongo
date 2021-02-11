'use strict'

/*
	Llamamos Servicios a Funciones "globales"
//*/

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

//---------------------------------------------------------------------------------------------
function createToken (user) {
	const payLoad = {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(14 , 'days').unix(),
	}
	return jwt.encode( payLoad, config.SECRET_TOKEN );
}

//---------------------------------------------------------------------------------------------
function decodeToken (token) {
	const decoded = new Promise( (resolve, reject) => {
		try{
			const payload = jwt.decode(token, config.SECRET_TOKEN);

			console.log('-payload-');
			console.log(Object.entries(payload));

			if (payload.exp <= moment().unix()) {
				reject( {
					status: 401,
					message: 'Token expirado'
				}); 
			}
			resolve( payload.sub );		
		}catch (err) {
			reject( {
				status: 500,
				message: 'Invalid Token'
			});
		}
	});
	return decoded;
}

//---------------------------------------------------------------------------------------------

function mostrar(req) {
	console.log('--------------------Mostrando--------------------');

	console.log('---Headers--->');
	console.log(Object.entries(req.headers));
	console.log('---------ok-----------');
	
	console.log('---Body--->');
	console.log(Object.entries(req.body));
	console.log('---------ok-----------');

	console.log('---Query--->');
	console.log(Object.entries(req.query));
	console.log('---------ok-----------');

	console.log('---Claves--->');
	console.log(Object.keys(req));
	console.log('---------ok-----------');
	console.log('--------------------------------------------------');
}
//---------------------------------------------------------------------------------------------
module.exports = {
	createToken,
	decodeToken,
	mostrar
}