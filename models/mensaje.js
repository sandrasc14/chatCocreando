
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mensajeSchema = Schema({
    user: {type: Schema.ObjectId, ref:'User'},
    mensaje:{type:String},
    fecha: {type:Date , default: new Date().getTime()}
})

module.exports = mongoose.model('Mensaje', mensajeSchema);