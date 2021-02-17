module.exports = {
    
    editLocation: (req, res) => {

        let name = req.body.name;
        let location = req.body.location;
        let minPrice = req.body.minPrice;
        let maxPrice = req.body.maxPrice;

     
        let updateQuery = `UPDATE ApartmentBuilding SET name = '${name}', minPrice = ${minPrice}, maxPrice = ${maxPrice} WHERE location = '${location}'`;
        db.query(updateQuery, (err, result) => { if (err) { res.status(500).send(err);} res.redirect('/index'); console.log(result.affectedRows + " record(s) updated");});
        
    },
};
