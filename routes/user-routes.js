'use strict'

var express = require('express');
var userController = require('../controller/user-controller');
// var md_auth = require('../middlewares/authenticated');

var api= express.Router();

api.get('/user/:id',userController.getUser);
api.post('/user',userController.saveUser);
api.post('/loginUser',userController.loginUser);

module.exports = api;