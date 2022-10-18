var mysql = require('mysql2');
var body_parser = require('body-parser');
var path = require('path');
var express = require('express');

// database user
const nttd_sql_user = {
        host: '35.193.104.159',
        user: 'notimetodata:us-central1:project-411-22',
        password: 'NoTimeToData22',
        database: 'db'
};

var connection = mysql.createConnection(nttd_sql_user, {
        multipleStatements: true
});

module.exports = {
        connection
};
