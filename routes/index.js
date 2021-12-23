let express = require('express');
let router = express.Router();

const {getCollection} = require('../database/db')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express API' });
  //res.sendStatus(400).send("Page Loaded Successfully");
});

/* Base API Page*/
router.get('/api', function(req, res, next){
  res.render('api', {title:"API Explanation"})
 // next()
})
/* The base AirBnB Sample dataset page*/
router.get('/api/airbnb', async(req, res, next) =>{
  //res.render('airbnb', {title:"Sample AirBnB Listings"}) //May move to the /api page.
  let collection = getCollection('sample_airbnb', 'listingsAndReviews');
  try {
    res.send(collection);
    console.log(collection);
    //res.sendStatus(400).json();
  }
  catch(error){
    console.error(error)
    //res.sendStatus(500).json({error: error})
  }
 // next()
});

module.exports = router;
