let express = require('express');
let router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Listings Finder Express API' });
});

/* Base API Page*/
router.get('/api', function(req, res, next){
  res.render('api', {title:"API Explanation"})
 
})




module.exports = router;
