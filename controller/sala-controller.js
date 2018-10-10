'use strict'

var Sala = require('../models/sala')  


function saveSala(req,res){
    let params = req.body;
    let sala = new Sala();
    sala.name = params.name;
    
    sala.save((err,salaStored)=>{
        if(err){
            res.status(500).send({mensagge:'Error al guardar sala'});
        }else{
            if(!salaStored){
                res.status(404).send({mensagge:"La sala no se guardo"})
            }else{
                res.status(201).send({sala:salaStored})
            }
        }
    });
}

function getSala(req, res){
    let id = req.param.id;
    Sala.findById(id, (err, sala)=>{
        if(err){
            res.status(500).send({message:'error al recuperar sala'});
        }else{
            if(!sala){
                res.status(404).send({message:'sala no encontrado'});
            }else{
                res.status(200).send({sala});
            }
        }
    })  
}

function deleteSala(req,res){
    var id = req.params.id;

    Sala.findByIdAndRemove(id, (err, salaRemoved)=>{
        if(err){
            res.status(500).send({message:'error al eliminar sala'});
        }else{
            if(!salaRemoved){
                res.status(404).send({message:'sala no encontrado'});
            }else{
                res.status(200).send({sala:salaRemoved});
            }
        }
    })
}

function updateSala(req,res){
    var sala = req.body;
    var id = req.params.id;

    Sala.findByIdAndUpdate(id, sala, {new:true},(err,salaUpdated)=>{
        if(err){
            res.status(500).send({message:'error al modificar sala'});
        }else{
            if(!salaUpdated){
                res.status(404).send({message:'sala no encontrado'});
            }else{
                res.status(200).send({sala:salaUpdated});
            }
        }
    })   
}

module.exports={
    saveSala,
    getSala,
    deleteSala,
    updateSala
}