let express = require('express')
let router = express.Router();

const dbo = require('../database/db')
const objID = require('mongodb').ObjectId;

//import {PrismaClient} from '@prisma/client';
const prisma = require("@prisma/client")
const client = new prisma.PrismaClient();



/* The base AirBnB Sample dataset page*/
//This is the default landing page, that will be displayed 
router.route('/index').get( async function(req, res, next){
  
  let dbConn = dbo.getDB("sample_airbnb");
  const projection = {
    _id: 1,
    name: 1,
    images:{
      picture_url: 1
    },
    address:{
      country: 1
    },
    summary: 1,
  }
  dbConn.collection("listingsAndReviews")
    .find({
      weekly_price: {$exists: true},
      monthly_price: {$exists: true},
      cleaning_fee: {$exists: true},
      extra_people: {$exists: true},
      guests_included: {$exists: true}
    })
    .project(projection)
    .limit(20)
    .skip(5)
    .toArray(function(err, result){
    if (err) throw err;
    res.json(result)
  })
   /*
  await client.$connect();
  const listings = await client.listingsAndReviews.findMany({
    where:{
      weekly_price: true,
      monthly_price: true,
      cleaning_fee: true,
      extra_people: true,
      guests_included: true,
    },
   
  });
  res.json(listings)
  await client.$disconnect()*/
});

//Used in the 'Index' page of the React App.
router.get('/preview',function(req, res){
  const dbConn = dbo.getDB("sample_airbnb");
  const projection = {
    name: 1,
    space: 1,
    address:{
      country: 1
    },
    images:{
      picture_url: 1
    },
  }
  dbConn.collection("listingsAndReviews")
    .find({
      weekly_price: {$exists: true},
      monthly_price: {$exists: true},
      cleaning_fee: {$exists: true},
      extra_people: {$exists: true},
      guests_included: {$exists: true}
    })
    .project(projection)
    .limit(6)
    .toArray(function(err, result){
    if (err) throw err;
    res.json(result)
  })
})

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
router.get('/search?name=:name', function(req, res){
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
router.get('/filter?results=:limit', async function(req,res){
  const dbConn = dbo.getDB("sample_airbnb");
  dbConn.collection("listingsAndReviews").find({
    //potential future filtering options
  })
  .limit(req.params.limit)
  .toArray(function(err, result){
    if (err) throw err;
    res.json(result)
  })
  
})

module.exports = router