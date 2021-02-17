const mysql = require("mysql");
var express = require("express");
var app = express();


// (2) CREATE CONNECTION
// ! CHANGE THESE TO YOUR OWN !
const mysqlClient = mysql.createConnection({
    host: 'teampanda.web.illinois.edu',
    user: 'teampanda_user'
    });
db.connect((err) => {
    if (err) { throw err; }
        console.log("DB connection OK");
});

var selectQuery = 'SELECT * FROM ApartmentBuilding';
// (3) QUERY
app.get('/test', function (req, res) {
    mysqlClient.query(selectQuery,
    function select(error, results, fields) {
        if(error){
            console.log(error);
            mySqlClient.end();
            res.render('tempaltefile', {data:null, error:error});
        }

        if(results.length > 0) {
            console.log(results);
            res.render('tempaltefile', {data:results, error:null});
        } else {
            console.log('No data');
            res.render('tempaltefile', {data:null, error:"no data"});
        }
        mysqlClient.end();
    });

});
