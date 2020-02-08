const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
   totalAnswers :{
        type:Number
   },
    answer:{
        type:String
    }

}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);