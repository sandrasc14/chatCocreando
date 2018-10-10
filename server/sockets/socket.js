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

        //--- if (!data.nombre || !data.sala) {
        if (!data.usuario || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        client.join(data.sala);
        usuarios.agregarPersona(client.id, data.usuario, data.sala);

        // base de datos
        var user = await User.findById(data.usuario);
        var sala = await Sala.findById(data.sala);
        var userSala = new UserSala({ user: user._id, sala: sala._id });
        await userSala.save();

        salas = await UserSala.find({ sala: sala._id }).sort('_id').populate({ path: 'user' }).exec()
   

        client.broadcast.to(data.sala).emit('listaPersona', salas);
        //    client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));

        //--  client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${ data.nombre } se unió`));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${user.name} se unió`));
        // callback(usuarios.getPersonasPorSala(data.sala));
        callback(salas);
    });

    client.on('crearMensaje', async (data, callback) => {
        let persona = usuarios.getPersona(client.id);

        var user = await User.findById(data.nombre);

        let msg = new Mensaje(
            {
                user: user._id,
                mensaje: data.mensaje
            });
        await msg.save();

        //--let mensaje = crearMensaje(persona.nombre, data.mensaje);
        let mensaje = crearMensaje(user.name, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
        callback(mensaje);
    });

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        //--client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada.nombre } salió`));
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`));

        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));
    });

    client.on('mensajePrivado', data => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });

});