const express = require('express');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

const dbOptions = {
    host:'localhost',
    user:'Manuel',
    password:'Spartan11713',
    database:'prueba1'
}; 

//SI la base de datos sale con error: ER_NOT_SUPPORTED_AUTH_MODE
//  ALTER USER 'Manuel'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Spartan11713'
//  flush privileges


//middlewares 
app.use(express.json());
app.use(myConnection(mysql, dbOptions, 'single'));
app.use(require('./Routes/Customer'));


app.listen(5000,()=>{
    console.log('Server: 5000');
});


