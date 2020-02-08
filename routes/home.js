const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Question = require('../models/questionModel');
const Answer = require('../models/answerSchema');

/* GET home page. */
router.get('/', async (req, res, next) => {
    //to get all the questions
    let questions = await Question.find().sort({createdAt: -1});
    res.render('homepage', {questions: questions});
});

router.get('/questionSearch', function (req, res, next) {

});

router.post('/createQuestion', async function (req, res, next) {
    try {
        const userId = req.cookies._vt;
        let question = req.body.question;
        let tag = req.body.tag;
        const questions = new Question({
            question: question,
            tag: tag,
            userId: userId
        });
        await questions.save();
        res.status(200).json({
            message: 'Question Uploaded'
        });
    } catch (e) {
        res.status(500).json({
            message: 'Error in Uploading in the Question'
        });
        console.log(e);
    }
});

router.post('/uploadAnswer', async function (req, res, next) {
    try {
        let ans = req.body.answer;
        let questionId = req.body.questionId;
        let userId = req.cookies._vt;
        const answer = new Answer({
            questionId: questionId,
            answer: ans,
            userId: userId
        });
        await answer.save();
        res.redirect('/details/'+ questionId)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Answer uploading Failed'
        });
    }
});


module.exports = router;
