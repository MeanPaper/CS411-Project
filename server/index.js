const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

//config .env file
dotenv.config();

// console.log(`host: ${process.env.HOST}`);

const nttd_sql_user = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};

var connection = mysql.createConnection(nttd_sql_user, {
    multipleStatements: true
});


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", function(req,res){
    res.send({"message" : "Hello World"});
});

app.listen(3000, ()=>{
    console.log("app listening on port 3000");
})