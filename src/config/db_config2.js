const mysql2=require('mysql2')

const db_connect2=mysql2.createPool({
    host: 'localhost',
    user:'root',
    password: '',
    database: 'biblioteca'
});


module.exports=db_connect2.promise();

