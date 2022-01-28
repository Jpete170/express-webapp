let express = require('express');
let router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express API' });
  //res.sendStatus(400).send("Page Loaded Successfully");
  //res.sendFile(path.join(public, 'index.html'));
});

/* Base API Page*/
router.get('/api', function(req, res, next){
  res.render('api', {title:"API Explanation"})
 // next()
})

router.get('/status', function(req, res, next){
  res.send({
    status: 'Online'
  })
})



module.exports = router;
