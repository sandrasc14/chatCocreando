'use strict'

var Mensaje = require('../models/mensaje')  


function saveMensaje(req,res){
    let params = req.body;
    let mensaje = new Mensaje();
    mensaje.mensaje = params.mensaje;
    mensaje.user = params.user;
    
    mensaje.save((err,mensajeStored)=>{
        if(err){
            res.status(500).send({mensagge:'Error al guardar mensaje'});
        }else{
            if(!mensajeStored){
                res.status(404).send({mensagge:"El mensaje no se guardo"})
            }else{
                res.status(201).send({mensaje:mensajeStored})
            }
        }
    });
}

function getMensaje(req, res){
    let id = req.param.id;
    Mensaje.findById(id, (err, mensaje)=>{
        if(err){
            res.status(500).send({message:'error al recuperar mensaje'});
        }else{
            if(!mensaje){
                res.status(404).send({message:'mensaje no encontrado'});
            }else{
                res.status(200).send({mensaje});
            }
        }
    })  
}

function deleteMensaje(req,res){
    var id = req.params.id;

    Mensaje.findByIdAndRemove(id, (err, mensajeRemoved)=>{
        if(err){
            res.status(500).send({message:'error al eliminar mensaje'});
        }else{
            if(!mensajeRemoved){
                res.status(404).send({message:'mensaje no encontrado'});
            }else{
                res.status(200).send({mensaje:mensajeRemoved});
            }
        }
    })
}

function updateMensaje(req,res){
    var mensaje = req.body;
    var id = req.param.id;

    Mensaje.findByIdAndUpdate(id, mensaje, {new:true},(err,mensajeUpdated)=>{
        if(err){
            res.status(500).send({message:'error al modificar mensaje'});
        }else{
            if(!mensajeUpdated){
                res.status(404).send({message:'mensaje no encontrado'});
            }else{
                res.status(200).send({mensaje:mensajeUpdated});
            }
        }
    })   
}

module.exports={
    saveMensaje,
    getMensaje,
    deleteMensaje,
    updateMensaje
}