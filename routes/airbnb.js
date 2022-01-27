let express = require('express')
let router = express.Router();

const dbo = require('../database/db')
const objID = require('mongodb').ObjectId;

//let _db; //database variable

/* The base AirBnB Sample dataset page*/
//Will be limited to 5 responses for now, will be updated to reflect a "Show amount on Page" function via Frontend req
router.route('/').get(function(req, res, next){
  let dbConn = dbo.getDB("sample_airbnb");
  dbConn.collection("listingsAndReviews").find({
    //name: "Ribeira Charming Duplex"
  }).limit(5).toArray(function(err, result){
    if (err) throw err;
    res.json(result)
  })
    
   
   // next()
  });
  
  /**Get a single airbnb listing record */
  router.get('/:id', function(req, res){
    let dbConn = dbo.getDB("sample_airbnb");
    let query= {
      name: req.params.id
    }
    dbConn.collection("listingsAndReviews").findOne(query, function(err, result){
      if (err) throw err;
      res.json(result)
    })
  })
  //Return only the name of a place, will be used for a specific front end feature
  router.get('/name', function(req, res){
    let query ={
    
    }
    dbConn
    .collection("listingsAndReviews")
    .find({})
    .project({name: 1})
    .toArray(function(err, result){
      if (err) throw err;
      res.json(result)
    })
  })

module.exports = router