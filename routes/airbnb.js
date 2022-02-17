let express = require('express')
let router = express.Router();

const dbo = require('../database/db')
const objID = require('mongodb').ObjectId;



/* The base AirBnB Sample dataset page*/
//This is the default landing page, that will be displayed 
router.route('/index').get(function(req, res, next){
  let dbConn = dbo.getDB("sample_airbnb");
  dbConn.collection("listingsAndReviews").find({}).limit(5).toArray(function(err, result){
    if (err) throw err;
    res.json(result)
  })
   // next()
});
  
 

/**Get a single airbnb listing record */
router.get('/:id', function(req, res){
    const dbConn = dbo.getDB("sample_airbnb");
    const reqID = req.params.id;
    dbConn.collection("listingsAndReviews").find({
      _id: reqID,
    }).toArray(function(err, result){
      if (err) throw err;
      res.json(result)
      //console.log(reqName)
    })
    
})
/**This following section will hold code related for searching and querying the MongoDB database from the frontend React app */
//search function for the "name" field
router.get('/search?', function(req, res){
  const dbConn = dbo.getDB("sample_airbnb");
  const findName = req.params.name;
  dbConn.collection("listingsAndReviews").find({
    name: findName
  }).toArray(function(err, result){
    if (err) throw err;
    res.json(result)
  });
})
/** */

/**The following section will hold code for filtering the MongoDB search results based on a variety of options*/
//Filter function for limiting page results shown
router.get('/filter?results=:limit', function(req,res){
  const dbConn = dbo.getDB("sample_airbnb");
  dbConn.collection("listingsAndReviews").find({}).limit(req.params.limit).toArray(function(err, result){
    if (err) throw err;
    res.json(result)
  })
})

module.exports = router