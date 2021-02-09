'use strict'

const mongoose = require('mongoose');
const User = require('../models/user');
const service = require('../services');

function signUp (req,res){
	const user = new User({
		email: req.body.email,
		displayName: req.body.displayName
	});
	//Ahora salvamos
	user.save((err) => {
		if (err) res.status(500).send({message: `Error al guardar usuario: ${err}`});

		return res.status(200).send({ token: service.createToken(user) });
	});
}


function signIn (req,res) {
	User.find( { email: req.body.email }, (err,user) => { 
		if (err) return res.status(500).send({ message: `Error: ${err}`});// 500 error de servidor

		if (!user) return res.status(404).send({ message: `No existe el User: ${user}`});//404 no existe

		req.user = user;
		res.status(200).send({
			message: 'Logueado correctamente',
			token: service.createToken(user)
		});
	});
}

module.exports = {
	signUp,
	signIn
}