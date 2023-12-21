var express = require('express');
var app = express();
var sql = require("mssql");

// Config for your database
var config = {
    user: '', // enter user
    password: '', // enter password
    server: '', //enter server
    database: '', //enter database
    options: {
        encrypt: true,
        trustServerCertificate: true // this line will ignore self-signed certificate errors
    } 
};

// Connect to your database
sql.connect(config, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Connected to the SQL database.');
});

app.get('/', function (req, res) {
    var request = new sql.Request();
    request.query('select * FROM x', function (err, recordset) { //enter SQL query
        if (err) {
            console.log(err);
            res.status(500).send('Error on querying the database');
            return;
        }
        res.send(recordset);
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running on port 5000');
});
