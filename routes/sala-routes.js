'use strict'

var express = require('express');
var salaController = require('../controller/sala-controller');

var api= express.Router();

api.get('/sala/:id',salaController.getSala);
api.post('/sala',salaController.saveSala);

module.exports = api;