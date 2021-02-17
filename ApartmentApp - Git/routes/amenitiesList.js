module.exports = {
    amenitiesList: (req, res) => {
        let address = req.query.address;
	const MongoClient = require('mongodb').MongoClient

        const mongodb2 = MongoClient.connect('mongodb+srv://', {useUnifiedTopology: true}, (err, client)=>{
            if (err) return console.log(err)
            console.log('Connected to Mongo database')
	    dbo = client.db('AmenitiesDB');
	    dbo.collection('Amenities').find({"location": address}).toArray((err, results) => {
		res.render('test2.ejs', {buildings: results})});

        });
        //res.render('test2.ejs')});
	}

};


