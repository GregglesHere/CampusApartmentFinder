module.exports = {
    test: (req, res) => {
        let query = "SELECT * FROM `ApartmentBuilding`"; // query database to get all the players

        db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }
            res.render('test.ejs', {
            title: "Test"
            ,buildings: result
            });
        });
    },
};


