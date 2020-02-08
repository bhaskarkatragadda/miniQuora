const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

//Database Connection
mongoose.connect('mongodb+srv://bhaskar:bhaskar@rest-shop-covsp.mongodb.net/test?retryWrites=true&w=majority',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
);
mongoose.Promise = global.Promise;
//log
app.use(morgan('dev'));

//making file public
app.use('/uploads', express.static('uploads'));
//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Handling CORS
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-with, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
//path for routes


//middleware for routes




// Handling Errors past the routes
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});



app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});



module.exports = app;

