'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var app = express();

//cargar rutas
var userRoutes= require('../routes/user-routes');
var salaRoutes= require('../routes/sala-routes');

//configuracion body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); // convierte a objeto JSON los datos que nos llegan por las peticiones HTTP

// configurar cabeceras HTTP
app.use((req,res,next) => {
	res.header('Access-Control-Allow-Origin','*');     
	res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
	res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
	next();
});
// rutas bases;
app.use('/api',userRoutes);
app.use('/api',salaRoutes);

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

module.exports = app; // para usar express en otros ficheros que incluyan app
