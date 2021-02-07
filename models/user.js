'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');


/*
	Se instala lib bcrypt
	con npm i -S bcrypt-nodejs
	Para encriptar pass
//*/
const bcrypt = require('bcrypt-nodejs');
//---------------------------------------------------------------------

const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true},
	displayName: String,
	avatar: String,
	password: { type: String, select: false},
	singupDate: { type: Date, default: Date.now()},
	lastLogin: Date,
});
//---------------------------------------------------------------------
/*
	La funcion de debajo se ejecuta antes de el guardado en DB
	hash es la clave encriptada
//*/
userSchema.pre('save', (next) => {
	let user = this;
	if ( !user.isModified('password') ) return next();

	bccrypt.genSalt(10, (err,salt) => {
		if (err) return next(err);
		bcrypt.hash( user, password, salt, null, (err,hash) => {
			if (err) return next(err);

			user.password = hash;
			next();
		} );
	});
} );
//---------------------------------------------------------------------

/*
	Se crea un hash 
	Para el avatar
	se instalo npm i -S crypto 
//*/

userSchema.methods.gravatar = function () {
	if (!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro';
	
	const md5 = crypto.createHash('md5').update(this.email).digest('hex');
	return `https://gravatar/avatar/${md5}?s=200&d=retro`;
}
//---------------------------------------------------------------------


module.exports = mongoose.models('User', userSchema);
