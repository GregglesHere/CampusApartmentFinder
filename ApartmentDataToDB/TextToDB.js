// Enter Text File into MySQL DB
var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'teampanda_user'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let text = fs.readFileSync('./Apartments.txt', 'utf-8');
  let apartments = JSON.parse(text);
  for (let i = 0; i < apartments.length; ++i) {
    var sql = `INSERT INTO ApartmentBuilding (name, location, minPrice, maxPrice) VALUES ('${apartments[i][0]}', '${apartments[i][2]}', '${apartments[i][3]}', '${apartments[i][4]}') 
    ON DUPLICATE KEY UPDATE name = VALUES(name)`;
    
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  }
});