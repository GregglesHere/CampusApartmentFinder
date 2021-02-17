// Enter Amenities Text File into MySQL DB
var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'teampanda_user'
});

con.connect(function(err) {
if (err) throw err;
console.log("Connected!");

let text = fs.readFileSync('./Amenities.txt', 'utf-8');
let amenities = JSON.parse(text);
for (let i = 0; i < amenities.length; ++i) {
  var sql = `INSERT INTO Amenities (location, internetIncluded, utilIncluded, gym, pool, lounge, studyRooms, elevator, laundryIncluded, parking) VALUES 
  ('${amenities[i][0]}', ${amenities[i][1]}, ${amenities[i][2]}, ${amenities[i][3]}, ${amenities[i][4]}, ${amenities[i][5]}, ${amenities[i][6]}, ${amenities[i][7]}, ${amenities[i][8]}, ${amenities[i][9]})`;
  console.log(sql);

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}
});
