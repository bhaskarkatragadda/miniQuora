const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
   tag :{
        type:String
   },
    userId:{
        type: mongoose.Schema.Types.ObjectID,
        ref:'User'
    }

}, {timestamps: true});

module.exports = mongoose.model('Question', questionSchema);