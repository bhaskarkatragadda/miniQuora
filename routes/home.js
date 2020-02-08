const express = require('express');
const router = express.Router();
const User  =  require('../models/userModel');

/* GET home page. */
router.get('/', async (req, res, next)=>{
    console.log(req.cookies._vt);
   res.render('homepage', {});
});

router.get('/questionSearch', function(req, res, next) {

});

router.post('/questionSearch', function(req, res, next) {

});




module.exports = router;
