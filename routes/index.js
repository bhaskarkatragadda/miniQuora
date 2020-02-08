const express = require('express');
const router = express.Router();
const User  =  require('../models/userModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'miniQuora' });
});

router.post('/', async function (req, res, next) {
    let name = req.body.name;
    let pass  = req.body.password;
    try{
        let result = await User.findOne({name:name});
        console.log(result);
        if(result && pass === result.password) {
            res.status(200).json({
                message: 'Login Successful'
            })
        }else{
            res.status(404).json({
                message:'Login failed'
            })
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error:e
        })
    }

});

router.post('/admin/addUsers', async function (req, res, next) {
    try{
        let userName = req.body.user;
        let password = req.body.password;
        const user = new User({
            name : userName,
            password : password
        });
        res.status(200).json({
            message:'ok'
        })
        await user.save();
    }catch (e) {
        console.log(e);
        res.status(500).json({
            error:e
        })
    }


});



module.exports = router;
