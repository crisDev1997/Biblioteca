const dbConn=require('../config/db_config');

const Person=(person)=>{
    this.ci_persona=person.ci_persona,
    this.nombres=person.nombres,
    this.apellidos=person.apellidos,
    this.fec_nac=person.fec_nac,
    this.num_telf=person.num_telf,
    this.correo=person.correo

}

//get all users
Person.getAllPersons=(result)=>{
    dbConn.query("SELECT ci,nombres,apellidos,fec_nac,num_telf,correo FROM persona ORDER BY ci",
    (err,res)=>{
        if(err){
            console.log('Error while fetching persons ',err);
            result(null,err);
        }else{
            console.log('Los libros se han pedido correctamente! ')
            result(null,res);
        }
    })
}

module.exports=Person