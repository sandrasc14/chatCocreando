'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // permitira crear objetos de tipo esquema

var UsuarioSchema = Schema({
	name:{type:String},
	surname:{type:String},
	pais:{type:String},
	role:{type:String},
	email:{type:String},
	password:{type:String},
	estado:{type:String},
});

module.exports = mongoose.model('User',UsuarioSchema);