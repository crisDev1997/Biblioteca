const dbConn=require('../config/db_config');

const Admin=(admin)=>{
    this.id_admin=admin.id_admin,
    this.ci=admin.ci,
    this.nombres=admin.nombres,
    this.apellidos=admin.apellidos,
    this.rol=admin.rol,
    this.num_telf=admin.num_telf,
    this.correo=admin.correo
}

const AuthAdmin=function(admin){
    this.correo=admin.correo,
    this.pass=admin.pass
}

AuthAdmin.postAuthentification=(adminAuthData,result)=>{
    console.log(adminAuthData);
    dbConn.query(`SELECT ad.id_admin, pe.ci,pe.nombres, pe.apellidos, pe.correo FROM persona AS pe INNER JOIN admin AS ad ON pe.ci=ad.ci_persona WHERE pe.correo='${adminAuthData.correo}' and ad.pass='${adminAuthData.pass}'`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching admins ',err);
            result(null,err);
        }else{
            
            result(null,res);
        }
    })
}
AuthAdmin.postAuthLogin=(adminAuthData,result)=>{
    console.log(adminAuthData);
    dbConn.query(`SELECT ad.id_admin, pe.ci,pe.nombres, pe.apellidos, pe.correo FROM persona AS pe INNER JOIN admin AS ad ON pe.ci=ad.ci_persona WHERE pe.correo='${adminAuthData.correo}' and ad.pass='${adminAuthData.pass}'`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching admins ',err);
            result(null,err);
        }else{
            
            result(null,res);
        }
    })
}
//get all books
Admin.getAllAdmin=(result)=>{
    dbConn.query("SELECT ad.id_admin, pe.ci,pe.nombres,pe.apellidos,ad.rol,pe.num_telf, pe.correo FROM persona AS pe INNER JOIN admin AS ad ON pe.ci=ad.ci_persona ORDER BY ad.id_admin",
    (err,res)=>{
        if(err){
            console.log('Error while fetching admins ',err);
            result(null,err);
        }else{
            console.log('Los administradores se han pedido correctamente! ')
            result(null,res);
        }
    })
}


module.exports.Admin=Admin
module.exports.AuthAdmin=AuthAdmin