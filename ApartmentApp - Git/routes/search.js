module.exports = {
    search: (req, res) => {
        let address = req.query.search; // Might be req.query.search idk
        let query = "SELECT * FROM ApartmentBuilding WHERE location LIKE '%"+ address +"%'"; // query database to get all the players

        db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }
            res.render('test.ejs', {
            title: "Search"
            ,buildings: result
            });
        });
    },
};


