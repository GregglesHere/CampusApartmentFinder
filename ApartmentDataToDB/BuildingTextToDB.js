// Enter Building Text File into MySQL DB
var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'teampanda_user'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let text = fs.readFileSync('./Buildings.txt', 'utf-8');
  let buildings = JSON.parse(text);
  for (let i = 0; i < buildings.length; ++i) {
    var sql = `INSERT INTO Buildings (location, name, bType) VALUES ('${buildings[i][0]}', '${buildings[i][1]}', '${buildings[i][2]}')`;
    
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  }
});