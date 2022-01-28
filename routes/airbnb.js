let express = require('express')
let router = express.Router();

const dbo = require('../database/db')
const objID = require('mongodb').ObjectId;

//let _db; //database variable

/* The base AirBnB Sample dataset page*/
//Will be limited to 5 responses for now, will be updated to reflect a "Show amount on Page" function via Frontend req
router.route('/index').get(function(req, res, next){
  let dbConn = dbo.getDB("sample_airbnb");
  dbConn.collection("listingsAndReviews").find({}).limit(10).toArray(function(err, result){
    if (err) throw err;
    res.json(result)
  })
   // next()
  });
  
  /**Get a single airbnb listing record */
  router.get('/:id', function(req, res){
    let dbConn = dbo.getDB("sample_airbnb");
    const reqID = req.params.id;
    //const o_id = objID(reqID)
    dbConn.collection("listingsAndReviews").find({
      _id: reqID,
    }).toArray(function(err, result){
      if (err) throw err;
      res.json(result)
      //console.log(reqName)
    })
    
  })
  //Return only the name of a place, will be used for a specific front end feature
  router.get('/name', function(req, res){
    let dbConn = dbo.getDB("sample_airbnb");
    let query ={
      _id: "1003530"
    }
    dbConn
    .collection("listingsAndReviews")
    .find(query)
    .project({name: 1})
    .toArray(function(err, result){
      if (err) throw err;
      res.json(result)
    })
  })

module.exports = router