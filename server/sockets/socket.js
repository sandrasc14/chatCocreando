const { io } = require('../index');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');
const usuarios = new Usuarios();
var Mensaje = require('../../models/mensaje');
var UserSala = require('../../models/user-sala');
var User = require('../../models/user');
var Sala = require('../../models/sala');
io.on('connection', (client) => {

    client.on('entrarChat', async (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        client.join(data.sala);
        usuarios.agregarPersona(client.id, data.nombre, data.sala);
        
        // base de datos
        var user = await User.findOne({email:data.nombre.toLowerCase()});
        var sala = await Sala.findOne({name:data.sala.toLowerCase()});
        var userSala = new UserSala({user:user._id,sala:sala._id});
        await userSala.save();

        console.log('usuario',user);
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${ data.nombre } se unió`));
        callback(usuarios.getPersonasPorSala(data.sala));
    });

    client.on('crearMensaje', async (data, callback) => {
        let persona = usuarios.getPersona(client.id);
        var user = await User.findOne({email:data.nombre.toLowerCase()});
        let msg = new Mensaje(
            {
               user:user._id,
               mensaje:data.mensaje
            });
        await msg.save(); 
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
        callback(mensaje);
    });

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada.nombre } salió`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));
    });

    client.on('mensajePrivado', data => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });

});