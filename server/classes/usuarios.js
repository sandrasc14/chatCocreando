class Usuarios{

    constructor(){
        this.personas= [];
    }
     
    agregarPersona(id, nombre,sala){

        let persona={
            id, nombre, sala
        };
        this.personas.push(persona);
        
        return this.personas;
        // puede cambiar si solo deseo retornar  a una persona o a un conjunto de personas  
    }

    getPersona(id){
        let persona = this.personas.filter(persona =>{
            return persona.id===id 
            //se coloca 3 iguales porque se esta haciendo una comparación 
            //con un solo igual se hace una asignación
        } )[0];

        return persona;
        }
    getPersonas() {  
            return this.personas; 
    }
    getPersonasSala(sala ){
        
        let personasEnSala=this.personas.filter(persona=> persona.sala===sala);
        return personasEnSala;
    }

    borrarPersona(id){

        let personaBorrada = this.getPersona(id);
        this.personas= this.personas.filter(persona =>{
            return persona.id != id
        });
        return personaBorrada; 
    }
}


module.exports = {

    Usuarios
}
