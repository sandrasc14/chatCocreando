'use strict'

var mongoose = require('mongoose');
const socketIO = require('socket.io');
const http = require('http');

var app = require('./app');
var port = process.env.PORT || 3977; // PUERTO QUE TENDRA NUESTRO SERVIDOR WEB  DEL BACKEND
// const publicPath = path.resolve(__dirname, '../public');
// app.use(express.static(publicPath));

let server = http.createServer(app);
module.exports.io = socketIO(server);
require('./sockets/socket');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://junior:junior1@ds141786.mlab.com:41786/desafiosdb', (err,res)=>{

mongoose.connect('mongodb://localhost:27017/chatDB', (err,res)=>{
	if(err){ 
		console.log('error en la conexion');
		throw err;
		console.log(err);
	}else{

		console.log("La conexión a la base de datos está funcionando correctamente..");

		server.listen(port,function(){
			console.log("Servidor del api rest escuchando en http://localhost:"+port);
		});
	}
});
