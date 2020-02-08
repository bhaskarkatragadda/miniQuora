const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectID,
        ref:'Question'
    },
    answer:{
        type:String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectID,
        ref:'User'
    }

}, {timestamps: true});

module.exports = mongoose.model('Answer', answerSchema);