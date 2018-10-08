var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('nombre') ||!params.has('sala')){
    window.location='index.html';
    //se redirecciona a que la persona se registre 
    throw new Error( 'El nombre y la sala son necesarios');
}

var usuario ={
    nombre:params.get('nombre'),
    sala: params.get('sala')
};


socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function( resp ) {
 
        console.log('Usuarios Conectados ', resp);
    });
});


// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
// usuario: 'Sandra',
//   mensaje: 'Ingresando al Chat Cocreando'
// }, function(resp) {
//   console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//escuchar cambios de usuarios
//cuando un usuarios entra o sale del chat 
socket.on('listaPersona', function(personas) {

    console.log(personas);

});

//Mensajes Privados
socket.on('mensajePrivado',function(mensaje){
    console.log('Mensaje Privado',mensaje);
});