const dbConn=require('../config/db_config');

const User=(user)=>{
    this.id=user.id,
    this.ci_persona=user.ci_persona,
    this.nombres=user.nombres,
    this.apellidos=user.apellidos,
    this.fec_nac=user.fec_nac;
    this.num_telf=user.num_telf,
    this.correo=user.correo

}
const UserModel= function(user){
    this.ci=user.ci,
    this.nombres=user.nombres,
    this.apellidos=user.apellidos,
    this.fec_nac=user.fec_nac;
    this.num_telf=user.num_telf,
    this.correo=user.correo,
    this.observacion=user.observacion,
    this.historial_prestamo=user.historial_prestamo
}

//get all users
User.getAllUsers=(result)=>{
    dbConn.query("SELECT u.id , u.ci_persona  ,p.ci, p.nombres , p.apellidos , p.num_telf ,p.correo  FROM persona AS p INNER JOIN usuario AS u ON p.ci=u.ci_persona ORDER BY u.id",
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            console.log('Los libros se han pedido correctamente! ')
            result(null,res);
        }
    })
}
User.getUser=(id,result)=>{
    dbConn.query(`SELECT u.id , u.ci_persona  ,p.ci, p.nombres , p.apellidos , p.num_telf ,p.correo, u.historial_prestamo  FROM persona AS p INNER JOIN usuario AS u ON p.ci=u.ci_persona WHERE u.id=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching users ',err);
            result(null,err);
        }else{
            console.log('Los libros se han pedido correctamente! ')
            result(null,res);
        }
    })
}
User.getBannedUsers=(result)=>{
    dbConn.query("SELECT u.id AS id_usuario,p.ci, p.nombres , p.apellidos , p.num_telf AS telefono, p.correo,sa.razon_sancion,sa.fecha_sancion , sa.fecha_fin_sancion  FROM persona AS p INNER JOIN usuario AS u ON p.ci=u.ci_persona INNER JOIN  sancion AS sa ON u.id = sa.id_usuario ORDER BY sa.fecha_sancion",
    (err,res)=>{
        if(err){
            console.log('Error while fetching users ',err);
            result(null,err);
        }else{
            console.log('Los usuarios sancionados se han solicitado correctamente! ')
            result(null,res);
        }
    })
}
User.getAllowUsers=(result)=>{
    dbConn.query("SELECT u.id AS user_id ,p.ci AS ci_persona, p.nombres,p.apellidos, p.num_telf, p.correo   FROM persona AS p INNER JOIN usuario AS u ON p.ci=u.ci_persona WHERE u.id NOT IN (SELECT sa.id_usuario FROM sancion AS sa) ORDER BY u.id",
    (err,res)=>{
        if(err){
            console.log('Error while fetching users ',err);
            result(null,err);
        }else{
            console.log('Los usuarios permitidos para prestarse se han solicitado correctamente! ')
            result(null,res);
        }
    })
}

UserModel.createNewUser=(userData,result)=>{
    dbConn.query(`CALL new_user(${userData.ci},${userData.nombres},${userData.apellidos},${userData.fec_nac},${userData.num_telf},${userData.correo},${userData.observacion},${userData.historial_prestamo})`,(err,res)=>{
        if(err){
            console.log('Error while fetching users ',err);
            result(null,err);
        }else{
            console.log('El usuario se ha registrado correctamente! ')
            result(null,res);
        }
    })
}

UserModel.updateUser=(ci,userData,result)=>{
    dbConn.query(`CALL update_user(${userData.ci},${userData.nombres},${userData.apellidos},${userData.fec_nac},${userData.num_telf},${userData.correo},${userData.observacion},${userData.historial_prestamo},${ci})`,(err,res)=>{
        if(err){
            console.log('Error while fetching users ',err);
            result(null,err);
        }else{
            console.log('El usuario se ha actualizado correctamente! ')
            result(null,res);
        }
    })
}

UserModel.deleteUser=(ci,result)=>{
    dbConn.query(`CALL delete_user(${ci})`,(err,res)=>{
        if(err){
            console.log('Error while fetching users ',err);
            result(null,err);
        }else{
            console.log('El usuario se ha eliminado correctamente! ')
            result(null,res);
        }
    })
}
module.exports.User=User
module.exports.UserModel=UserModel