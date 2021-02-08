'use strict'

/*
	Llamamos Servicios a Funciones
	que van ser utilizadas un poco mas global 
	y por otras partes 
	Por esto las separamos en otro archivo
//*/

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function createToken (user) {
	const payLoad = {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(14 , 'days').unix(),
	}
	return jwt.encode( payLoad, config.SECRET_TOKEN );
}

