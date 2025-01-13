const dbConn=require('../config/db_config');
const dbConn2=require('../config/db_config2');
const Admin=(admin)=>{
    this.id_admin=admin.id_admin,
    this.ci=admin.ci,
    this.nombres=admin.nombres,
    this.apellidos=admin.apellidos,
    this.rol=admin.rol,
    this.num_telf=admin.num_telf,
    this.correo=admin.correo
}
const AdminModel= (admin)=>{
    this.ci=admin.ci;
    this.nombres=admin.nombres;
    this.apellidos=admin.apellidos;
    this.fec_nac=admin.fec_nac;
    this.num_telf=admin.num_telf;
    this.correo=admin.correo;
    this.pass=admin.pass;
    this.rol=admin.rol;
    
}

const AuthAdmin=function(admin){
    this.correo=admin.correo,
    this.pass=admin.pass
}

AuthAdmin.postAuthentification=(adminAuthData,result)=>{
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
            result(null,res);
        }
    })
}

AdminModel.VerifyCI=(ci)=>{
    return dbConn2.execute(`SELECT ci FROM persona WHERE ci=${ci}`)
}
AdminModel.findEmail= (email)=>{
   return dbConn2.execute(`SELECT pe.ci,pe.nombres,pe.apellidos,pe.fec_nac,pe.num_telf,pe.correo,ad.pass,ad.rol FROM persona as pe INNER JOIN admin AS ad ON pe.ci=ad.ci_persona WHERE correo=${email}`)

}
AdminModel.addNewAdmin=(dataAdmin,result)=>{
    dbConn.query(`call new_admin(${dataAdmin.ci},${dataAdmin.nombres},${dataAdmin.apellidos},${dataAdmin.fec_nac},${dataAdmin.num_telf},${dataAdmin.correo},${dataAdmin.pass},${dataAdmin.rol})`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching admins ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}
module.exports.AdminModel=AdminModel;
module.exports.Admin=Admin;
module.exports.AuthAdmin=AuthAdmin;