'use strict'

const moment = require('moment');
const jwt = require('jwt-simple');
const config = require('../config');

function isAuth (req,res,next) {
	if (!req.headers.authorization){
		return req.status(403).send({ message: 'No tienes autorizacion...'});
		//Error 403 es Prohibido el acceso
	}
	const token = req.headers.authorization.split(' ')[1]; //Separamos y obtenemos el token
	const payload = jwt.decode( token, config.SECRET_TOKEN );

	if (payload.exp <= moment().unix()){
		return res.status(401).send({ message: 'Token Expirado'});
	}
	 req.user = payload.sub;
	 next();
}

module.exports = isAuth;