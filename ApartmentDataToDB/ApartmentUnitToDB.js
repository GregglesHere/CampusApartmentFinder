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

  for (let i = 0; i < 119; ++i) {
    try {
      let text = fs.readFileSync('./ApartmentUnits/Apartments'+i+'.txt', 'utf-8');
      let apartmentUnits = JSON.parse(text);
      for (let j = 0; j < apartmentUnits.length - 1; ++j) {
        if (apartmentUnits[j][3] == 'NULL') {
                var sql = `INSERT INTO ApartmentUnit (location, price, bedCount, bathCount, sqFt) VALUES ('${apartmentUnits[apartmentUnits.length-1]}', 
        '${apartmentUnits[j][0]}', '${apartmentUnits[j][1]}', '${apartmentUnits[j][2]}', ${apartmentUnits[j][3]})`;
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log("1 record inserted");
            }); 
        } else {
        var sql = `INSERT INTO ApartmentUnit (location, price, bedCount, bathCount, sqFt) VALUES ('${apartmentUnits[apartmentUnits.length-1]}', 
        '${apartmentUnits[j][0]}', '${apartmentUnits[j][1]}', '${apartmentUnits[j][2]}', '${apartmentUnits[j][3]}')`;
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log("1 record inserted");
            }); 
        }
      }
    } catch (error){
        continue;
    }
  }
});