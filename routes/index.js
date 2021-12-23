var express = require('express');
var router = express.Router();

const {getCollection} = require('../database/db')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express API' });
});
/* Base API Page*/
router.get('/api', function(req, res, next){
  res.render('api', {title:"API Explanation"})
})

router.get('/api/API_Test', async(req, res) =>{
  try {
    res.send(getCollection('sample_airbnb', 'listingsAndReviews'));
  }
  catch(error){
    console.error(error)
  }
});

module.exports = router;
