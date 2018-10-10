'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSalaSchema = Schema({
    user:{type: Schema.ObjectId, ref:'User'},
    sala:{type: Schema.ObjectId, ref:'Sala'}
});

module.exports= mongoose.model('UserSala',userSalaSchema);