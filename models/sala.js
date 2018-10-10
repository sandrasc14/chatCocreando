'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var salaSchema = Schema({
    name: {type:String}
});

module.exports= mongoose.model('Sala',salaSchema);