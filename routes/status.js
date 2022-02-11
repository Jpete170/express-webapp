let express = require('express')
let router = express.Router();

router.get('/', function(req, res, next){
    res.json({ status: 'Online'})
});

  module.exports = router;