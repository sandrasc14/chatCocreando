'use strict'
 
var bcrypt = require('bcrypt-nodejs'); // para encriptar la contraseña
var User = require('../models/user');


function saveUser(req,res){
	var user = new User();
	var params = req.body;

	console.log(params);

	user.name= params.name;
	user.surname= params.surname;
	user.email= params.email;
	user.pais= params.pais;
	//user.role= 'ROLE_ADMIN';
	user.role= params.role;
	user.password= params.password


	if(user.password){
		bcrypt.hash(user.password,null,null, function(err,hash){
			user.password= hash;
			if(user.name!=null && user.surname!=null && user.email!=null && user.pais!=null  && user.password!=null){
				//guarda el usuario
				user.save((err,userStored)=>{
					 if(err){
					 	res.status(500).send({message:'Error al guardar el usuario'});
					 }else{
					 	if(!userStored){
					 		res.status(404).send({message:'No se ha registrado el usuario'});
					 	}else{
					 		res.status(200).send({user:userStored});
					 	}
					 }
				});
			}else{
				res.status(200).send({message:'Rellena todos los campos'});
			}
		});

	}else{
		res.status(200).send({message:'Introduce la contraseña'});
	}
}


function loginUser(req,res){
    var params= req.body;
     var email=params.email;
     var password= params.password;

     User.findOne({email:email.toLowerCase()},(err,user)=>{
         if(err){
             res.status(500).send({message:'Error en la peticion'});
         }else{
             if(!user){
                 res.status(404).send({message:'el usuario no existe'});
             }else{

                 bcrypt.compare(password,user.password, (err,check)=>{
                     if(check){
                         if(params.gethash){
                             res.status(200).send({token: jwt.createToken(user)});
                         }else{
                             res.status(200).send({user});
                         }
                     }else{
                         res.status(404).send({message:'contraseña incorrecta'});
                     }

                 });

             }
         }
     });
    }

     
async function login(user){
    var user = await User.findOne({email:user.nombre.toLowerCase()});
    return user;
}

function getUser(req,res){

    var userId= req.params.id;
    

    User.findById(userId, (err, usuario) => {
            if(err){
                    res.status(500).send({ message:'Error en la peticion'});	
                }else{
                    if(!usuario){
                            res.status(404).send({ message:'No existe usuario en la base de datos'});	
                    }else{
                        res.status(200).send({usuario});	
                    }
                }
            }			
        );
}



module.exports={
    saveUser,
    loginUser, 
    getUser,
    login
}
