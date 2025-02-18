var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/lap_juice')
.then(() => {
    console.log("Database Connected.");
})
.catch((err) => {
    console.log("Fail to connect to database: ", err);
})
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var juiceRouter = require('./routes/juice');
var foodRouter = require('./routes/food');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/juice', juiceRouter);
app.use('/food', foodRouter);

module.exports = app;

