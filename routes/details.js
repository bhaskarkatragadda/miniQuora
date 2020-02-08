const express = require('express');
const router = express.Router();
const User  =  require('../models/userModel');
const Question  =  require('../models/questionModel');
const Answer  =  require('../models/answerSchema');


router.get('/:ID', async (req, res, next)=>{
    //to get all the questions
    let questionId = req.params.ID;
    let  question = await Question.findById(questionId);
    let answers = await Answer.find({questionId: questionId}).sort({createdAt: -1});
    res.render('question-details', {question: question, answers: answers});
});


module.exports = router;
