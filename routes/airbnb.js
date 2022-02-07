let express = require('express')
let router = express.Router();

const dbo = require('../database/db')
const objID = require('mongodb').ObjectId;

//let _db; //database variable

/* The base AirBnB Sample dataset page*/
//This is the default landing page, that will be displayed 
router.route('/index').get(function(req, res, next){
  let dbConn = dbo.getDB("sample_airbnb");
  dbConn.collection("listingsAndReviews").find({}).limit(10).toArray(function(err, result){
    if (err) throw err;
    res.json(result)
  })
   // next()
  });
  
  //Implement a route for a desired "Show amount of Listings" option, which is to be implemented at some point
  

  /**Get a single airbnb listing record */
  router.get('/:id', function(req, res){
    let dbConn = dbo.getDB("sample_airbnb");
    const reqID = req.params.id;
    dbConn.collection("listingsAndReviews").find({
      _id: reqID,
    }).toArray(function(err, result){
      if (err) throw err;
      res.json(result)
      //console.log(reqName)
    })
    
  })


module.exports = router