const express = require('express')
let router = express.Router();

const dbo = require('../database/db')

//This may be relevant later on
//const objID = require('mongodb').ObjectId

router.route('/').get(function(req, res, next){
    
})

module.exports = router;