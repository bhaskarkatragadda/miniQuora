const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: [3, 'Too short name'],
    },
    // email: {
    //     type: String,
    //     match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    // },
    password: {
        type: String,
        required: true,
        min: [3, 'Too short password'],
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);