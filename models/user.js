'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

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
	Se crea un hash para el avatar se instalo npm i -S crypto 
*/

userSchema.methods.gravatar = function () {
	if (!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro';
	
	const md5 = crypto.createHash('md5').update(this.email).digest('hex');
	return `https://gravatar/avatar/${md5}?s=200&d=retro`;
}
//---------------------------------------------------------------------

module.exports = mongoose.model('User', userSchema);
