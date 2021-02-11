'use strict'

const services = require('../services');

//---------------------------------------------------------------------------------------------

function isAuth (req,res,next) {

	services.mostrar(req);

	if (!req.headers.authorization){
		return res.status(403).send({ message: 'No tienes autorizacion...'});
		//Error 403 es Prohibido el acceso
	}
	const token = req.headers.authorization.split(' ')[1]; //Separamos y obtenemos el token

	console.log(token);

	services.decodeToken(token)
		.then( response => { 
			req.user = response;
			console.log('Promesa SI');
			next();
		} )
		.catch( response => {
			console.log('Promesa NO');
			req.status(response,status);
		} );
	console.log('req.user - '+req.user);
}

//---------------------------------------------------------------------------------------------

module.exports = isAuth;