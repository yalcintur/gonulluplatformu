var express = require('express')
var createError = require('http-errors');
var cors = require('cors')
var knex = require('knex')
var logger = require('morgan');

const app = express()

var usersRouter= require('./routes/users');

app.use(logger('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/users', usersRouter);

app.use(function(req, res, next) {
    next(createError(404));
  });
  
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
  res.status(err.status || 500);
  res.send('error');
  });

app.listen(3000)
