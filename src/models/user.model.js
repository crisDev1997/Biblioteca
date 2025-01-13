const dbConn=require('../config/db_config');
const dbConn2=require('../config/db_config2');

const User=(user)=>{
    this.id=user.id,
    this.ci=user.ci,
    this.nombres=user.nombres,
    this.apellidos=user.apellidos,
    this.fec_nac=user.fec_nac;
    this.num_telf=user.num_telf,
    this.correo=user.correo

}
const UserModel= function(user){
    this.id=user.id
    this.ci=user.ci,
    this.nombres=user.nombres,
    this.apellidos=user.apellidos,
    this.fec_nac=user.fec_nac;
    this.num_telf=user.num_telf,
    this.correo=user.correo,
    this.observacion=user.observacion,
    this.historial_prestamo=user.historial_prestamo
}
const AuthUser=function(user){
    this.id_usuario=user.id_usuario;
    this.correo=user.correo,
    this.pass=user.pass
}

const UserAccount=function(user){
    this.id=user.id;
    this.correo=user.correo;
    this.id_usuario=user.id_usuario;
    this.pass=user.pass;
}
UserAccount.createUserAccount=(id_usuario,pass,result)=>{
    dbConn.query(`INSERT INTO cuenta_usuario(id_usuario,pass) VALUES(${id_usuario},'${pass}')`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching admins ',err);
            result(null,err);
        }else{
            console.log("Cuenta de usuario registrada!");
            result(null,res);
        }
    })
}


AuthUser.postAuthentification=(userAuthData,result)=>{
    dbConn.query(`SELECT user.id_usuario, pe.ci,pe.nombres, pe.apellidos, pe.correo FROM persona AS pe INNER JOIN usuario AS u ON pe.ci=u.ci_persona INNER JOIN cuenta_usuario AS user ON u.id=user.id_usuario WHERE pe.correo='${userAuthData.correo}' and user.pass='${userAuthData.pass}'`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching admins ',err);
            result(null,err);
        }else{
            console.log("Cuenta de usuario valida!");
            result(null,res);
        }
    })
}


UserModel.getUserByEmail=(correo)=>{
    return dbConn2.execute(`Select u.id AS id_usuario FROM persona INNER JOIN usuario AS u ON u.ci_persona=persona.ci WHERE correo='${correo}'`)
}
User.getAllUsers=(result)=>{
    dbConn.query("SELECT u.id , u.ci_persona AS ci, p.nombres , p.apellidos , p.num_telf , p.fec_nac ,p.correo  FROM persona AS p INNER JOIN usuario AS u ON p.ci=u.ci_persona ORDER BY u.id",
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{

            result(null,res);
        }
    })
}
UserModel.verifyNotDuplicatedEmailRegister=(correo)=>{
    return dbConn2.execute(`Select pe.correo,u.id AS id_usuario  FROM persona AS pe INNER JOIN usuario AS u ON  pe.ci=u.ci_persona INNER JOIN cuenta_usuario AS user ON u.id=user.id_usuario WHERE pe.correo='${correo}'`)
}

User.getUserByName=(name,result)=>{
    dbConn.query(`SELECT u.id , u.ci_persona  ,p.ci, p.nombres , p.apellidos , p.num_telf ,p.correo  FROM persona AS p INNER JOIN usuario AS u ON p.ci=u.ci_persona WHERE concat_ws(" ",p.nombres,p.apellidos) LIKE '%${name}%' ORDER BY u.id`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching users ',err);
            result(null,err);
        }else{
            console.log('El usuario se ha solicitado correctamente! ')
            result(null,res);
        }
    })
}
User.getUser=(ci,result)=>{
    dbConn.query(`SELECT u.id , u.ci_persona  ,p.ci, p.nombres , p.apellidos ,p.fec_nac , p.num_telf ,p.correo,u.observacion, u.historial_prestamo  FROM persona AS p INNER JOIN usuario AS u ON p.ci=u.ci_persona WHERE u.ci_persona=${ci}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching users ',err);
            result(null,err);
        }else{
            console.log('El usuario se ha solicitado correctamente!  ')
            result(null,res);
        }
    })
}
User.getUserByIdUser=(id,result)=>{
    dbConn.query(`SELECT u.id , u.ci_persona  ,p.ci, p.nombres , p.apellidos ,p.fec_nac , p.num_telf ,p.correo,u.observacion, u.historial_prestamo  FROM persona AS p INNER JOIN usuario AS u ON p.ci=u.ci_persona WHERE u.id=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching users ',err);
            result(null,err);
        }else{
            console.log('El usuario se ha solicitado correctamente!  ')
            result(null,res);
        }
    })
}
User.getBannedUsers=(result)=>{
    dbConn.query("SELECT u.id,p.ci, p.nombres , p.apellidos , p.num_telf , p.correo,sa.razon_sancion,sa.fecha_sancion , sa.fecha_fin_sancion  FROM persona AS p INNER JOIN usuario AS u ON p.ci=u.ci_persona INNER JOIN  sancion AS sa ON u.id = sa.id_usuario ORDER BY sa.fecha_sancion",
    (err,res)=>{
        if(err){
            console.log('Error while fetching users ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

User.getBan=(id,result)=>{
    dbConn.query(`SELECT u.id,p.ci, p.nombres , p.apellidos,p.fec_nac , p.num_telf , p.correo,sa.id_devolucion,sa.razon_sancion,sa.fecha_sancion , sa.fecha_fin_sancion  FROM persona AS p INNER JOIN usuario AS u ON p.ci=u.ci_persona INNER JOIN  sancion AS sa ON u.id = sa.id_usuario WHERE u.id=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching users ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}
User.getAllowUsers=(result)=>{
    dbConn.query("SELECT u.id ,p.ci , p.nombres,p.apellidos, p.num_telf, p.correo   FROM persona AS p INNER JOIN usuario AS u ON p.ci=u.ci_persona WHERE u.id NOT IN (SELECT sa.id_usuario FROM sancion AS sa) ORDER BY u.id",
    (err,res)=>{
        if(err){
            console.log('Error while fetching users ',err);
            result(null,err);
        }else{
            
            result(null,res);
        }
    })
}

UserModel.createNewUser=(userData,result)=>{
    dbConn.query(`CALL new_user('${userData.ci}','${userData.nombres}','${userData.apellidos}','${userData.fec_nac}',${userData.num_telf},'${userData.correo}')`,(err,res)=>{
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
    dbConn.query(`CALL update_user('${userData.ci}','${userData.nombres}','${userData.apellidos}','${userData.fec_nac}','${userData.num_telf}','${userData.correo}','${userData.observacion}','${userData.historial_prestamo}','${ci}')`,(err,res)=>{
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
UserModel.VerifyCI=(ci)=>{
    return dbConn2.execute(`SELECT ci FROM persona WHERE ci=${ci}`)
}
UserModel.findEmail= (email)=>{
   return dbConn2.execute(`SELECT pe.ci,pe.nombres,pe.apellidos,pe.fec_nac,pe.num_telf,pe.correo FROM persona as pe INNER JOIN usuario AS u ON pe.ci=u.ci_persona WHERE correo='${email}'`)
}
module.exports.UserAccount=UserAccount
module.exports.AuthUser=AuthUser

module.exports.User=User
module.exports.UserModel=UserModel