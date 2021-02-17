const bodyParser = require('body-parser');
const path = require('path');
const mysql = require("mysql");
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient

var mongodb = mongoose.connection;
var express = require("express");
var app = express();

const mongodb2 = MongoClient.connect('mongodb+srv://', {useUnifiedTopology: true}, (err, client)=>{
    if (err) return console.log(err)
    console.log('Connected to Mongo database')
})

const db = mysql.createConnection({
    host: 'localhost',
    user: 'teampanda_user'
    });

const port = 3000

//app.use(express.urlencoded());
app.use(bodyParser.urlencoded({extended: false}));
const {test} = require('./routes/test_index');
const {index} = require('./routes/index');
const {search} = require('./routes/search');
const {advancedSearch} = require('./routes/advancedSearch');
const {addLocationPage} = require('./routes/addLocationPage');
const {addLocation} = require('./routes/addLocation');
const {deleteLocation} = require('./routes/deleteLocation');
const {editLocation} = require('./routes/editLocation');
const {editLocationPage} = require('./routes/editLocationPage');
const {amenitiesList} = require('./routes/amenitiesList');
const {surveyInfo} = require('./routes/surveyInfo'); //uncommenting breaks page 
//const {survey} = require('./routes/surveyInfo'); //uncommenting breaks page 
const {surveyInfoPage} = require('./routes/surveyInfoPage');
const {advancedSearchPage} = require('./routes/advancedSearchPage');


db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', index);
app.get('/index', index);
app.get('/test', test);
app.get('/search', search);
app.get('/advancedSearch', advancedSearch);
app.get('/surveyInfo', surveyInfo); //uncommenting breaks page 
app.get('/amenities', amenitiesList);
app.get('/add', addLocationPage);
app.post('/add', (req, res) => {
        let insertQuery = `insert into ApartmentBuilding(name, location, minPrice, maxPrice) values('${req.body.name}', '${req.body.address}', '${req.body.minPrice}', '${req.body.maxPrice}')`;
        db.query(insertQuery, (err, result) => { if (err) { res.status(500).send(err);} res.redirect('/index');});
    }); 

app.set('port', process.env.port || port);
 
app.get('/delete/:name', deleteLocation);

app.get('/edit', editLocationPage);      // one edit page for all
app.get('/edit/:location', editLocationPage);
app.post('/edit', editLocation);  
app.post('/edit/:location', editLocation);

app.get('/surveyInfoPage', surveyInfoPage);
//used to  be app.get('/surveyInfoPage', surveyInfoPage);
app.get('/advancedSearchPage', advancedSearchPage);

var server = app.listen(port, function () {

console.log('Example app listening at %s', port);
});


