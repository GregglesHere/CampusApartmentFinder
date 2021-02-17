var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'teampanda.web.illinois.edu', // Replace with your host name
  user: 'teampanda_user',      // Replace with your database username
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;
