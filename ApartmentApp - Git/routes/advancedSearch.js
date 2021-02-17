module.exports = {
    advancedSearch: (req, res) => {
        let street = req.query.street; // Might be req.query.search idk
        let minPrice = req.query.minPrice;
        let maxPrice = req.query.maxPrice;
        let bedCount = req.query.bedCount;
        let bathCount = req.query.bathCount;
        let parkingType = req.query.parkingType;
        let query = "SELECT * FROM ApartmentBuilding NATURAL JOIN ApartmentUnit as U JOIN Amenities ON Amenities.location=ApartmentBuilding.location WHERE ApartmentBuilding.location LIKE '%"+ street +"%' and U.price >= " + minPrice + " and U.price <= " + maxPrice + " and U.bedCount = " + bedCount + " and U.bathCount >= " + bathCount + " and Amenities.parking = " + parkingType + " ORDER BY U.sqFt DESC";

	if (parkingType == 3) {
	    query = "SELECT * FROM ApartmentBuilding NATURAL JOIN ApartmentUnit as U JOIN Amenities ON Amenities.location=ApartmentBuilding.location WHERE ApartmentBuilding.location LIKE '%"+ street +"%' and U.price >= " + minPrice + " and U.price <= " + maxPrice + " and U.bedCount = " + bedCount + " and U.bathCount >= " + bathCount + " ORDER BY U.sqFt DESC";
	}
        db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }
            res.render('advancedSearchResults.ejs', {
            title: "Search"
            ,units: result,
            link: "amenities?address="
            });
        });
    },
};

