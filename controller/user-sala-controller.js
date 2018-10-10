'use strict'

var UserSala = require('../models/user-sala')  


function saveUserSala(req,res){
    let params = req.body;
    let userSala = new UserSala();
    userSala.user = params.user;
    userSala.sala = params.sala;
    
    userSala.save((err,userSalaStored)=>{
        if(err){
            res.status(500).send({mensagge:'Error al guardar userSala'});
        }else{
            if(!userSalaStored){
                res.status(404).send({mensagge:"La userSala no se guardo"})
            }else{
                res.status(201).send({userSala:userSalaStored})
            }
        }
    });
}

function getUserSala(req, res){
    let id = req.param.id;
    UserSala.findById(id, (err, userSala)=>{
        if(err){
            res.status(500).send({message:'error al recuperar userSala'});
        }else{
            if(!userSala){
                res.status(404).send({message:'userSala no encontrado'});
            }else{
                res.status(200).send({userSala});
            }
        }
    })  
}

function deleteUserSala(req,res){
    var id = req.params.id;

    UserSala.findByIdAndRemove(id, (err, userSalaStored)=>{
        if(err){
            res.status(500).send({message:'error al eliminar userSala'});
        }else{
            if(!userSalaStored){
                res.status(404).send({message:'userSala no encontrado'});
            }else{
                res.status(200).send({userSala:userSalaStored});
            }
        }
    })
}

function updateSala(req,res){
    var userSala = req.body;
    var id = req.params.id;

    UserSala.findByIdAndUpdate(id, userSala, {new:true},(err,userSalaUpdated)=>{
        if(err){
            res.status(500).send({message:'error al modificar userSala'});
        }else{
            if(!userSalaUpdated){
                res.status(404).send({message:'userSala no encontrado'});
            }else{
                res.status(200).send({userSala:userSalaUpdated});
            }
        }
    })   
}

module.exports={
    saveUserSala,
    getUserSala,
    deleteUserSala,
    updateSala
}