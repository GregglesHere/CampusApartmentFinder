module.exports = {
    deleteLocation: (req, res) => {
        
        let name = req.params.name;
        let deleteQuery = 'DELETE FROM `ApartmentBuilding` WHERE name = "' + name + '"';

        db.query(deleteQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/index');
        });
    }
};
