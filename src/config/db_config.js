const mysql = require('mysql');

const db_connect=mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '',
    database: 'biblioteca'
});

db_connect.connect((error)=>{
    if(error) throw error;
    console.log('Base de Datos conectada existosamente!')
})

module.exports=db_connect
