module.exports = {
    surveyInfo: (req, res) => {
        let Union = req.query.Union;
        let Grainger = req.query.Grainger;
        let BIF = req.query.BIF;
        let Target = req.query.Target;
        let County = req.query.County;
        
        
        //let query = "CALL landmarkDistances(Union,Grainger,BIF,Target,County)";
        let query = "CALL landmarkDistances(" + Union + " , " + Grainger+" , "+BIF+" , "+Target+" , "+County+")";
        db.query('call landmarkDistances(?, ?, ?, ?, ?)', [Union, Grainger, BIF, Target, County], (err, result, fields) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }
            res.render('surveyInfoResults.ejs', {
            title: "Search"
            ,table: result
            });
        });
//        res.render('test3.ejs');
    },
};

// CREATE PROCEDURE landmarkDistances(IN un real, 
//                                     IN grainger real, 
//                                     IN bif real, 
//                                     IN target real, 
//                                     IN county real) 
// BEGIN
//     DECLARE count int DEFAULT FALSE; 
//     DECLARE AptId varchar(255);
//     DECLARE Location varchar(255);
//     DECLARE UnionDistance real;
//     DECLARE GraingerDistance real;
//     DECLARE BIFDistance real;
//     DECLARE TargetDistance real;
//     DECLARE CountyDistance real;
//     DECLARE done INT DEFAULT FALSE;
    
//     DECLARE cur CURSOR FOR SELECT * FROM LandmarkDistances;                       
//     DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE; 
    
//     DELETE FROM TableCount;
    
//     OPEN cur;
    
//     read_loop: LOOP
//         FETCH cur INTO AptId, Location, UnionDistance, GraingerDistance, BIFDistance,TargetDistance,CountyDistance;
//         IF done THEN 
//             LEAVE read_loop;
//         END IF;
        
//         IF UnionDistance >= un-0.2 AND UnionDistance <= un+0.2 THEN
//             SET count  = count + 1;
//         END IF;
//         IF GraingerDistance >= grainger-0.2 AND GraingerDistance <= grainger+0.2 THEN
//             SET count  = count + 1;
//         END IF;
//         IF BIFDistance >= bif-0.2 AND BIFDistance <= bif+0.2 THEN
//             SET count  = count + 1;
//         END IF;
//         IF TargetDistance >= target-0.2 AND TargetDistance <= target+0.2 THEN
//             SET count  = count + 1;
//         END IF;
//         IF CountyDistance >= county-0.2 AND CountyDistance <= county+0.2 THEN
//             SET count  = count + 1;
//         END IF;
        
//         INSERT IGNORE INTO TableCount VALUES (AptId, Location, count);
        
//         -- reset count
//         SET count  = 0;
//     END LOOP;
        
//     CLOSE cur;
    
//     SELECT* FROM TableCount ORDER BY (num) DESC;
// END //
// DELIMITER ;