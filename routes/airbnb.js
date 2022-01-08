let express = require('express')
let router = express.Router();

const dbo = require('../database/db')
const objID = require(mongodb).ObjectId;

/* The base AirBnB Sample dataset page*/
router.get('/', function(req, res, next){
    let dbConn = dbo.getDB("sample_airbnb");
    dbConn.collection("listingsAndReviews").find({}).toArray(function(err, result){
      if (err) throw err;
      res.json(result)
    })
   // next()
  });
  
  /**Get a single airbnb listing record */
  router.get('/:id', function(req, res){
    let dbConn = dbo.getDB("sample_airbnb");
    let query= {
      _id: objID(req.params.id)
    }
    dbConn.collection("listingsAndReviews").findOne(query, function(err, result){
      if (err) throw err;
      res.json(result)
    })
  })

module.exports = router