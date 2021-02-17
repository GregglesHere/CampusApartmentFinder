const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("Apt_with_dis_new.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    const con = mysql.createConnection({
    host: 'localhost',
    user: 'teampanda_user'
    });
    
    // open the connection
    con.connect(error => {
      if (error) {
        console.error(error);
      } else {
        let query =
          "INSERT INTO LandmarkDistances (AptName, Location, UnionDistance, GraingerDistance, County_MarketDistance, BIFDistance, TargetDistance) VALUES ?";
        con.query(query, [csvData], (error, response) => {
          console.log(error || response);
        });
      }
    });
  });

stream.pipe(csvStream);