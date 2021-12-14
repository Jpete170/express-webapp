var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express API' });
});

router.get('/api', function(req, res, next){
  res.render('api', {title:"API Explanation"})
})

module.exports = router;
