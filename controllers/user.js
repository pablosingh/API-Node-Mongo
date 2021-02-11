'use strict'

const mongoose = require('mongoose');
const User = require('../models/user');
const service = require('../services');
const bcrypt = require('bcrypt-nodejs');

/*
	npm i -S bcrypt-nodejs
	Para encriptar pass
//*/

function signUp (req,res) {
	const user = new User({
		email: req.query.email,
		displayName: req.query.displayName,
		password: req.query.password//Agregado 

	});

	/*
	if ( !user.isModified('password') ) 
		console.log('NO fue modificado');
	else
		console.log('SI fue modificado');
	*/

	//const pass = user.password;
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(user.password, salt);
	user.password = hash;

	user.save( (err) => {
		console.log('Save...');
		if (err) res.status(500).send({message: `Error al guardar usuario: ${err}`});

		return res.status(200).send ({ 
			token: service.createToken(user)
		});
	});
}
//---------------------------------------------------------------------------------------------

function signIn (req,res) {
	//var em = req.headers.authorization;
	var em = req.query.email;

	console.log('email: '+em);
	console.log('---------ok-----------');
	//service.mostrar(Object.entries(req));

	User.find( {email: em}, (err,user) => { 
		if (err) return res.status(500).send({ message: `Error: ${err}`});// 500 error de servidor

		if (!user) return res.status(404).send({ message: `No existe el User: ${user}`});//404 no existe

		req.user = user;
		console.log(user);
		res.status(200).send({
			message: 'Logueado correctamente',
			token: service.createToken(user)
		});
	});
}

//---------------------------------------------------------------------------------------------
module.exports = {
	signUp,
	signIn
}