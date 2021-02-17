module.exports = {
    
    addLocation: (req, res) => {

        let name = req.body.name;
        let address = req.body.address;
        let minPrice = req.body.minPrice;
        let maxPrice = req.body.maxPrice;

        // // Check to see if the building is already in the table
        // let locationQuery = "select * from `ApartmentBuilding` where location='" + address + "'";
        // db.query(locationQuery, (err, result) => { if (err) { return res.status(500).send(err);}
        //     if (result.length > 0) {
        //         let message = 'Apartment Building already exists';
        //         res.render('addLocation.ejs', {message, title: "Add Location"});
        //     } else {
        //         let insertQuery = "insert into `ApartmentBuilding`(name, location, minPrice, maxPrice) values('" + name + "', '" + address + "', " + minPrice + ", " + maxPrice + ")";
        //         db.query(insertQuery, (err2, result2) => { if (err2) { res.status(500).send(err2);} res.redirect('/');});
        //     }
        // });
        let insertQuery = "insert into ApartmentBuilding(name, location, minPrice, maxPrice) values('"+ name +"', '"+ address +"', "+ minPrice +", "+ maxPrice +")";
        db.query(insertQuery, (err, result) => { if (err) { res.status(500).send(err);} res.redirect('/');});

    },
};
