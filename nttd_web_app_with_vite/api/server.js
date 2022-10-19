// var mysql = require('mysql2');
// var body_parser = require('body-parser');
// var path = require('path');
const express = require('express');
const cors = require('cors');

// database user
// const nttd_sql_user = {
//         host: '',
//         user: '',
//         password: '',
//         database: ''
// };

// const connection = mysql.createConnection(nttd_sql_user, {
//         multipleStatements: true
// });

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', function(req, res){
        res.send({"message": "Hello World!"});
});

app.listen(3000, function(){
        console.log(`App is running on port ${3000}`);
})

