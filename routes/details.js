const express = require('express');
const router = express.Router();
const User  =  require('../models/userModel');
const Question  =  require('../models/questionModel');


router.get('/:ID', async (req, res, next)=>{
    //to get all the questions
    let questionId = req.params.ID;
    let  question = await Question.findById(questionId);
    res.render('question-details', {question: question});
});


module.exports = router;
