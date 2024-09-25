const mysql= require('mysql2');

const connection=mysql.createConnection({
     host:'localhost',
     user:'root',
     password:'smart@2099',
     database:'smartdata'
})

connection.connect((err)=>{
    if(err){
       return console.log('error in database'+ err.stack);
    }
    console.log('connection successful');
})

module.exports=connection;