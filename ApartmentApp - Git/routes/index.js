module.exports = {
    index: (req, res) => {
        let query = "SELECT * FROM `ApartmentBuilding` ORDER BY name ASC"; // query database to get all the apartment buildings

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: 'Welcome to ApartmentFinder',
                buildings: result
            });
        });
    },
};
